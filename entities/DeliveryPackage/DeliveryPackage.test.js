const DeliveryPackage = require('./DeliveryPackage')

describe('DeliveryPackage', () => {
  test('Create a DeliveryPackage', () => {
    const deliveryPackage = new DeliveryPackage({
      id: 'PKG1',
      weightInKG: 10,
      distanceInKM: 10,
      offerCode: '111111'
    })
    expect(deliveryPackage.id).toBe('PKG1')
    expect(deliveryPackage.weightInKG).toBe(10)
    expect(deliveryPackage.distanceInKM).toBe(10)
    expect(deliveryPackage.offerCode).toBe('111111')
    expect(deliveryPackage.offerCodeApplied).toBe(false)
    expect(deliveryPackage.offerStatus).toBe('')
    expect(deliveryPackage.discountAmount).toBe(0)
    expect(deliveryPackage.deliveryCost).toBe(0)
    expect(deliveryPackage.deliveryTime).toBe(0)
  })
  describe('setCostAndOfferDetails', () => {
    test('Should cost and offer details', () => {
      const deliveryPackage = new DeliveryPackage({
        id: 'PKG1',
        weightInKG: 10,
        distanceInKM: 10,
        offerCode: '111111'
      })
      deliveryPackage.setCostAndOfferDetails({
        deliveryCost: 1000,
        offerCodeApplied: true,
        offerStatus: 'APPLIED',
        discountAmount: 10
      })
      expect(deliveryPackage.offerCodeApplied).toBe(true)
      expect(deliveryPackage.offerStatus).toBe('APPLIED')
      expect(deliveryPackage.discountAmount).toBe(10)
      expect(deliveryPackage.deliveryCost).toBe(1000)
    })
  })
})
