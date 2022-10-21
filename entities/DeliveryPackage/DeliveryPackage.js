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

  /**
   * Create a DeliveryPackage
   * @param {Object} object
   * @param {string} object.id
   * @param {number} object.distanceInKM
   * @param {number} object.weightInKG
   * @param {string} object.offerCode
   * @param {string} object.offerStatus
   * @param {number} object.deliveryCost
   * @param {number} object.deliveryTime
   * @param {number} object.discountAmount
   */
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

  /**
   * Getter for id
   * @returns {string}
   */
  get id () {
    return this.#id
  }

  /**
   * Getter for distanceInKM
   * @returns {number}
   */
  get distanceInKM () {
    return this.#distanceInKM
  }

  /**
   * Getter for weightInKG
   * @returns {number}
   */
  get weightInKG () {
    return this.#weightInKG
  }

  /**
   * Getter for deliveryCost
   * @returns {number}
   */
  get deliveryCost () {
    return this.#deliveryCost
  }

  /**
   * Getter for discountAmount
   * @returns {number}
   */
  get discountAmount () {
    return this.#discountAmount
  }

  /**
   * Getter for offerCode
   * @returns {string}
   */
  get offerCode () {
    return this.#offerCode
  }

  /**
   * Getter for offerStatus
   * @returns {string}
   */
  get offerStatus () {
    return this.#offerStatus
  }

  /**
   * Getter for offerCodeApplied
   * @returns {boolean}
   */
  get offerCodeApplied () {
    return this.#offerCodeApplied
  }

  /**
   * Getter for deliveryTime
   * @returns {number}
   */
  get deliveryTime () {
    return this.#deliveryTime
  }

  /**
   * Setter for deliveryCost
   * @param {number} deliveryCost
   */
  set deliveryCost (deliveryCost) {
    this.#deliveryCost = deliveryCost
  }

  /**
   * Setter for deliveryTime
   * @param {number} deliveryTime
   */
  set deliveryTime (deliveryTime) {
    this.#deliveryTime = deliveryTime
  }

  /**
   * Set cost and offer details of the DeliveryPackage
   * @param {Object} object
   * @param {string} object.offerStatus
   * @param {number} object.deliveryCost
   * @param {boolean} object.offerCodeApplied
   * @param {number} object.discountAmount
   */
  setCostAndOfferDetails ({
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
}

module.exports = DeliveryPackage
