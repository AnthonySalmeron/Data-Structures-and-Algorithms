function recursiveBinarySearch(arr,el,left,right){
  if(left>right) return false//overflow, used to break out of the stacks
  let mid  = Math.floor((left+right)/2)
  if(arr[mid]==el) return mid
  if(el<arr[mid]){
    return recursiveBinarySearch(arr,el,left,mid-1)
  }else if(el>arr[mid]){
    return recursiveBinarySearch(arr,el,mid+1,right)
  }
}
//can also be made iterative
