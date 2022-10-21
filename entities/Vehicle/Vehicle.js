class Vehicle {
  #availableAt
  #maxSpeed
  #maxCarriableWeight
  #id

  constructor ({ id, availableAt = 0, maxSpeed, maxCarriableWeight }) {
    this.#id = id
    this.#availableAt = availableAt
    this.#maxSpeed = maxSpeed
    this.#maxCarriableWeight = maxCarriableWeight
  }

  get availableAt () {
    return this.#availableAt
  }

  get id () {
    return this.#id
  }

  get maxSpeed () {
    return this.#maxSpeed
  }

  get maxCarriableWeight () {
    return this.#maxCarriableWeight
  }

  set availableAt (availableAt) {
    this.#availableAt = availableAt
  }
}

module.exports = Vehicle
