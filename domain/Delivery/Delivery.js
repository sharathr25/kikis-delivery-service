const CouponsService = require('../../repos/CouponsRepo/CouponsRepo')
const {
  DISTANCE_NOT_IN_RANGE,
  INVALID_COUPON,
  WEIGHT_NOT_IN_RANGE,
  COUPON_APPLIED,
  COUPON_FAILED
} = require('../../constants/messages')
const DistanceOfferCriteria = require('../../entities/OfferCriteria/OfferRangeCriteria/DistanceOfferCriteria/DistanceOfferCriteria')
const WeightOfferCriteria = require('../../entities/OfferCriteria/OfferRangeCriteria/WeightOfferCriteria/WeightOfferCriteria')
const PercentageCoupon = require('../../entities/Coupon/PercentageCoupon/PercentageCoupon')

class Delivery {
  #baseDeliveryCost
  #couponService
  #amountFor1Km
  #amountFor1Kg

  /**
   *
   * @param {number} baseDeliveryCost
   * @param {CouponsService} couponService
   * @param {number} [amountFor1Km = DEFAULT_AMOUNT_FOR_1_KM]
   * @param {number} [amountFor1Kg = DEFAULT_AMOUNT_FOR_1_KG]
   */
  constructor ({
    baseDeliveryCost,
    couponService,
    amountFor1Km,
    amountFor1Kg
  }) {
    this.#baseDeliveryCost = baseDeliveryCost
    this.#couponService = couponService
    this.#amountFor1Km = amountFor1Km
    this.#amountFor1Kg = amountFor1Kg
  }

  getDeliveryCost ({ packageTotalWeight, distanceToDestination }) {
    return (
      this.#baseDeliveryCost +
      packageTotalWeight * this.#amountFor1Kg +
      distanceToDestination * this.#amountFor1Km
    )
  }

  isInValidRange ({ value, range }) {
    const { lowerBound, upperBound } = range
    return value >= (lowerBound | -Infinity) && value <= (upperBound | Infinity)
  }

  getDeliveryCostWithCoupon ({
    packageTotalWeight,
    distanceToDestination,
    couponCode
  }) {
    const delivertCost = this.getDeliveryCost({
      packageTotalWeight,
      distanceToDestination
    })

    const coupon = this.#couponService.getCoupon(couponCode)

    if (!coupon) return { delivertCost, discountAmount: 0, msg: INVALID_COUPON }

    for (const criteria of coupon.offerCriterias) {
      if (criteria instanceof DistanceOfferCriteria) {
        if (
          !this.isInValidRange({
            value: distanceToDestination,
            range: criteria
          })
        ) {
          return { delivertCost, discountAmount: 0, msg: DISTANCE_NOT_IN_RANGE }
        }
      } else if (criteria instanceof WeightOfferCriteria) {
        if (
          !this.isInValidRange({
            value: packageTotalWeight,
            range: criteria
          })
        ) {
          return { delivertCost, discountAmount: 0, msg: WEIGHT_NOT_IN_RANGE }
        }
      }
    }

    if (coupon instanceof PercentageCoupon) {
      const { percentage } = coupon
      const discount = (delivertCost * percentage) / 100
      const delivertCostWithDiscount = delivertCost - discount

      return {
        delivertCost: delivertCostWithDiscount,
        discount,
        msg: COUPON_APPLIED
      }
    }

    return { delivertCost, discountAmount: 0, msg: COUPON_FAILED }
  }
}

module.exports = Delivery
