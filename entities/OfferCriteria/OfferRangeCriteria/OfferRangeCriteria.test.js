const OfferRangeCriteria = require('./OfferRangeCriteria')

describe('OfferRangeCriteria', () => {
  test('New offer range criteria object', () => {
    const offerRangeCriteria = new OfferRangeCriteria({
      lowerBound: 1,
      upperBound: 10
    })

    const { lowerBound, upperBound } = offerRangeCriteria
    expect(lowerBound).toBe(1)
    expect(upperBound).toBe(10)
  })
})
