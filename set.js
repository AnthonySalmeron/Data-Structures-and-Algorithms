//sets are like stacks but they don't allow you to put more
//than one of the same thing in
//operations: has,values, add, remove,size,union,intersection,
//difference,subset(check if subset)
function MySet() {
  var collection = [];
  this.has= function(element){
    return (collection.indexOf(element)!==-1);
    //if it doesn't return -1 its true
  }
  this.values = function(){
    return collection;
  }
  this.add = function(element){
    if(!this.has(element)){
      collection.push(element);
      return true;
    }
    //returns false if couldn't push
    return false;
  }
  //in es6 SET built in class, set is delete
  this.remove = function(element){
      if(this.has(element)){
        let index = collection.indexOf(element);
        collection.splice(index,1);
        return true;
      }
      return false;
  }
  this.size = function(){
    return collection.length;
  }
  this.union = function(otherSet){
    var unionSet = new mySet();
    var firstSet = this.values();
    var secondSet = otherSet.values();
    firstSet.forEach(el => unionSet.add(el));
    secondSet.forEach(el => unionSet.add(el));
    return unionSet;
  }
  this.intersection = function(otherSet){
    var intersectionSet = new mySet();
    var firstSet = this.values();
    firstSet.forEach(el => {
      if(otherSet.has(el)){
        intersectionSet.add(el);
      }
    });
    return intersectionSet;
  }
  this.difference = function(otherSet){
    var differenceSet = new mySet();
    var firstSet = this.values();
    firstSet.forEach(el => {
      if(!otherSet.has(el)){
        differenceSet.add(el);
      }
    });
    return differenceSet;
  }
  //tests to see if the current set is a subset of another set
  this.subset = function(otherSet){
    var firstSet = this.values();
    return firstSet.every(value=> otherSet.has(value));
  }
}
var setA = new MySet();
var setB = new MySet();
setA.add("a");
setB.add("a");
console.log(setA.subset(setB))
