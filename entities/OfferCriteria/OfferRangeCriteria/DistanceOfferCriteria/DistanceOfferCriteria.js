const OfferRangeCriteria = require('../OfferRangeCriteria')

class DistanceOfferCriteria extends OfferRangeCriteria {
  /**
   * Create an DistanceOfferCriteria
   * @param {Object} bounds
   * @param {(number|null)} bounds.lowerBound
   * @param {(number|null)} bounds.upperBound
   */
  constructor (bounds) {
    super(bounds)
  }
}

module.exports = DistanceOfferCriteria
