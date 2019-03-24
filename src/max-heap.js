const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.heapSize += 1;
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (this.root) {
			this.heapSize -= 1;
			var data = this.root.data;
			var detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			if (this.root) {
				this.shiftNodeDown(this.root);
			}
			return data;
		}
		
	}

	detachRoot() {
		var rootIndex;
		var detachedRoot;
		rootIndex = this.parentNodes.indexOf(this.root);
		if (rootIndex != -1) this.parentNodes.splice(rootIndex, 1);
		detachedRoot = this.root;
		this.root = null;
		return detachedRoot;
		
	}

	restoreRootFromLastInsertedNode(detached) {
		var lastNode = this.parentNodes.pop();
		var isLeft;
		if (lastNode && detached) {
			if (detached.left) {
				lastNode.left = detached.left;
				lastNode.left.parent = lastNode;
				isLeft = true;
			}
			if (detached.right) {
				lastNode.right = detached.right;
				lastNode.right.parent = lastNode;
				isLeft = false;
			}
			if (lastNode.parent) {
				if (lastNode.parent.right == lastNode) {
					this.parentNodes.unshift(lastNode.parent);
				}
				lastNode.parent.removeChild(lastNode);
			}
			if (isLeft) this.parentNodes.unshift(lastNode);
			this.root = lastNode;
		}
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		return this.parentNodes.length == 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		if (this.root == null) {
			this.root = node;
			this.parentNodes.push(node);
		}
		else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].right) {
				this.parentNodes.shift();
			}
		}

		
	}

	shiftNodeUp(node) {
		var nodeIndex;
		var nodeParentIndex;
		if (node.parent) {
			if (node.priority > node.parent.priority) {
				nodeIndex = this.parentNodes.indexOf(node);
				nodeParentIndex = this.parentNodes.indexOf(node.parent);
				if (nodeIndex != -1) {
					if (nodeParentIndex != -1) {
						var temp;
						temp = this.parentNodes[nodeIndex];
						this.parentNodes[nodeIndex] = this.parentNodes[nodeParentIndex];
						this.parentNodes[nodeParentIndex] = temp;
					}
					else this.parentNodes[nodeIndex] = node.parent;
				}
				node.swapWithParent();
				this.shiftNodeUp(node);
			}

		}
		else
		this.root = node;
		
	}

	shiftNodeDown(node) {
		var directNode;
		var nodeIndex;
		var nodeChildIndex;
		if (node.left && node.right) {
			if (node.left.priority > node.right.priority) directNode = node.left;
			else if (node.left.priority <= node.right.priority) directNode = node.right;
		}
		else if (node.left && node.left.priority > node.priority) {
			directNode = node.left;
		}
		else return;

		
		nodeIndex = this.parentNodes.indexOf(node);
		nodeChildIndex = this.parentNodes.indexOf(directNode);
		if (nodeChildIndex != -1) {
			if (nodeIndex != -1) {
				var temp;
				temp = this.parentNodes[nodeIndex];
				this.parentNodes[nodeIndex] = this.parentNodes[nodeChildIndex];
				this.parentNodes[nodeChildIndex] = temp;
			}
			else  this.parentNodes[nodeChildIndex] = node;
		}
		if (node == this.root)  this.root = directNode;
		
		directNode.swapWithParent();
		this.shiftNodeDown(node);


	}
}

module.exports = MaxHeap;
