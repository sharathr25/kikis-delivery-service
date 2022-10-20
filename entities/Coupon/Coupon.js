const OfferCriteria = require('../OfferCriteria/OfferCriteria')

class Coupon {
  #offerCode
  #offerCriterias

  /**
   * Create a coupon
   * @param {Object} coupon - The coupon.
   * @param {string} coupon.offerCode - The offer code of the coupon
   * @param {[OfferCriteria]} coupon.offerCriterias - The criterias to get this coupon applied
   */
  constructor (coupon) {
    const { offerCode, offerCriterias } = coupon
    this.#offerCode = offerCode
    this.#offerCriterias = offerCriterias
  }

  /**
   * Getter for coupon code
   * @returns {string}
   */
  get offerCode () {
    return this.#offerCode
  }

  /**
   * Getter for offer criterias
   * @returns {[OfferCriteria]}
   */
  get offerCriterias () {
    return this.#offerCriterias
  }
}

module.exports = Coupon
