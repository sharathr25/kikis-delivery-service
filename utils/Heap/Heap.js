const Comparator = require('../Comparator')

class Heap {
  /**
   *
   * @param {Function} [comapareFunction]
   */
  constructor (comapareFunction) {
    this.items = []
    this.size = 0
    this.compare = new Comparator(comapareFunction)
  }

  /**
   *
   * @param {Number} index
   * @returns {Number}
   */
  parentIndex (index) {
    return Math.floor((index - 1) / 2)
  }

  /**
   *
   * @param {*} first
   * @param {*} second
   */
  swap (first, second) {
    const temp = this.items[first]
    this.items[first] = this.items[second]
    this.items[second] = temp
  }

  bubbleUp () {
    let index = this.size - 1

    while (
      index > 0 &&
      this.compare.greaterThan(
        this.items[index],
        this.items[this.parentIndex(index)]
      )
    ) {
      const parentIndex = this.parentIndex(index)
      this.swap(index, parentIndex)
      index = parentIndex
    }
  }

  /**
   *
   * @param {*} data
   */
  insert (data) {
    if (this.size === this.maxSize) throw new Error('Heap is full')
    this.items[this.size++] = data
    this.bubbleUp()
  }

  /**
   *
   * @param {Number} index
   * @returns {Number}
   */
  leftChildIndex (index) {
    return index * 2 + 1
  }

  /**
   *
   * @param {Number} index
   * @returns {Number}
   */
  rightChildIndex (index) {
    return index * 2 + 2
  }

  /**
   *
   * @param {Number} index
   * @returns {*}
   */
  leftChild (index) {
    return this.items[this.leftChildIndex(index)]
  }

  /**
   *
   * @param {Number} index
   * @returns {*}
   */
  rightChild (index) {
    return this.items[this.rightChildIndex(index)]
  }

  /**
   *
   * @param {Number} index
   * @returns {Boolean}
   */
  hasLeftChild (index) {
    return this.leftChildIndex(index) <= this.size
  }

  /**
   *
   * @param {Number} index
   * @returns {Boolean}
   */
  hasRightChild (index) {
    return this.rightChildIndex(index) <= this.size
  }

  /**
   *
   * @param {Number} index
   * @returns {Boolean}
   */
  isValidParent (index) {
    if (!this.hasLeftChild(index)) return true
    if (!this.hasRightChild(index))
      return this.compare.greaterThanOrEqual(
        this.items[index],
        this.items[this.leftChildIndex(index)]
      )
    return (
      this.compare.greaterThanOrEqual(
        this.items[index],
        this.items[this.leftChildIndex(index)]
      ) &&
      this.compare.greaterThanOrEqual(
        this.items[index],
        this.items[this.rightChildIndex(index)]
      )
    )
  }

  /**
   *
   * @param {Number} index
   * @returns {Number}
   */
  largestItemIndex (index) {
    if (!this.hasLeftChild(index)) return index
    if (!this.hasRightChild(index)) return this.leftChildIndex(index)
    return this.compare.greaterThan(
      this.leftChild(index),
      this.rightChild(index)
    )
      ? this.leftChildIndex(index)
      : this.rightChildIndex(index)
  }

  bubbleDown () {
    let index = 0
    while (index <= this.size && !this.isValidParent(index)) {
      const largestItemIndex = this.largestItemIndex(index)
      this.swap(index, largestItemIndex)
      index = largestItemIndex
    }
  }

  /**
   *
   * @returns {*}
   */
  remove () {
    if (this.size === 0) throw new Error('Heap is empty')
    const root = this.items[0]
    this.items[0] = this.items[--this.size]
    this.bubbleDown()
    return root
  }

  /**
   *
   * @returns {*}
   */
  getMax () {
    if (this.size === 0) throw new Error('Heap is empty')
    return this.items[0]
  }

  /**
   *
   * @returns {*[]}
   */
  getItems () {
    return this.items
  }

  /**
   *
   * @returns {Boolean}
   */
  isEmpty () {
    return this.size === 0
  }
}

module.exports = Heap
