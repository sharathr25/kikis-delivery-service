import PercentageCoupon from '../../entities/Coupon/PercentageCoupon/PercentageCoupon'
import DistanceOfferCriteria from '../../entities/OfferCriteria/OfferRangeCriteria/DistanceOfferCriteria/DistanceOfferCriteria'
import WeightOfferCriteria from '../../entities/OfferCriteria/OfferRangeCriteria/WeightOfferCriteria/WeightOfferCriteria'

const CouponsRepo = require('./CouponsRepo')

const couponsRepo = new CouponsRepo()

const coupon1 = new PercentageCoupon({
  percentage: 10,
  offerCode: 'OFR001',
  offerCriterias: [
    new DistanceOfferCriteria({ upperBound: 200 }),
    new WeightOfferCriteria({ lowerBound: 70, upperBound: 100 })
  ]
})

const coupon2 = new PercentageCoupon({
  percentage: 7,
  offerCode: 'OFR002',
  offerCriterias: [
    new DistanceOfferCriteria({ lowerBound: 50, upperBound: 150 }),
    new WeightOfferCriteria({ lowerBound: 100, upperBound: 250 })
  ]
})

const coupon3 = new PercentageCoupon({
  percentage: 5,
  offerCode: 'OFR003',
  offerCriterias: [
    new DistanceOfferCriteria({ lowerBound: 50, upperBound: 250 }),
    new WeightOfferCriteria({ lowerBound: 10, upperBound: 150 })
  ]
})

couponsRepo.addCoupon(coupon1)
couponsRepo.addCoupon(coupon2)
couponsRepo.addCoupon(coupon3)

export default couponsRepo
