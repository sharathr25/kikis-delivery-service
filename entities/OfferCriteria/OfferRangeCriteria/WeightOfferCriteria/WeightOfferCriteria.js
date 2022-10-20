const OfferRangeCriteria = require('../OfferRangeCriteria')

class WeightOfferCriteria extends OfferRangeCriteria {
  #unit
  /**
   *
   * @param {Object} bounds
   * @param {(number|null)} bounds.lowerBound
   * @param {(number|null)} bounds.upperBound
   */
  constructor (bounds) {
    super(bounds)
    this.#unit = 'KG'
  }

  /**
   * Getter for unit
   * @returns {string}
   */
  get unit () {
    return this.#unit
  }
}

module.exports = WeightOfferCriteria
