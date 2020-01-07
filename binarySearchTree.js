//binary search trees need two constructors
//add,remove,findMax,findMin,find,isPresent,isbalanced,findMaxHeight,findMinHeight,levelOrder,postOrder,preOrder,inOrder
class Node {
  constructor(data,left=null,right=null){
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
class BST {//binarysearchtree
  constructor(){
    this.root = null;//instantiates with null top
  }
  add(data){//method
    const node = this.root;//start search for where to place data
    if(node===null){//if tree is empty
      this.root = new Node(data);
      return; //don't need to run rest of function
    }else{
      const searchTree = function(node){//searches tree
        if (data <node.data){//if at the current node data <node.data
          if(node.left ===null){//if current node doesn't have a node.left
            node.left = new Node(data);
            return;
          }else if (node.left !==null){
            return searchTree(node.left);//keep going down while number is smaller than any item on the left
          }
        }else if (data>node.data){
          if (node.right===null){
            node.right= new Node(data);
            return;
          }else if (node.right !==null){
            return searchTree(node.right);
          }
        }else{
          return null; //no duplicates
        }
      };
      return searchTree(node);//the searchTree function was declared above this but not called
    }
  }
  findMin(){
    let current = this.root;
    while(current.left!==null){
      current= current.left;
    }
    return current.data;
  }
  findMax(){
    let current = this.root;
    while(current.right!==null){
      current=current.right;
    }
    return current.data;
  }
  find(data){
    let current=this.root;
    while(current.data!==data){
      if(data<current.data){
        current=current.left;
      }else {
        current=current.right;
      }
      if(current===null){
        return null;
      }
    }
    return current;
  }
  isPresent(data){
    let current = this.root;
    while(current){
      if(data===current.data){
        return true;
      }
      if(data<current.data){
        current = current.left;
      }else {
        current=current.right;
      }
    }
    return false;//for if the while loop can't run anymore
  }
  remove(data){
    const removeNode = function(node,data){
      if(node==null){
        return null;
      }
      if(data==node.data){
        //node has no children
        if(node.left==null&&node.right==null){
          return null;
        }
        //no left child
        if(node.left==null){
          return node.right;
        }
        //node has no right children
        if(node.right==null){
          return node.left;
        }
        //two children
        var tempNode =node.right;
        while(tempNode.left!==null){
          tempNode=tempNode.left;
        }
        node.data=tempNode.data;//replace the data of the node to be deleted
        node.right= removeNode(node.right,tempNode.data);
        return node; //returning the current node with it's tree of left and right nodes
      }else if (data<node.data){
        node.left = removeNode(node.left,data);
        return node;
      }else {
        node.right=removeNode(node.right,data);
        return node;
      }
    }
    this.root = removeNode(this.root,data);//starts searching at origin
  }
  isBalanced(){
    return(this.findMinHeight()>=this.findMaxHeight()-1);
  }
  findMinHeight(node=this.root){//you can define a default value for the node
    if (node==null){
      return -1;//means doesn't exist
    }
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    if(left<right){//if left side has a smaller minheight
      return left +1;//because of first statement you need to add 1 to balance out answer
    }else{
      return right+1;
    }
  }
  findMaxHeight(node=this.root){//you can define a default value for the node
    if (node==null){
      return -1;//means doesn't exist
    }
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);
    if(left>right){//if left side has a bigger maxheight
      return left +1;//because of first statement you need to add 1 to balance out answer
    }else{
      return right+1;
    }
  }
  inOrder(){
    if(this.root==null){
      return null;
    }else{
      var result= new Array();
      function traverseInOrder(node){
        node.left&&traverseInOrder(node.left); //if the first thing is true(exists) then it'll run the second function
        result.push(node.data);
        node.right&&traverseInOrder(node.right);//last thing to be added is the right side of each branch
      }
      traverseInOrder(this.root);
      return result;
    }
  }
  preOrder(){
    if(this.root==null){
      return null;
    }else{
      var result= new Array();
      function traverseInOrder(node){
        result.push(node.data);
        node.left&&traverseInOrder(node.left);
        node.right&&traverseInOrder(node.right);
      }
      traverseInOrder(this.root);
      return result;
    }
  }
  postOrder(){
    if(this.root==null){
      return null;
    }else{
      var result= new Array();
      function traverseInOrder(node){
        node.left&&traverseInOrder(node.left);
        node.right&&traverseInOrder(node.right);
        result.push(node.data);
      }
      traverseInOrder(this.root);
      return result;
    }
  }
  levelOrder(){
    let result = [];
    let Q = [];
    if (this.root!=null){
      Q.push(this.root);
      while(Q.length>0){
        let node = Q.shift();//will basically go from left to right
        result.push(node.data);//across each level and add their values
        if(node.left!=null){//and add their children to queue
          Q.push(node.left);
        }
        if(node.right!=null){//no else or elseif because we want
          Q.push(node.right);//this to run too
        }
      }
      return result;
    }else {//this.root==null
      return null;
    }
  }
 }
// const bst = new BST();
// bst.add(4);
// bst.add(2);
// bst.add(6);
// bst.add(1);
// bst.add(3);
// bst.add(5);
// bst.add(7);
// bst.remove(4);
// console.log(bst.findMin());
// console.log(bst.findMax());
// bst.remove(7);
// console.log(bst.findMax());
// console.log(bst.find(6));
