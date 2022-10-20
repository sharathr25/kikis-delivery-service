const Coupon = require('../Coupon')

class PercentageCoupon extends Coupon {
  #percentage

  /**
   * Create a coupon
   * @param {Object} coupon - The employee who is responsible for the project.
   * @param {string} coupon.percentage - The coupon code of the coupon
   */
  constructor (coupon) {
    const { percentage } = coupon
    super(coupon)
    this.#percentage = percentage
  }

  /**
   * Getter for percentage
   * @returns {number}
   */
  get percentage () {
    return this.#percentage
  }
}

module.exports = PercentageCoupon
