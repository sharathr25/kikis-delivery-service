const Heap = require('../Heap/Heap')

class PriorityQueue {
  /**
   *
   * @param {Function} [comapareFunction]
   */
  constructor (compareFunction) {
    this.heap = new Heap(compareFunction)
  }

  /**
   *
   * @param {*} item
   */
  enqueue (item) {
    this.heap.insert(item)
  }

  /**
   *
   * @returns {*}
   */
  dequeue () {
    return this.heap.remove()
  }

  /**
   *
   * @returns {boolean}
   */
  isEmpty () {
    return this.heap.isEmpty()
  }
}

module.exports = PriorityQueue
