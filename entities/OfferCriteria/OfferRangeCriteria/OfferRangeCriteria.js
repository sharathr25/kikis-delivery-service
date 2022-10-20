const OfferCriteria = require('../OfferCriteria')

class OfferRangeCriteria extends OfferCriteria {
  #lowerBound
  #upperBound

  /**
   *
   * @param {Object} bounds
   * @param {(number|null)} bounds.lowerBound
   * @param {(number|null)} bounds.upperBound
   */
  constructor (bounds) {
    const { lowerBound, upperBound } = bounds
    super(bounds)
    this.#lowerBound = lowerBound || -Infinity
    this.#upperBound = upperBound || Infinity
  }

  get lowerBound () {
    return this.#lowerBound
  }

  get upperBound () {
    return this.#upperBound
  }
}

module.exports = OfferRangeCriteria
