class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
		} else if (!this.right) {
			this.right = node;
		}
		node.parent = this;
		return this;
	}

	removeChild(node) {
		if (this.left === node) {
			this.left.parent = null;
			this.left = null;
		} else if (this.right === node) {
			this.right.parent = null;
			this.right = null;
		} else {
			throw new Error('node is not a child of this node!')
		}
		return this;
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {
			let leftChild = null;
			let rightChild = null;
			const parent = this.parent;
			if (this.left) {
				leftChild = this.left;
				this.removeChild(this.left);
			}
			if (this.right) {
				rightChild = this.right;
				this.removeChild(this.right);
			}
			if (this.parent.parent) {
				const grandparent = this.parent.parent;
				grandparent.removeChild(parent);
				parent.removeChild(this);
				grandparent.appendChild(this);
				if (parent.left) {
					const child = parent.left;
					parent.removeChild(child);
					this.left = child;
					child.parent = this;
				}
				if (parent.right) {
					const child = parent.right;
					parent.removeChild(child);
					this.right = child;
					child.parent = this;
				}
				this.appendChild(parent);
			} else {
				parent.removeChild(this);
				if (parent.left) {
					const child = parent.left;
					parent.removeChild(child);
					this.left = child;
					child.parent = this;
				}
				if (parent.right) {
					const child = parent.right;
					parent.removeChild(child);
					this.right = child;
					child.parent = this;
				}
				this.appendChild(parent);
			}
			if (leftChild) {
				parent.appendChild(leftChild);
			}
			if (rightChild) {
				parent.appendChild(rightChild);
			}
		}
	}
}

module.exports = Node;
