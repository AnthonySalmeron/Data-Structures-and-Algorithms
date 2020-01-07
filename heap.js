//like binary search tree, each node has only two kids max,
// will have specific relationship between child and parent nodes,
// ie. child nodes are always smaller than parent "minheap"
//left child: i*2
//right child: i*2+1
//parent i/2 round down

let MinHeap = function(){
  let heap = [null];
  this.insert = function(num){
    heap.push(num);
    if(heap.length>2){
      let idx = heap.length-1;//last item in heap
      while(heap[idx]<heap[Math.floor(idx/2)]){//while last item is < its parent node
        if(idx>=1){
          [heap[Math.floor(idx/2)],heap[idx]]= [heap[idx], //switches parent node with child node
          heap[Math.floor(idx/2)];
          if(Math.floor(idx/2)>1){
            idx = Math.floor(idx/2);
          }else{
            break;
          }
        }
      }
    }
  }
  this.remove = function(){//always will remove smallest node/top node
    let smallest = heap[1];
    if (heap.length>2){
      heap[1]=heap[heap.length-1];//first =last
      heap.splice(heap.length-1);
      if(heap.length==3){
        if(heap[1]>heap[2]){
          [heap[1],heap[2]] = [heap[2],heap[1]]
        }
        return smallest;
      }
      let i = 1;
      let left = 2*1;
      let right = 2*1+1;
      while(heap[i] >= heap [left] || heap[i] >= heap[right]){
        if(heap[left]<heap[right]){
          [heap[i],heap[left]] = [heap[left],heap[i]]
          i=2*i;
        }else{
          [heap[i],heap[right]] = [heap[right],heap[i]]
          i = 2*i + 1;
        }
        left = 2*i;
        right = 2*i+1;
        if(heap[left]==undefined || heap[right]== undefined){
          break;
        }
      }
    }else if (heap.length===2) {
      heap.splice(1,1);
    }else{
      return null;
    }
    return smallest;
  }
  this.sort = function(){
    let result = new Array();
    while(heap.length>1){
      result.push(this.remove());
    }
    return result;
  }
}


let MaxHeap = function() {

	let heap = [null];

	this.print = () => heap;

	this.insert = function(num) {
		heap.push(num);
		if (heap.length > 2) {
			let idx = heap.length - 1;
			while (heap[idx] > heap[Math.floor(idx/2)]) {
				if (idx >= 1) {
					[heap[Math.floor(idx/2)], heap[idx]] = [heap[idx], heap[Math.floor(idx/2)]];
					if (Math.floor(idx/2) > 1) {
						idx = Math.floor(idx/2);
					} else {
						break;
					};
				};
			};
		};
	};

	this.remove = function() {
		let smallest = heap[1];
		if (heap.length > 2) {
			heap[1] = heap[heap.length - 1];
			heap.splice(heap.length - 1);
			if (heap.length == 3) {
				if (heap[1] < heap[2]) {
					[heap[1], heap[2]] = [heap[2], heap[1]];
				};
				return smallest;
			};
			let i = 1;
			let left = 2 * i;
			let right = 2 * i + 1;
			while (heap[i] <= heap[left] || heap[i] <= heap[right]) {
				if (heap[left] > heap[right]) {
					[heap[i], heap[left]] = [heap[left], heap[i]];
					i = 2 * i
				} else {
					[heap[i], heap[right]] = [heap[right], heap[i]];
					i = 2 * i + 1;
				};
				left = 2 * i;
				right = 2 * i + 1;
				if (heap[left] == undefined || heap[right] == undefined) {
					break;
				};
			};
		} else if (heap.length == 2) {
			heap.splice(1, 1);
		} else {
			return null;
		};
		return smallest;
	};

};
