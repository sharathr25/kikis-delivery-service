const Coupon = require('../../entities/Coupon/Coupon')

class CouponsService {
  #coupons

  /**
   * Create a coupon
   * @param {Object.<string, Coupon>} Container} coupons
   */
  constructor (coupons = {}) {
    this.#coupons = coupons
  }

  /**
   * Add a coupon
   * @param {Coupon} coupon
   * @returns {CouponsService}
   */
  addCoupon (coupon) {
    this.#coupons[coupon.offerCode] = coupon
    return this
  }

  /**
   * Remove a coupon
   * @param {String} offerCode
   */
  removeCoupon (offerCode) {
    delete this.#coupons[offerCode]
  }

  /**
   * Get a coupon bu offer code
   * @param {string} offerCode
   * @returns {Coupon}
   */
  getCoupon (offerCode) {
    return this.#coupons[offerCode]
  }

  /**
   * Getter for coupons
   * @returns {Object.<string, Coupon>}
   */
  get coupons () {
    return this.#coupons
  }
}

module.exports = CouponsService
