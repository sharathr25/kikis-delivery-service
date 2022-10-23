const PriorityQueue = require('./PriorityQueue')

describe('PriorityQueue', () => {
  describe('enqueue', () => {
    test('should insert an item into the queue', () => {
      const priorityQueue = new PriorityQueue()

      expect(priorityQueue.isEmpty()).toBeTruthy()
      priorityQueue.enqueue(1)
      expect(priorityQueue.isEmpty()).toBeFalsy()
    })
  })
  describe('dequeue', () => {
    test('should remove an item from the queue', () => {
      const priorityQueue = new PriorityQueue()
      priorityQueue.enqueue(1)

      expect(priorityQueue.isEmpty()).toBeFalsy()
      priorityQueue.dequeue()
      expect(priorityQueue.isEmpty()).toBeTruthy()
    })
  })
})
