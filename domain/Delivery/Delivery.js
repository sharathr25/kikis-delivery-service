const CouponsRepo = require('../../repos/CouponsRepo/CouponsRepo')
const DistanceOfferCriteria = require('../../entities/OfferCriteria/OfferRangeCriteria/DistanceOfferCriteria/DistanceOfferCriteria')
const WeightOfferCriteria = require('../../entities/OfferCriteria/OfferRangeCriteria/WeightOfferCriteria/WeightOfferCriteria')
const PercentageCoupon = require('../../entities/Coupon/PercentageCoupon/PercentageCoupon')
const DeliveryPackage = require('../../entities/DeliveryPackage/DeliveryPackage')
const VehiclesRepo = require('../../repos/VehiclesRepo/VehiclesRepo')
const Vehicle = require('../../entities/Vehicle/Vehicle')
const DeliveryPackageGroup = require('../../entities/DeliveryPackageGroup/DeliveryPackageGroup')
const Heap = require('../../utils/Heap/Heap')
const PriorityQueue = require('../../utils/PriorityQueue/PriorityQueue')
const { toFixed2 } = require('../../utils')
const {
  DISTANCE_NOT_IN_RANGE,
  INVALID_COUPON,
  WEIGHT_NOT_IN_RANGE,
  COUPON_APPLIED
} = require('../../constants/messages')

class Delivery {
  #baseDeliveryCost
  #couponsRepo
  #vehiclesRepo
  #amountFor1Km
  #amountFor1Kg
  #noOfVehicles
  #maxSpeed
  #maxCarriableWeight

  /**
   *
   * @param {number} baseDeliveryCost
   * @param {CouponsRepo} couponsRepo
   * @param {VehiclesRepo} vehiclesRepo
   * @param {number} amountFor1Km
   * @param {number} amountFor1Kg
   * @param {number} noOfVehicles
   * @param {number} maxSpeed
   * @param {number} maxCarriableWeight
   */
  constructor ({
    baseDeliveryCost,
    couponsRepo,
    vehiclesRepo,
    amountFor1Km,
    amountFor1Kg,
    noOfVehicles = 0,
    maxSpeed = 0,
    maxCarriableWeight = 0
  }) {
    this.#baseDeliveryCost = baseDeliveryCost
    this.#couponsRepo = couponsRepo
    this.#vehiclesRepo = vehiclesRepo
    this.#amountFor1Km = amountFor1Km
    this.#amountFor1Kg = amountFor1Kg
    this.#noOfVehicles = noOfVehicles
    this.#maxSpeed = maxSpeed
    this.#maxCarriableWeight = maxCarriableWeight
  }

  /**
   * @param {number} baseDeliveryCost
   */
  set baseDeliveryCost (baseDeliveryCost) {
    this.#baseDeliveryCost = baseDeliveryCost
  }

  /**
   * @param {number} noOfVehicles
   */
  set noOfVehicles (noOfVehicles) {
    this.#noOfVehicles = noOfVehicles
  }

  /**
   * @param {number} maxSpeed
   */
  set maxSpeed (maxSpeed) {
    this.#maxSpeed = maxSpeed
  }

  /**
   * @param {number} maxCarriableWeight
   */
  set maxCarriableWeight (maxCarriableWeight) {
    this.#maxCarriableWeight = maxCarriableWeight
  }

  /**
   * @param {number} amountFor1Kg
   */
  set amountFor1Kg (amountFor1Kg) {
    this.#amountFor1Kg = amountFor1Kg
  }

  /**
   * @param {number} amountFor1Km
   */
  set amountFor1Km (amountFor1Km) {
    this.#amountFor1Km = amountFor1Km
  }

  /**
   *
   * @param {number} weightInKG
   * @param {number} distanceInKM
   * @returns {number}
   */
  getDeliveryCost ({ weightInKG, distanceInKM }) {
    return (
      this.#baseDeliveryCost +
      weightInKG * this.#amountFor1Kg +
      distanceInKM * this.#amountFor1Km
    )
  }

  /**
   *
   * @param {number} value
   * @param {Object} bounds
   * @param {[number]} bounds.lowerBound
   * @param {[number]} bounds.upperBound
   * @returns {boolean}
   */
  isInValidRange ({ value, range }) {
    const { lowerBound, upperBound } = range
    return value >= (lowerBound | -Infinity) && value <= (upperBound | Infinity)
  }

  /**
   *
   * @param {DeliveryPackage} deliveryPackage
   * @returns {DeliveryPackage}
   */
  getDeliveryPackageWithOfferDetails (deliveryPackage) {
    const {
      deliveryCost,
      offerCode,
      distanceInKM,
      weightInKG
    } = deliveryPackage
    let discountAmount = 0
    let offerCodeApplied = false

    const coupon = this.#couponsRepo.getCoupon(offerCode)

    if (!coupon) {
      deliveryPackage.setCostAndOfferDetails({
        discountAmount,
        deliveryCost,
        offerCodeApplied,
        offerStatus: INVALID_COUPON
      })
      return deliveryPackage
    }

    for (const criteria of coupon.offerCriterias) {
      if (criteria instanceof DistanceOfferCriteria) {
        if (
          !this.isInValidRange({
            value: distanceInKM,
            range: criteria
          })
        ) {
          deliveryPackage.setCostAndOfferDetails({
            discountAmount,
            deliveryCost,
            offerCodeApplied,
            offerStatus: DISTANCE_NOT_IN_RANGE
          })
          return deliveryPackage
        }
      } else if (criteria instanceof WeightOfferCriteria) {
        if (
          !this.isInValidRange({
            value: weightInKG,
            range: criteria
          })
        ) {
          deliveryPackage.setCostAndOfferDetails({
            discountAmount: 0,
            deliveryCost,
            offerCodeApplied,
            offerStatus: WEIGHT_NOT_IN_RANGE
          })
          return deliveryPackage
        }
      }
    }

    if (coupon instanceof PercentageCoupon) {
      const { percentage } = coupon
      const discount = Math.floor(deliveryCost * (percentage / 100))

      const deliveryCostWithDiscount = deliveryCost - discount
      deliveryPackage.setCostAndOfferDetails({
        discountAmount: discount,
        deliveryCost: deliveryCostWithDiscount,
        offerCodeApplied: true,
        offerStatus: COUPON_APPLIED
      })
      return deliveryPackage
    }
  }

  /**
   *
   * @param {DeliveryPackage} deliveryPackage0
   * @returns {DeliveryPackage}
   */
  getDeliveryPackageWithDeliveryCost (deliveryPackage) {
    const { weightInKG, distanceInKM } = deliveryPackage
    const deliveryCost = this.getDeliveryCost({
      weightInKG,
      distanceInKM
    })
    deliveryPackage.deliveryCost = deliveryCost
    return deliveryPackage
  }

  /**
   *
   * @param {[DeliveryPackage]} pacakges
   * @returns {Heap<DeliveryPackageGroup>}
   */
  getDeliveryPackageGroups (packages) {
    const deliveryPackageGroups = new Heap(
      (a, b) => a.totalWeight - b.totalWeight
    )
    const packagesSorted = [...packages].sort(
      (a, b) => b.weightInKG - a.weightInKG
    )
    let total = 0
    let tempPackages = []
    for(let i = 0; i < packagesSorted.length;) {
      const package0 = packagesSorted[i]
      const weightInKG = package0.weightInKG
      if(total + weightInKG <= this.#maxCarriableWeight) {
        total += weightInKG
        tempPackages.push(package0)
        i++;
      } else {
        deliveryPackageGroups.insert(
          new DeliveryPackageGroup({
            packages: tempPackages,
            totalWeight: total
          })
        )
        total = 0;
        tempPackages = []
      }
    }
    if (tempPackages.length) {
      deliveryPackageGroups.insert(
        new DeliveryPackageGroup({
          packages: tempPackages,
          totalWeight: total
        })
      )
    }
    return deliveryPackageGroups
  }

  /**
   *
   * @param {[Vehicle]} vehicles
   * @returns {PriorityQueue}
   */
  getVehiclesQueue (vehicles) {
    const vehiclesQueue = new PriorityQueue(
      (a, b) => b.availableAt - a.availableAt
    )

    vehicles.forEach(v => vehiclesQueue.enqueue(v))

    return vehiclesQueue
  }

  /**
   *
   * @param {[DeliveryPackage]} deliveryPackages
   * @returns {[DeliveryPackage]}
   */
  getDeliveryPackagesWithCostAndTime (deliveryPackages) {
    const packageGroupsHeap = this.getDeliveryPackageGroups(deliveryPackages)

    const vehicles = this.#vehiclesRepo.getVehicles({
      numberOfVehiclesRequired: this.#noOfVehicles,
      maxSpeed: this.#maxSpeed,
      maxCarriableWeight: this.#maxCarriableWeight
    })
    const vehiclesQueue = this.getVehiclesQueue(vehicles)

    while (!packageGroupsHeap.isEmpty()) {
      let maxTime = -Infinity
      const vehicle = vehiclesQueue.dequeue()
      const packageGroup = packageGroupsHeap.remove()
      const packages = packageGroup.packages
      for (let package0 of packages) {
        package0 = this.getDeliveryPackageWithDeliveryCost(package0)
        package0 = this.getDeliveryPackageWithOfferDetails(package0)
        const time = toFixed2(package0.distanceInKM / vehicle.maxSpeed)
        maxTime = Math.max(time, maxTime)
        package0.deliveryTime = toFixed2(vehicle.availableAt + time)
      }
      vehicle.availableAt += maxTime * 2
      vehiclesQueue.enqueue(vehicle)
    }

    return deliveryPackages
  }
}

module.exports = Delivery
