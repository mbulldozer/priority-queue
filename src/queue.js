const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.heap.size() < this.maxSize) {
			this.heap.push(data, priority);
		} else {
			throw new Error('Error: queue has max size');
		}
	}

	shift() {
		if (this.heap.sizeState !== 0) {
			return this.heap.pop();
		} else {
			throw new Error('Error: queue is empty');
		}
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
