const Coupon = require('./Coupon')

describe('Coupon', () => {
  test('Creating a new Coupon', () => {
    const coupon = new Coupon({
      offerCode: 'OFR001',
      offerCriterias: []
    })
    expect(coupon.offerCode).toEqual('OFR001')
    expect(coupon.offerCriterias).toEqual([])
  })
})
