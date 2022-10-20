const OfferRangeCriteria = require('../OfferRangeCriteria')

class DistanceOfferCriteria extends OfferRangeCriteria {
  #unit
  /**
   *
   * @param {Object} bounds
   * @param {(number|null)} bounds.lowerBound
   * @param {(number|null)} bounds.upperBound
   */
  constructor (bounds) {
    super(bounds)
    this.#unit = 'KM'
  }

  /**
   * Getter for unit
   * @returns {string}
   */
  get unit () {
    return this.#unit
  }
}

module.exports = DistanceOfferCriteria
