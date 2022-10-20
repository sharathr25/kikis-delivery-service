const OfferRangeCriteria = require('../OfferRangeCriteria')

class DistanceOfferCriteria extends OfferRangeCriteria {
  /**
   *
   * @param {Object} bounds
   * @param {(number|null)} bounds.lowerBound
   * @param {(number|null)} bounds.upperBound
   */
  constructor (bounds) {
    super(bounds)
  }
}

module.exports = DistanceOfferCriteria
