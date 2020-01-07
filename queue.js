function Queue(){
  let collection =[];
  this.print = function(){
    console.log(collection);
  };
  this.enqueue = function(element){
    collection.push(element);
  };
  this.dequeue = function(){
    //removes first
    return collection.shift();
  };
  this.front = function(){
    return collection[0];
  };
  this.size = function(){
    return collection.length;
  };
  this.isEmpty = function(){
    return (collection.length===0);
  };
}
//PRIORITY Queue
//PASS IN ELEMENT AND PRIORITIES
function PriorityQueue(){
  var collection = [];
  this.print = function(){
    (console.log(collection));
  };
  this.enqueue = function(element){
    if(this.isEmpty()){
      collection.push(element);
    }else{
      var added =false;
      for(let i=0;i<collection.length;i++){
        //things that are enqueued are arrays, 0 index is content, 1 index is priority
        if(element[1]<collection[i][1]){//so if this element has priority 2 and theres already an item with priority 2, this gets added after it
          collection.splice(i,0,element);
          added=true;
          break;
        }
      }
      if(!added){
        collection.push(element);
      }
    }
  };
  this.dequeue = function(){
    var value = collection.shift();
    return value[0];//because each value is a 2 item array
  };
  this.front= function(){
    return collection[0];
  };
  this.size = function(){
    return collection.length;
  };
  this.isEmpty = function(){
    return (collection.length===0);
  };
}
