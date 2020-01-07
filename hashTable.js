
//basic hashing function
var hash = (string,max)=>{//max is number of buckets in hash table being used to store
  var hash =0;
  for (vari=0;i<string.length;i++){
    hash+=string.charCodeAt(i);
  }
  return hash%max;//if # of boxes is 4 for example, the remainder will be 0-3
};
let HashTable = function(){
  let storage = [];
  const storageLimit = 4;//#of buckets, usually much higher
  this.print = function(){
    console.log(storage);
  }
  this.add = function(key,value){
    var index = hash(key,storageLimit);
    if (storage[index]===undefined){//undefined because things can be deleted and if they are, they are counted as undefined, also things that havent ever been defined also count as undefined
      storage[index] = [[key,value]];
    }else{
      var inserted = false;
      for(var i=0;i<storage[index].length;i++){
        if(storage[index][i][0]==key){//updating the value of something that's been stored already
          storage[index][i][1]=value;
          inserted=true;
        }
      }
      if(inserted===false){
        storage[index].push([key,value]);//if there's other key/value pairs in there already
      }
    }
  }
  this.remove=function(key){
    var index = hash(key,storageLimit);
    if(storage[index].length===1&&storage[index][0][0]===key){
      delete storage[index];
    }else{
      for (var i=0;i<storage[index].length;i++){
        if(storage[index][i][0]===key){
          delete storage[index][i];
        }
      }
    }
  }
  this.lookup = function(key){
    var index = hash(key,storageLimit);
    if(storage[index]===undefined){
      return undefined;
    }else{
      for(var i =0;i<storage[index].length;i++){
        if(storage[index][i][0]===key){
          return storage[index][i][1];
        }
      }
    }
  }
}
