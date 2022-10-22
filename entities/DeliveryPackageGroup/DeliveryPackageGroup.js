const DeliveryPackage = require('../DeliveryPackage/DeliveryPackage')

class DeliveryPackageGroup {
  #packages
  #totalWeight

  /**
   *
   * @param {[DeliveryPackage]} packages
   * @param {[number]} totalWeight
   */
  constructor ({ packages, totalWeight }) {
    this.#packages = packages
    this.#totalWeight = totalWeight
  }

  /**
   * Getter for packages
   * @returns {[DeliveryPackage]}
   */
  get packages () {
    return this.#packages
  }

  /**
   * Getter for packages
   * @returns {number}
   */
  get totalWeight () {
    return this.#totalWeight
  }
}

module.exports = DeliveryPackageGroup
