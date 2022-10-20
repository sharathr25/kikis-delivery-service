const DistanceOfferCriteria = require('./DistanceOfferCriteria')

describe('DistaceOfferCriteria', () => {
  test('Creare new DistaceOfferCriteria', () => {
    const { lowerBound, upperBound, unit } = new DistanceOfferCriteria({
      lowerBound: 1,
      upperBound: 10
    })
    expect(lowerBound).toBe(1)
    expect(upperBound).toBe(10)
    expect(unit).toBe('KM')
  })
})
