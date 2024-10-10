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

    levelOrder(callback, node = this.root) {
        // INCOMPLETE
        callback(node.data);
        if(node.left) {
            this.levelOrder(callback, node.left);
        }

        if(node.right) {
            this.levelOrder(callback, node.right);
        }
        return;
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
 

const bst = [12, 1, 4, 7, 3, 9, 4, 13, 12, 15, 18];
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
prettyPrint(ex.root);
ex.levelOrder(console.log);