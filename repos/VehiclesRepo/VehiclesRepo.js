const Vehicle = require('../../entities/Vehicle/Vehicle')

class VehiclesRepo {
  constructor () {}

  getVehicles (numberOfVehiclesRequired, maxSpeed, maxCarriableWeight) {
    return Array(numberOfVehiclesRequired)
      .fill(null)
      .map(
        (_, i) =>
          new Vehicle({ id: `VEHICLE_${i + 1}`, maxSpeed, maxCarriableWeight })
      )
  }
}

module.exports = VehiclesRepo
