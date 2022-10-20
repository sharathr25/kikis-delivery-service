const WeightOfferCriteria = require('./WeightOfferCriteria')

describe('WeightOfferCriteria', () => {
  test('Creare new WeightOfferCriteria', () => {
    const { lowerBound, upperBound, unit } = new WeightOfferCriteria({
      lowerBound: 1,
      upperBound: 10
    })
    expect(lowerBound).toBe(1)
    expect(upperBound).toBe(10)
    expect(unit).toBe('KG')
  })
})
