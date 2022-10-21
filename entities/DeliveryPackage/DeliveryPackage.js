class DeliveryPackage {
  #id
  #distanceInKM
  #weightInKG
  #offerCode
  #deliveryCost
  #deliveryTime
  #discountAmount
  #offerCodeApplied
  #offerStatus

  constructor ({
    id,
    distanceInKM,
    weightInKG,
    offerCode,
    offerStatus = '',
    deliveryCost = 0,
    deliveryTime = 0,
    discountAmount = 0
  }) {
    this.#id = id
    this.#distanceInKM = distanceInKM
    this.#weightInKG = weightInKG
    this.#offerCode = offerCode
    this.#offerCodeApplied = false
    this.#offerStatus = offerStatus
    this.#deliveryCost = deliveryCost
    this.#deliveryTime = deliveryTime
    this.#discountAmount = discountAmount
  }

  get id () {
    return this.#id
  }

  get distanceInKM () {
    return this.#distanceInKM
  }

  get weightInKG () {
    return this.#weightInKG
  }

  get deliveryCost () {
    return this.#deliveryCost
  }

  get discountAmount () {
    return this.#discountAmount
  }

  get offerCode () {
    return this.#offerCode
  }

  get offerStatus () {
    return this.#offerStatus
  }

  get offerCodeApplied () {
    return this.#offerCodeApplied
  }

  get deliveryTime () {
    return this.#deliveryTime
  }

  set deliveryCost (deliveryCost) {
    this.#deliveryCost = deliveryCost
  }

  set deliveryTime (deliveryTime) {
    this.#deliveryTime = deliveryTime
  }

  setCostDetails ({
    deliveryCost,
    discountAmount,
    offerCodeApplied,
    offerStatus
  }) {
    this.#deliveryCost = deliveryCost
    this.#discountAmount = discountAmount
    this.#offerCodeApplied = offerCodeApplied
    this.#offerStatus = offerStatus
  }

  static clone (deliveryPackage) {
    return new DeliveryPackage(deliveryPackage)
  }
}

module.exports = DeliveryPackage
