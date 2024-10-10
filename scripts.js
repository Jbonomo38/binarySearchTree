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
console.log(ex.root);
console.log(ex.root instanceof Node);
console.log(prettyPrint(ex.root));
