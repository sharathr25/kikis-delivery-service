const Vehicle = require('./Vehicle')

describe('Coupon', () => {
  test('Creating a new Coupon', () => {
    const coupon = new Vehicle({
      id: 1
    })
    expect(coupon.id).toEqual(1)
  })
})
