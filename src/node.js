class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if ((this.right != null && this.left != null) == false) {
			if (this.left != null) this.right = node;
			else this.left = node;
			node.parent = this;
		}
		
	}

	removeChild(node) {
		if (node != this.left && node != this.right) {
			throw new Error('Not a child for tihs Node');
		} else {
			if (node === this.left) this.left = null;
			if (node === this.right) this.right = null;
			node.parent = null;
		}
		
	}

	remove() {
		if ( this.parent != null) {
			this.parent.removeChild(this);
		}
	
	}

	swapWithParent() {	
		if (this.parent) {

			if (this.parent.parent) {	
				if (this.parent.parent.left == this.parent) this.parent.parent.left = this;
				else this.parent.parent.right = this;
			}
					 
		
				
			if (this.right) this.right.parent = this.parent;
			if (this.left) this.left.parent = this.parent;
		
			var temp;
			
			if (this.parent.left == this) {
				temp = this.parent.right;
				if (this.right) this.parent.right = this.right;
				else this.parent.right = null;
				if (this.left) this.parent.left = this.left;
				else this.parent.left = null;
				this.left = this.parent;
				this.right = temp;
				if (this.parent.parent) this.parent = this.parent.parent;
				this.left.parent = this;
				if (temp) this.right.parent = this;
	
			}
			else if ( this.parent.right == this) {
				temp = this.parent.left;
				if (this.right) this.parent.right = this.right;
				else this.parent.right = null;
				if (this.left) this.parent.left = this.left;
				else this.parent.left = null;
				this.right = this.parent;
				this.left = temp;
				if (this.parent.parent) this.parent = this.parent.parent;
				this.left.parent = this;
				this.right.parent = this;
			}
			
			
		
	
}



























			/*
			if (this.right) this.right.parent = this.parent;
			if (this.left) this.left.parent = this.parent;
			
			var temp = null;
			if (this == this.parent.left) {
				if (this.parent.right) {
					temp = this.parent.right;
					this.parent.right.parent = this;
				}
				if (this.right) this.parent.right = this.right;
				if (this.left) this.parent.left = this.left;
				
				if (temp) this.right = temp;
				this.left = this.parent;
				this.parent.parent = this;
				
				
			}
			if (this == this.parent.right) {
				if (this.parent.left) {
					temp = this.parent.left;
					this.parent.left.parent = this;
				}
				if (this.right) this.parent.right = this.right;
				if (this.left) this.parent.left = this.left;
				
				if (temp) this.left = temp;
				this.right = this.parent;
				this.parent.parent = this;		
				
			}
			

			
			
			
			
			
			
			
			
			
			
			
			
			/*var left1 = this.parent.left;
			var right1 = this.parent.right;
			var parent1 = this.parent.parent;
			var change = this.parent;
			if (this.parent.parent) {
				if (this.parent.parent.left == this.parent) this.parent.parent.left = this;
				else this.parent.parent.right = this;
			}
			if (this.parent.left == this && this.parent.left.parent) this.left.parent.left.parent = this;
			if (this.parent.right == this && this.parent.right.parent) this.left.parent.right.parent = this;
			
			if (this.left) {
				this.left.parent = this.parent;
			}
			if (this.right) {
				this.right.parent = this.parent;
			}
			

			if (this.parent.left === this) {
				this.parent.left = this.left;
				this.parent.right = this.right;
				this.left = change;
				this.right = right1;
			//	this.parent = parent1;
				
			}
			if (this.parent.right === this) {
				this.parent.left = this.left;
				this.parent.right = this.right;
				this.left = left1;
				this.right = change;
			//	this.parent = parent1;
				
			}
			*/
			
			
		
	}
}

module.exports = Node;
