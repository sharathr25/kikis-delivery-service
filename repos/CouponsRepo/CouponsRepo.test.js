const Coupon = require('../../entities/Coupon/Coupon')
const CouponsService = require('./CouponsRepo')

describe('CouponsService', () => {
  test('Should create CouponsService without any coupons', () => {
    const couponsService = new CouponsService()
    expect(couponsService.coupons).toEqual({})
  })

  describe('addCoupon', () => {
    test('Should be able to add coupon', () => {
      const couponsService = new CouponsService()
      const coupon = new Coupon({ offerCode: 'XYZ123' })

      couponsService.addCoupon(coupon)

      const addedCoupon = couponsService.getCoupon('XYZ123')
      expect(addedCoupon.offerCode).toEqual('XYZ123')
    })
  })
  describe('removeCoupon', () => {
    test('Should be able remove coupon', () => {
      const coupon = new Coupon({ offerCode: 'XYZ123' })
      const couponsService = new CouponsService({ XYZ123: coupon })

      couponsService.removeCoupon('XYZ123')

      const removedCoupon = couponsService.getCoupon('XYZ123')
      expect(removedCoupon).toEqual(undefined)
    })
  })
})
