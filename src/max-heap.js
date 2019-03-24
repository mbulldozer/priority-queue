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
		if (this.root) {
			const detachedRoot  = this.detachRoot();
			this.sizeState -= 1;
			this.restoreRootFromLastInsertedNode(detachedRoot);
			this.shiftNodeDown(this.root);
			return detachedRoot.data;
		} 
	}

	detachRoot() {
		if (this.root == this.parentNodes[0]) {
			this.parentNodes.shift()
		}
		const detachedRoot = this.root;
		this.root = null;
		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length) {
			const lastInsertedNode = this.parentNodes[this.parentNodes.length-1];
			this.root = lastInsertedNode;
			this.parentNodes.pop();
			if (this.root.parent !== detached) {
				if (this.parentNodes.indexOf(this.root.parent) < 0) {
					this.parentNodes.unshift(this.root.parent);
				}			
			}
			if (this.root.parent) {
				this.root.parent.removeChild(this.root);
			}		
			if (detached.left) {
				this.root.appendChild(detached.left);
			}
			if (detached.right) {
				this.root.appendChild(detached.right);
			}
			if (!this.root.left || !this.root.right) {
				this.parentNodes.unshift(this.root);
			}
		}
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
		if (node && node.left) {
			let nodeChild;
			if (!node.right || node.left.priority >= node.right.priority) {
				nodeChild = node.left;
			} else {
				nodeChild = node.right;
			}
			if (nodeChild.priority > node.priority) {
				nodeChild.swapWithParent();
				if (!nodeChild.parent) {
					this.root = nodeChild;
				}
				const nodeIndex = this.parentNodes.indexOf(node);
				const childIndex = this.parentNodes.indexOf(nodeChild);

				if (nodeIndex !== -1 && childIndex !== -1) {
					this.parentNodes[nodeIndex] = nodeChild;
					this.parentNodes[childIndex] = node;
				} else {
					this.parentNodes[childIndex] = node;
				}
				this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
