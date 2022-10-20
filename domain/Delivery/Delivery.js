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
const DeliveryPackage = require('../../entities/DeliveryPackage/DeliveryPackage')

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

  /**
   * @param {number} baseDeliveryCost
   */
  set baseDeliveryCost (baseDeliveryCost) {
    this.#baseDeliveryCost = baseDeliveryCost
  }

  /**
   * @param {number} amountFor1Kg
   */
  set amountFor1Kg (amountFor1Kg) {
    this.#amountFor1Kg = amountFor1Kg
  }

  /**
   * @param {number} amountFor1Km
   */
  set amountFor1Km (amountFor1Km) {
    this.#amountFor1Km = amountFor1Km
  }

  getDeliveryCost ({ weightInKG, distanceInKM }) {
    return (
      this.#baseDeliveryCost +
      weightInKG * this.#amountFor1Kg +
      distanceInKM * this.#amountFor1Km
    )
  }

  isInValidRange ({ value, range }) {
    const { lowerBound, upperBound } = range
    return value >= (lowerBound | -Infinity) && value <= (upperBound | Infinity)
  }

  /**
   *
   * @param {DeliveryPackage} deliveryPackage0
   * @returns
   */
  getDeliveryCostWithCoupon (deliveryPackage0) {
    const deliveryPackage = DeliveryPackage.clone(deliveryPackage0)
    const { weightInKG, distanceInKM, offerCode } = deliveryPackage
    const delivertCost = this.getDeliveryCost({
      weightInKG,
      distanceInKM
    })
    let discountAmount = 0
    let offerCodeApplied = false

    const coupon = this.#couponService.getCoupon(offerCode)

    if (!coupon)
      return deliveryPackage.setCostDetails({
        discountAmount,
        delivertCost,
        offerCodeApplied,
        offerStatus: INVALID_COUPON
      })

    for (const criteria of coupon.offerCriterias) {
      if (criteria instanceof DistanceOfferCriteria) {
        if (
          !this.isInValidRange({
            value: distanceInKM,
            range: criteria
          })
        ) {
          return deliveryPackage.setCostDetails({
            discountAmount,
            delivertCost,
            offerCodeApplied,
            offerStatus: DISTANCE_NOT_IN_RANGE
          })
        }
      } else if (criteria instanceof WeightOfferCriteria) {
        if (
          !this.isInValidRange({
            value: weightInKG,
            range: criteria
          })
        ) {
          return deliveryPackage.setCostDetails({
            discountAmount: 0,
            delivertCost,
            offerCodeApplied,
            offerStatus: WEIGHT_NOT_IN_RANGE
          })
        }
      }
    }

    if (coupon instanceof PercentageCoupon) {
      const { percentage } = coupon
      const discount = (delivertCost * percentage) / 100
      const delivertCostWithDiscount = delivertCost - discount

      return deliveryPackage.setCostDetails({
        discountAmount: delivertCostWithDiscount,
        delivertCost,
        offerCodeApplied: true,
        offerStatus: COUPON_APPLIED
      })
    }

    return deliveryPackage.setCostDetails({
      discountAmount,
      delivertCost,
      offerCodeApplied,
      offerStatus: COUPON_FAILED
    })
  }
}

module.exports = Delivery
