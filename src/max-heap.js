const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.sizeState = 0;
	}

	push(data, priority) {
		const node = new Node(data, priority);
		this.sizeState += 1;
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.sizeState) {

		}
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		return this.sizeState;
	}

	isEmpty() {
		return this.sizeState === 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.sizeState = 0;
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes.push(node);
			this.parentNodes[0].appendChild(node);
			if (this.parentNodes[0].right) {
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent) {
			if (node.parent.priority < node.priority) {
				const nodePosition = this.parentNodes.indexOf(node);
				const parentPosition = this.parentNodes.indexOf(node.parent);
					if (parentPosition !== -1) {
						const temp = this.parentNodes[nodePosition];
						this.parentNodes[nodePosition] = this.parentNodes[parentPosition];
						this.parentNodes[parentPosition] = temp;
					} else {
						this.parentNodes[nodePosition] = node.parent;
					}
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		} else {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
