class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array = []) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const workingArray = this.sortAndFilter(array);
        return this.bstRecur(workingArray);
    }

    sortAndFilter(array) {
        const sortedArray = array.sort((a, b) => a - b);
        const workingArray = array.filter((item, index) => {
            return array.indexOf(item) === index;
        });
        return workingArray;
    }

    bstRecur(array) {
        if (array.length === 0) return null; // Base case for empty array

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        // Recursively build the left and right subtrees
        root.left = this.bstRecur(array.slice(0, mid)); // Left half
        root.right = this.bstRecur(array.slice(mid + 1)); // Right half

        return root;
    }

    insert(value, root = this.root) {
        if(value < root.data) {
            if(root.left) {
                this.insert(value, root.left);
            } else {
                root.left = new Node(value);
                return;
            }
        } else {
            if(root.right) {
                this.insert(value, root.right);
            } else {
                root.right = new Node(value);
                return;
            }
        }
    }

    deleteItem(value, root = this.root) {
        let deleteVal = this.find(value);
        let parentVal = this.findParent(value);
        console.log(deleteVal);
        console.log(parentVal);

        // Item has no nodes
        if(this.isLeaf(deleteVal)) {
            console.log("it's a leaf, baby!");
            if(parentVal.right === deleteVal) {
                parentVal.right = null;
                console.log(parentVal);
            } else { 
                parentVal.left = null;
                console.log(parentVal);
            }
            return;
        };

        // Item has two nodes
        if(deleteVal.left && deleteVal.right) {
            let compareVal = deleteVal.right;
            let parentCompareVal = deleteVal;

            while(compareVal.left !== null) {
                parentCompareVal = compareVal;
                compareVal = compareVal.left;
            }
            deleteVal.data = compareVal.data;

            if(parentCompareVal.left === compareVal) {
                parentCompareVal.left = compareVal.right;
            } else {
                parentCompareVal.right = compareVal.right;
            }
            console.log(compareVal)
            return;
        }

        // Item has one node
        else if(deleteVal.left !== null) {
            deleteVal.data = deleteVal.left.data;
            deleteVal.left = null;
        } else if (deleteVal.right !== null) {
            deleteVal.data = deleteVal.right.data;
            deleteVal.right = null;
        }
    }

    isLeaf(node) {
        return (node.left === null && node.right === null)
    }

    find(value, root = this.root) {
        if(value === root.data) {
            return root;
        } 
        
        if(value < root.data) {
            if(root.left !== null) {
                return this.find(value, root.left);
            } else {
                return new Error("Not in here bruh");
            }
        }
        
        if(value > root.data) {
            if(root.right !== null) {
                return this.find(value, root.right);
            } else {
                return new Error("Not in here bruh");
            }
        }
    }

    findParent(value, root = this.root) {
        if (root.data === value) {
            return null; // The root has no parent
        }
        
        if(value === root.left.data || value === root.right.data) {
            return root;
        } 
        
        if(value < root.data) {
            if(root.left !== null) {
                return this.findParent(value, root.left);
            } else {
                return new Error("Not in here bruh");
            }
        }
        
        if(value > root.data) {
            if(root.right !== null) {
                return this.findParent(value, root.right);
            } else {
                return new Error("Not in here bruh");
            }
        }
    }

    levelOrder(callback, node = this.root, queue = []) {
        if(!callback) { throw new Error ("No callback"); }
        if(node === null) return;

        if(node.data !== this.root.data) { node = queue.shift(); }
        callback(node);

        if(node.left !== null) {
            queue.push(node.left);
        }
        if(node.right !== null) {
            queue.push(node.right);
        }

        if(queue.length > 0) {
            return this.levelOrder(callback, queue[0], queue);
        }

        return;
    }

    inOrder(callback, node = this.root) {
        // from left to right
        if(!callback) { throw new Error("No Callback"); }
        if(node === null) return;
        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
    }

    preOrder(callback, node = this.root) {
        // start at root, traverse left subtree, then traverse right subtree
        if(!callback) { throw new Error("No Callback"); }
        if(node === null) return;
        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
    }

    postOrder(callback, node = this.root) {
        if(!callback) { throw new Error("No Callback"); }
        if(node === null) return;
        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node.data);
    }

    depth(x, node = this.root) {
        // from node to root node

        if(node === null) return;
        let depth = 0;
        const queue = [];
        queue.push(node);

        while(queue.length > 0) {
            console.log(queue);
            const n = queue.length;
            for(let i = 0; i < n; i++) {
                let currentNode = queue.shift();
                if(currentNode.data === x) { return depth };
                if(currentNode.left) { queue.push(currentNode.left) };
                if(currentNode.right) { queue.push(currentNode.right) };
            }
            depth++;
        }
    }

    height(x, node = this.root) {
        // from node to leaf node
        if(node === null) return;
        let depth = 0;
        let height = 0;
        const queue = [];
        queue.push(node);

        while(queue.length > 0) {
            const n = queue.length;
            for(let i = 0; i < n; i++) {
                let currentNode = queue.shift();
                if(currentNode.data === x) { height = depth };
                if(currentNode.left) { queue.push(currentNode.left) };
                if(currentNode.right) { queue.push(currentNode.right) };
            }
            depth++;
        }
        return depth - height - 1;
    }

    isBalancedRecur(node = this.root) {
        if(node === null) return 0;

        let lh = this.isBalancedRecur(node.left);
        if (lh === -1) return -1;

        let rh = this.isBalancedRecur(node.right);
        if(rh === -1) return -1;

        if(Math.abs(lh - rh) > 1) return -1;
        return Math.max(lh, rh) + 1;
    }

    isBalanced(node = this.root) {
        if(this.isBalancedRecur(node) === -1) return false;
        return true;
    }

    rebalance() {
        if(this.isBalanced()) return;
        const vals = [];
        this.inOrder((node) => vals.push(node.data), this.root);
        this.buildTree(vals);
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
 

const bst = [12, 1, 4, 7, 3, 9, 4, 13, 12, 15, 18, 22, 25, 33];
const ex = new Tree(bst);
console.log(ex.sortAndFilter(bst));
console.log(ex.root);
// ex.insert(16);
// prettyPrint(ex.root);
// ex.insert(20);
// prettyPrint(ex.root);
// ex.insert(100);
// prettyPrint(ex.root);
// console.log(ex.findParent(15));
// ex.deleteItem();
// console.log(ex.findParent(12));
// prettyPrint(ex.root);
// ex.deleteItem(18);
// prettyPrint(ex.root);
// ex.postOrder(console.log);
// console.log(ex.height(12));
// console.log(ex.isBalanced());
// ex.deleteItem(25);
// ex.deleteItem(33);
// ex.rebalance();

const randoArray = [];

const randoLength = Math.floor(Math.random() * 100);
for(let i = 0; i < randoLength; i++) {
    randoArray.push(Math.floor(Math.random() * 100));
}

console.log(randoArray);
const bst2 = new Tree(randoArray);
console.log(bst2.isBalanced());
bst2.levelOrder(console.log);
bst2.preOrder(console.log);
bst2.postOrder(console.log);
prettyPrint(bst2.root);
bst2.insert(Math.floor(Math.random() * 100) + 100);
bst2.rebalance();
console.log(bst2.isBalanced());
bst2.levelOrder(console.log);
bst2.preOrder(console.log);
bst2.postOrder(console.log);
prettyPrint(bst2.root);

