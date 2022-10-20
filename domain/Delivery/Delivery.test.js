const PercentageCoupon = require('../../entities/Coupon/PercentageCoupon/PercentageCoupon')
const DistanceOfferCriteria = require('../../entities/OfferCriteria/OfferRangeCriteria/DistanceOfferCriteria/DistanceOfferCriteria')
const WeightOfferCriteria = require('../../entities/OfferCriteria/OfferRangeCriteria/WeightOfferCriteria/WeightOfferCriteria')
const CouponsService = require('../../repos/CouponsRepo/CouponsRepo')
const Delivery = require('./Delivery')
const {
  INVALID_COUPON,
  DISTANCE_NOT_IN_RANGE
} = require('../../constants/messages')

describe('Delivery', () => {
  let couponService

  beforeEach(() => {
    const distanceOfferCriteria = new DistanceOfferCriteria({ upperBound: 200 })
    const weightOfferCriteria = new WeightOfferCriteria({
      lowerBound: 70,
      upperBound: 200
    })
    const percentageCoupon = new PercentageCoupon({
      percentage: 10,
      offerCode: 'OFR001',
      offerCriterias: [distanceOfferCriteria, weightOfferCriteria]
    })
    couponService = new CouponsService()
    couponService.addCoupon(percentageCoupon)
  })

  describe('Get delivery cost', () => {
    test('With default amounts for 1KG and 1KM', () => {
      const delivery = new Delivery({
        baseDeliveryCost: 100,
        couponService
      })
      const expectedDeliveryCost = 250

      const actualDeliveryCost = delivery.getDeliveryCost({
        packageTotalWeight: 10,
        distanceToDestination: 10
      })

      expect(actualDeliveryCost).toBe(expectedDeliveryCost)
    })
    test('With custom amounts for 1KG and 1KM', () => {
      const delivery = new Delivery({
        baseDeliveryCost: 100,
        couponService,
        amountFor1Kg: 1,
        amountFor1Km: 1
      })
      const expectedDeliveryCost = 120

      const actualDeliveryCost = delivery.getDeliveryCost({
        packageTotalWeight: 10,
        distanceToDestination: 10
      })

      expect(actualDeliveryCost).toBe(expectedDeliveryCost)
    })
  })
  describe('Get delivery cost with coupon', () => {
    test('Get delivery cost for in-valid coupon', () => {
      const delivery = new Delivery({
        baseDeliveryCost: 100,
        couponService
      })
      const expectedDeliveryCost = 250
      const expectedDiscountAmount = 0
      const expectedMsg = INVALID_COUPON

      const {
        discountAmount,
        delivertCost,
        msg
      } = delivery.getDeliveryCostWithCoupon({
        packageTotalWeight: 10,
        distanceToDestination: 10,
        couponCode: '111GET'
      })

      expect(delivertCost).toBe(expectedDeliveryCost)
      expect(discountAmount).toBe(expectedDiscountAmount)
      expect(msg).toBe(expectedMsg)
    })
    test('Get delivery cost when distance not in range for the coupon code', () => {
      const delivery = new Delivery({
        baseDeliveryCost: 100,
        couponService
      })
      const expectedDeliveryCost = 1205
      const expectedDiscountAmount = 0
      const expectedMsg = DISTANCE_NOT_IN_RANGE

      const {
        discountAmount,
        delivertCost,
        msg
      } = delivery.getDeliveryCostWithCoupon({
        packageTotalWeight: 10,
        distanceToDestination: 201,
        couponCode: 'OFR001'
      })

      expect(delivertCost).toBe(expectedDeliveryCost)
      expect(discountAmount).toBe(expectedDiscountAmount)
      expect(msg).toBe(expectedMsg)
    })
  })
})
