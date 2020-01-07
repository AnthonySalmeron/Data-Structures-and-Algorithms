//BUBBLE SORT
//arr.length-1 times running through and switching positions of elements that are bigger than their next neighbor
function bubble(arr){
  for(let i =1;i<arr.length;i++){//starts at 1 because we want this to run 1 less time than the length of the array, think about the number of loops you need to sort an array of length 2
    for(let j =0;j<arr.length-1;j++){//arr.length-1 because thats the last position that you need to check against the next position
      if(arr[j]>arr[j+1]){
         [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
      }
    }
  }
  return arr
}
//SELECTION
//for each index we run through the rest of the array and see if theres a smaller number
function selection(arr){
  for(let i=0;i<arr.length-1;i++){
    let smallest = i
    for(let j =i+1;j<arr.length;j++){
      if (arr[j]<arr[smallest]){
        smallest = j
      }
    }
    [arr[i],arr[smallest]] = [arr[smallest],arr[i]]
  }
  return arr
}
//INSERTION
//runs through each element of array starting from second, if a number is smaller than the one behind it, it will switch places and then continue to switch places with any behind that if they are smaller than it as well
function insertion(arr){
  for(let i=1;i<arr.length;i++){
    let j =i// we don't want to backpeddle with i so we substitute it for the while loop
    while(arr[j]<arr[j-1]&&j>0){
      [arr[j-1],arr[j]] = [arr[j],arr[j-1]]
      j--
    }
  }
  return arr
}
 //MERGE SORT
 //break apart arr in half recursively until they're single units and then combine back together in order
function merge_sort(arr) {
 if (arr.length === 1) { return arr; }
 const center = Math.floor(arr.length / 2);
 const left = arr.slice(0, center);
 const right = arr.slice(center);
 return merge_helper(merge_sort(left), merge_sort(right));//here's the recursion
}
function merge_helper(left, right) {
 const results = [];
 while (left.length && right.length) {// zero counts as false
   if (left[0] < right[0]) {
     results.push(left.shift());
   } else {
     results.push(right.shift());
   }
 }
 return [...results, ...left, ...right];//either right or left end up empty so we have to empty out the rest of the other just in case
}

//HEAP SORT
//continously create minheaps so you can shift the first element off and put it into the results array
function heapSort(arr){
  arr.unshift(null)//adding null to front so the math is easier in the rest of the algorithm ie. every left child is 2*index
  let result=[]
  let length = arr.length
  for(let i =0;i<length;i++){//if the original array was length 4, this will run 3 times and leave you with [null,x]
    heapify(arr)
    result.push(arr[1])//taking smallest number
    arr[1]=arr.pop()//replacing smallest number with an easy to get one, then we heapify again
  }
  result.push(arr.pop())
  return result
}
function heapify(arr){
  let s = Math.floor((arr.length-1)/2),counter=0//index to start checking from, usually in the second lowest level of the tree
  while(s){//when it hits zero it stops
    if(arr[s*2]<arr[s]){
       [arr[s*2],arr[s]] = [arr[s],arr[s*2]]//if the left child is smaller switch the order
       counter++//signifies that an operation took place and we need to do another while loop
    }
    if(arr[s*2+1]<arr[s]){
       [arr[s*2+1],arr[s]] = [arr[s],arr[s*2+1]]//if the right child is smaller switch the order
       counter++
    }
    s--
    if(s==0){
      if(counter==0) return// if nothing was moved around
      s= Math.floor((arr.length-1)/2)
      counter=0
    }
  }
}

//COUNTING SORT
//you get an array and the range of numbers as inputs, make a new array with a length of the range, use that array to keep track of the number of appearances for each number in the og array, use both these arrays to make an output array in order
function countSort(arr,min,max){
  let trackArray = []
  trackArray.length= (max-min)+1
  trackArray.fill(0)
  let result=[]
  for(let i =0;i<arr.length;i++){
    trackArray[arr[i]-min]++//add the # of occurences of each number in the og array
  }
  for(let j=1;j<trackArray.length;j++){
    trackArray[j]+= trackArray[j-1]//basically we will use the numbers in this array to put numbers into the result array
  }
  for(let k=0;k<arr.length;k++){
    result[trackArray[arr[k]-min]-1]= arr[k] //for every position in the result array we check the og array to see which number we will put in and then check the trackArray to check where in the result array we will put the number
    trackArray[arr[k]-min]--
  }
  return result
}

//RADIX SORT
//use counting sort to sort based on the size, so basically sort by 1's then 10's then 100'ss etc
function countSortModifiedForExponents(arr,exp){//this will be the sub-method the radix sort uses
  var out = []
  var count = []
  count.length = 10
  count.fill(0)
  for(let i =0;i<arr.length;i++){
    var index = Math.floor(arr[i]/exp)//so it'll get rid of decimals to make the next part easier
    count[index%10]+=1//same as in normal counting sort, but this time the range is a given of 10 because the only possible ones are 0-9 for each position (1's,10's,etc)
  }
  //now progressively add together the values to get the positions
  for(let j=1;j<10;j++){//start at one
    count[j]+=count[j-1]
  }
  for(let k=arr.length-1;k>=0;k--){//do it in reverse order every time because each time the loop runs they are put in relative order by their 1's 10's etc, and so the next time they run through the first element to match a number will be put at the last indice for that number, best way to see this is to just reverse this and test with console.log();
    out[count[Math.floor(arr[k]/exp)%10]-1]=arr[k]//we use -1 because the smallest value will be 1 and so the 0 position would've remained undefined
    count[Math.floor(arr[k]/exp)%10]--
  }

  for(let h=0;h<arr.length;h++){
    arr[h] = out[h]//we aren't returning anything, just modifying the original array
  }
}
function radixSort(arr){
  let max = Math.max(...arr)
  let exp = 1
  while((max/exp)>=1){
    countSortModifiedForExponents(arr,exp)
    exp*=10
  }
  return arr
}
//BUCKET SORT
//Similar-ish to radix sort, we make buckets to put numbers into but really they're just subarrays that will all have insertion sort performed on them. It basically prearranges before insertion sort shaves a bit of time at the expense of space
function bucketSort(arr){
  let largest = Math.max(...arr)
  let buckets = []
  for(let b=0;b<10;b++){
    buckets[b]=[]//fill with ten arrays
  }
  let divider = Math.ceil((largest+1)/buckets.length)//will use to assign all the elements of the array into their buckets, like a hash. The +1 is necessary, try using [1,2] as an example
  for(let i=0;i<arr.length;i++){
    let location = Math.floor(arr[i]/divider)
    buckets[location].push(arr[i])
  }
  let index=0//keeping track of which part of the original arr we will alter
  for(let j =0;j<buckets.length;j++){
    if(buckets[j].length){
       insertion(buckets[j])
       buckets[j].reverse()//we do reverse here so that we don't have to use .shift later which is an expensive operation
    }
    while(buckets[j].length){//while each bucket has a length
      arr[index]=buckets[j].pop()//take the last element off which is the smallest since the array got reversed
      index++
    }
  }
  return arr
}
//QUICK SORT
//choose a pivot and then get all the elements of the array to be in their correct positions on either side of the pivot
function quick(a){
  if (a.length<2){
    return a
  }
  if(a.length==2){
    a.sort((a,b)=>a-b)
    return a
  }
  //choosing pivot
  let mid = Math.floor(a.length/2)
  //sorting first, middle, and last
  let toSort = [a[0],a[mid],a[a.length-1]]
  toSort.sort((a,b)=>a-b);
  //now rearrange them so biggest is in the middle and pivot is temporarily at the end
  [toSort[1],toSort[2]] = [toSort[2],toSort[1]]
  a[0]=toSort[0]
  a[mid]=toSort[1]
  a[a.length-1]=toSort[2]
  var left = [];
  var right = [];
  var newArray = [];
  var pivot = a.pop();
  var length = a.length;
  for (var i = 0; i < length; i++) {
	if (a[i] <= pivot) {
		left.push(a[i]);
	} else {
		right.push(a[i]);
	}
  }
  return newArray.concat(quick(left), pivot, quick(right));
}
//QUICK SORT SECOND EXAMPLE
function partition(items, i, j) {//i is left, j is right
    var pivot   = items[Math.floor((i + j) / 2)] //middle element
    while (i <= j) {
        while (items[i] < pivot) {//stops when greater than or equal to pivot
            i++;
        }
        while (items[j] > pivot) {//stops when less than or equal to pivot
            j--;
        }
        if (i <= j) {//if they haven't crossed each other yet
            [items[i],items[j]]= [items[j],items[i]]
            i++;
            j--;
        }
    }
    return i;//position of well placed element
}

function quickSort(items, left=0, right=items.length-1) {
  //up here we can also rearrange the beginning, middle, and end of the array to get a better pivot, not done so here
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right);//sorts including that pivot point
        }
    }
    return items;
}
//QUICK SORT FAIL
// function quick(a){
//   if (a.length<2){
//     return a
//   }
//   //choosing pivot
//   let mid = Math.floor(a.length/2)
//   //sorting first, middle, and last
//   let toSort = [a[0],a[mid],a[a.length-1]]
//   toSort.sort((a,b)=>a-b);
//   [toSort[1],toSort[2]] = [toSort[2],toSort[1]]
//   //now rearrange them so biggest is in the middle and pivot is temporarily at the end
//   a[0]=toSort[0]
//   a[mid]=toSort[1]
//   a[a.length-1]=toSort[2]
//   let pivot
//   //now we get the first of item from the left that's bigger than the pivot, and first from right that's smaller than the pivot
//   for(let i=0;i<mid;i++){
//     let itemFromLeft=-1,itemFromRight=-(a.length-2)
//     while(itemFromLeft<0){
//       if(a[Math.abs(itemFromLeft)-1]>a[a.length-1]){
//         itemFromLeft=Math.abs(itemFromLeft)-1
//       }else{
//         itemFromLeft--
//       }
//     }
//     while(itemFromRight<0){
//       if(Math.abs(itemFromRight)-itemFromLeft <0){
//         itemFromRight= Math.abs(itemFromRight)
//       }
//       if(a[Math.abs(itemFromRight)]<a[a.length-1]){
//         itemFromRight=Math.abs(itemFromRight)
//       }else{
//         itemFromRight++
//       }
//     }
//     if(itemFromLeft>itemFromRight){
//       pivot = itemFromLeft
//       [a[itemFromLeft],a[a.length-1]]=[a[a.length-1],a[itemFromRight]]
//       break;
//     }
//   }
//   let right = quick(a.slice(0,pivot))
//   let left = quick(a.slice(pivot+1))
//   return left.concat([a[pivot]],right)
// }
// console.log(quick([1,4,2,9,0,6]))
