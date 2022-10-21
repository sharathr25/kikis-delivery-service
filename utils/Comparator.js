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
   * @param {number} a
   * @param {number} b
   * @returns {(-1|0|1)}
   */
  static defaultCompareFunction (a, b) {
    if (a === b) return 0
    return a < b ? -1 : 1
  }

  /**
   *
   * @param {number} a
   * @param {number} b
   * @returns {boolean}
   */
  equals (a, b) {
    return this.compare(a, b) === 0
  }

  /**
   *
   * @param {number} a
   * @param {number} b
   * @returns {boolean}
   */
  lessThan (a, b) {
    return this.compare(a, b) < 0
  }

  /**
   *
   * @param {number} a
   * @param {number} b
   * @returns {boolean}
   */
  greaterThan (a, b) {
    return this.compare(a, b) > 0
  }

  /**
   *
   * @param {number} a
   * @param {number} b
   * @returns {boolean}
   */
  lessThanOrEqual (a, b) {
    return this.equals(a, b) || this.lessThan(a, b)
  }

  /**
   *
   * @param {number} a
   * @param {number} b
   * @returns {boolean}
   */
  greaterThanOrEqual (a, b) {
    return this.equals(a, b) || this.greaterThan(a, b)
  }
}

module.exports = Comparator
