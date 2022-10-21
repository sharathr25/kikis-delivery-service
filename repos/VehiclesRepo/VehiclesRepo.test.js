const VehiclesRepo = require('./VehiclesRepo')

describe('VehiclesRepo', () => {
  describe('getVehicles', () => {
    test('Should return passed number of vehicles', () => {
      const vehiclesRepo = new VehiclesRepo()
      const [vehicle] = vehiclesRepo.getVehicles({
        numberOfVehiclesRequired: 1,
        maxCarriableWeight: 100,
        maxSpeed: 70
      })
      expect(vehicle.maxSpeed).toBe(70)
      expect(vehicle.maxCarriableWeight).toBe(100)
    })
  })
})
