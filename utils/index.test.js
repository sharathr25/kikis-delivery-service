const { toFixed2 } = require('.')

describe('toFixed2', () => {
  test('should return number with 2 decimal place values', () => {
    expect(toFixed2(0.8585858)).toBe(0.85)
  })
})
