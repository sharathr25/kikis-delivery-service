const PercentageCoupon = require('./PercentageCoupon')

describe('PercentageCoupon', () => {
  test('Create new percentage coupon', () => {
    const percentageCoupon = new PercentageCoupon({ percentage: 10 })

    const { percentage } = percentageCoupon
    expect(percentage).toEqual(10)
  })
})
