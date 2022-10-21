const PercentageCoupon = require('../../entities/Coupon/PercentageCoupon/PercentageCoupon')
const DistanceOfferCriteria = require('../../entities/OfferCriteria/OfferRangeCriteria/DistanceOfferCriteria/DistanceOfferCriteria')
const WeightOfferCriteria = require('../../entities/OfferCriteria/OfferRangeCriteria/WeightOfferCriteria/WeightOfferCriteria')
const CouponsRepo = require('../../repos/CouponsRepo/CouponsRepo')
const Delivery = require('./Delivery')
const {
  INVALID_COUPON,
  DISTANCE_NOT_IN_RANGE,
  COUPON_APPLIED
} = require('../../constants/messages')
const DeliveryPackage = require('../../entities/DeliveryPackage/DeliveryPackage')
const VehiclesRepo = require('../../repos/VehiclesRepo/VehiclesRepo')

describe('Delivery', () => {
  let couponsRepo
  let vehiclesRepo

  beforeEach(() => {
    const distanceOfferCriteria = new DistanceOfferCriteria({
      lowerBound: 50,
      upperBound: 150
    })
    const weightOfferCriteria = new WeightOfferCriteria({
      lowerBound: 100,
      upperBound: 250
    })
    const percentageCoupon = new PercentageCoupon({
      percentage: 7,
      offerCode: 'OFFR002',
      offerCriterias: [distanceOfferCriteria, weightOfferCriteria]
    })
    couponsRepo = new CouponsRepo()
    couponsRepo.addCoupon(percentageCoupon)
    vehiclesRepo = new VehiclesRepo()
  })

  describe('getDeliveryCost', () => {
    test('get delivery cost', () => {
      const delivery = new Delivery({
        baseDeliveryCost: 100,
        couponsRepo,
        vehiclesRepo,
        amountFor1Km: 5,
        amountFor1Kg: 10
      })
      const expectedDeliveryCost = 250

      const actualDeliveryCost = delivery.getDeliveryCost({
        weightInKG: 10,
        distanceInKM: 10
      })

      expect(actualDeliveryCost).toBe(expectedDeliveryCost)
    })
  })
  describe('getDeliveryPackageWithOfferDetails', () => {
    test('Get delivery package with offer details for invalid coupon', () => {
      const delivery = new Delivery({
        baseDeliveryCost: 100,
        couponsRepo,
        vehiclesRepo,
        amountFor1Km: 5,
        amountFor1Kg: 10
      })
      const expectedDeliveryCost = 150
      const expectedDiscountAmount = 0
      const expectedMsg = INVALID_COUPON

      const {
        discountAmount,
        deliveryCost,
        offerStatus
      } = delivery.getDeliveryPackageWithOfferDetails(
        new DeliveryPackage({
          deliveryCost: 150,
          weightInKG: 10,
          distanceInKM: 10,
          offerCode: '111GET'
        })
      )

      expect(deliveryCost).toBe(expectedDeliveryCost)
      expect(discountAmount).toBe(expectedDiscountAmount)
      expect(offerStatus).toBe(expectedMsg)
    })
    test('Get delivery package with offer details when distance not in range for the coupon code', () => {
      const delivery = new Delivery({
        baseDeliveryCost: 100,
        couponsRepo,
        vehiclesRepo,
        amountFor1Km: 5,
        amountFor1Kg: 10
      })
      const expectedDeliveryCost = 1205
      const expectedDiscountAmount = 0
      const expectedMsg = DISTANCE_NOT_IN_RANGE

      const {
        discountAmount,
        deliveryCost,
        offerStatus
      } = delivery.getDeliveryPackageWithOfferDetails(
        new DeliveryPackage({
          deliveryCost: 1205,
          weightInKG: 10,
          distanceInKM: 201,
          offerCode: 'OFFR002'
        })
      )

      expect(deliveryCost).toBe(expectedDeliveryCost)
      expect(discountAmount).toBe(expectedDiscountAmount)
      expect(offerStatus).toBe(expectedMsg)
    })
    test('Get delivery package with offer details all criterias meet', () => {
      const delivery = new Delivery({
        baseDeliveryCost: 100,
        couponsRepo,
        vehiclesRepo,
        amountFor1Km: 5,
        amountFor1Kg: 10
      })
      const expectedDeliveryCost = 1395
      const expectedDiscountAmount = 105
      const expectedMsg = COUPON_APPLIED

      const {
        discountAmount,
        deliveryCost,
        offerStatus
      } = delivery.getDeliveryPackageWithOfferDetails(
        new DeliveryPackage({
          deliveryCost: 1500,
          weightInKG: 110,
          distanceInKM: 60,
          offerCode: 'OFFR002'
        })
      )

      expect(deliveryCost).toBe(expectedDeliveryCost)
      expect(discountAmount).toBe(expectedDiscountAmount)
      expect(offerStatus).toBe(expectedMsg)
    })
  })
  describe('getDeliveryPackagesWithCostAndTime', () => {
    test('Get delivery packages with cost and time', () => {
      const packages = [
        new DeliveryPackage({
          id: 'PKG1',
          weightInKG: 50,
          distanceInKM: 30,
          offerCode: 'OFR001'
        }),
        new DeliveryPackage({
          id: 'PKG2',
          weightInKG: 75,
          distanceInKM: 125,
          offerCode: 'OFFR0008'
        }),
        new DeliveryPackage({
          id: 'PKG3',
          weightInKG: 175,
          distanceInKM: 100,
          offerCode: 'OFR001'
        }),
        new DeliveryPackage({
          id: 'PKG4',
          weightInKG: 110,
          distanceInKM: 60,
          offerCode: 'OFFR002'
        }),
        new DeliveryPackage({
          id: 'PKG5',
          weightInKG: 155,
          distanceInKM: 95,
          offerCode: 'NA'
        })
      ]
      const delivery = new Delivery({
        baseDeliveryCost: 100,
        couponsRepo,
        vehiclesRepo,
        amountFor1Km: 5,
        amountFor1Kg: 10,
        noOfVehicles: 2,
        maxSpeed: 70,
        maxCarriableWeight: 200
      })
      const [
        package1,
        package2,
        package3,
        package4,
        package5
      ] = delivery.getDeliveryPackagesWithCostAndTime(packages)
      expect(package1.deliveryCost).toBe(750)
      expect(package2.deliveryCost).toBe(1475)
      expect(package3.deliveryCost).toBe(2350)
      expect(package4.deliveryCost).toBe(1395)
      expect(package5.deliveryCost).toBe(2125)
      expect(package1.deliveryTime).toBe(3.98)
      expect(package2.deliveryTime).toBe(1.78)
      expect(package3.deliveryTime).toBe(1.42)
      expect(package4.deliveryTime).toBe(0.85)
      expect(package5.deliveryTime).toBe(4.18)
    })
  })
  describe('getPackagesGrouped', () => {
    test('Get packages grouped together with combined weight less than max carriable weight', () => {
      const packages = [
        new DeliveryPackage({
          id: 'PKG1',
          weightInKG: 50,
          distanceInKM: 30,
          offerCode: 'OFR001'
        }),
        new DeliveryPackage({
          id: 'PKG2',
          weightInKG: 75,
          distanceInKM: 125,
          offerCode: 'OFFR0008'
        }),
        new DeliveryPackage({
          id: 'PKG3',
          weightInKG: 175,
          distanceInKM: 100,
          offerCode: 'OFR001'
        }),
        new DeliveryPackage({
          id: 'PKG4',
          weightInKG: 110,
          distanceInKM: 60,
          offerCode: 'OFFR002'
        }),
        new DeliveryPackage({
          id: 'PKG5',
          weightInKG: 155,
          distanceInKM: 95,
          offerCode: 'NA'
        })
      ]
      const delivery = new Delivery({
        baseDeliveryCost: 100,
        couponsRepo,
        vehiclesRepo,
        amountFor1Km: 5,
        amountFor1Kg: 10,
        noOfVehicles: 2,
        maxSpeed: 70,
        maxCarriableWeight: 200
      })
      const groups = delivery.getPackagesGrouped(packages)
      expect(groups.GROUP_1.packages[0].weightInKG).toBe(175)
      expect(groups.GROUP_2.packages[0].weightInKG).toBe(155)
      expect(groups.GROUP_4.packages[0].weightInKG).toBe(110)
      expect(groups.GROUP_4.packages[1].weightInKG).toBe(75)
      expect(groups.GROUP_5.packages[0].weightInKG).toBe(50)
    })
  })
})
