class Comparator {
  /**
   *
   * @param {Function} [compareFunction = Comparator.defaultCompareFunction]
   */
  constructor (compareFunction = Comparator.defaultCompareFunction) {
    this.compare = compareFunction
  }

  /**
   *
   * @param {Number} a
   * @param {Number} b
   * @returns {(-1|0|1)}
   */
  static defaultCompareFunction (a, b) {
    if (a === b) return 0
    return a < b ? -1 : 1
  }

  /**
   *
   * @param {Number} a
   * @param {Number} b
   * @returns {Boolean}
   */
  equals (a, b) {
    return this.compare(a, b) === 0
  }

  /**
   *
   * @param {Number} a
   * @param {Number} b
   * @returns {Boolean}
   */
  lessThan (a, b) {
    return this.compare(a, b) < 0
  }

  /**
   *
   * @param {Number} a
   * @param {Number} b
   * @returns {Boolean}
   */
  greaterThan (a, b) {
    return this.compare(a, b) > 0
  }

  /**
   *
   * @param {Number} a
   * @param {Number} b
   * @returns {Boolean}
   */
  lessThanOrEqual (a, b) {
    return this.equals(a, b) || this.lessThan(a, b)
  }

  /**
   *
   * @param {Number} a
   * @param {Number} b
   * @returns {Boolean}
   */
  greaterThanOrEqual (a, b) {
    return this.equals(a, b) || this.greaterThan(a, b)
  }
}

module.exports = Comparator
