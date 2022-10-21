const Vehicle = require('../../entities/Vehicle/Vehicle')

class VehiclesRepo {
  constructor () {}

  /**
   * Get required number of vehicles
   * @param {Object} object
   * @param {number} object.numberOfVehiclesRequired
   * @param {number} object.maxSpeed
   * @param {number} object.maxCarriableWeight
   * @returns {[Vehicle]}
   */
  getVehicles ({ numberOfVehiclesRequired, maxSpeed, maxCarriableWeight }) {
    return Array(numberOfVehiclesRequired)
      .fill(null)
      .map(
        (_, i) =>
          new Vehicle({ id: `VEHICLE_${i + 1}`, maxSpeed, maxCarriableWeight })
      )
  }
}

module.exports = VehiclesRepo
