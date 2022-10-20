class DeliveryPackage {
  #id
  #distanceInKM
  #weightInKG
  #offerCode
  #delivertCost
  #discountAmount
  #offerCodeApplied
  #offerStatus

  constructor ({ id, distanceInKM, weightInKG, offerCode }) {
    this.#id = id
    this.#distanceInKM = distanceInKM
    this.#weightInKG = weightInKG
    this.#offerCode = offerCode
    this.#offerCodeApplied = false
    this.#offerStatus = ''
    this.#delivertCost = 0
    this.#discountAmount = 0
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

  get delivertCost () {
    return this.#delivertCost
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

  setCostDetails ({
    delivertCost,
    discountAmount,
    offerCodeApplied,
    offerStatus
  }) {
    this.#delivertCost = delivertCost
    this.#discountAmount = discountAmount
    this.#offerCodeApplied = offerCodeApplied
    this.#offerStatus = offerStatus
    return this
  }

  static clone (deliveryPackage) {
    return new DeliveryPackage(deliveryPackage)
  }
}

module.exports = DeliveryPackage
