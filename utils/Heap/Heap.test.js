const Heap = require('./Heap')

describe('Heap', () => {
  describe('insert', () => {
    test('Should insert passed item to head', () => {
      const heap = new Heap()

      heap.insert(1)

      expect(heap.isEmpty()).toBe(false)
    })
  })
  describe('remove', () => {
    test('Should return removed item', () => {
      const heap = new Heap()

      heap.insert(1)
      const removedItem = heap.remove()

      expect(removedItem).toBe(1)
    })
  })
  describe('getMax', () => {
    test('Should return max', () => {
      const heap = new Heap()

      heap.insert(1)
      heap.insert(2)
      const maxItem = heap.getMax()

      expect(maxItem).toBe(2)
    })
  })
  describe('getItems', () => {
    test('Should return heap items', () => {
      const heap = new Heap()

      heap.insert(1)
      heap.insert(2)
      const [h1, h2] = heap.getItems()

      expect(h1).toBe(2)
      expect(h2).toBe(1)
    })
  })
})
