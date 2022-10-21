const OfferRangeCriteria = require('../OfferRangeCriteria')

class WeightOfferCriteria extends OfferRangeCriteria {
  /**
   * Create an WeightOfferCriteria
   * @param {Object} bounds
   * @param {(number|null)} bounds.lowerBound
   * @param {(number|null)} bounds.upperBound
   */
  constructor (bounds) {
    super(bounds)
  }
}

module.exports = WeightOfferCriteria
