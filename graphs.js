//adjacency list
//nodes that are connected to each other, each node
//lists the nodes its connected to, but not with direction
var underectedGArr = {
  [1], //node a, connected to node b
  [0,2],//node b, connected to a and c
  [1] //node c, connected to b
};
//can also be represented by adjancency matrix
//     a   b    c
//  a  0   1    0
//  b  1   0    1
//  c  0   1    0
var adjMat = [
  [0,1,0], //a>b
  [1,0,1],//b>a,c
  [0,1,0]//c>b
];

//if the node(vertices) connections(edges) have directions,
//they can be represented in the matrix too
// a<<<<<b<<<<<<c
var adjMat2 = [
  [0,0,0],//a's connections don't point at anything
  [1,0,0],//b's connections only point to a
  [0,1,0]//c's only points to b
];

//incidence matrix uses rows to represent nodes and
//columns to represent edges, can have uneven number of rows and columns
//    a ----1-----b
//    |\        /
//   4| \3    /2
//    |  \  /
//    d   c
//      1  2  3  4
//   a  1  0  1  1
//   b  1  1  0  0
//   c  0  1  1  0
//   d  0  0  0  1
//
//directed incidence matrix has -1 for the node that
//they point to and 1 for the opposite direction of the edge
//    a ---1--->b
//   |^       /
// 4 | \3   / 2
//   v  \ v
//   d   c
//      1  2  3  4
//   a  1  0 -1  1
//   b -1  1  0  0
//   c  0 -1  1  0
//   d  0  0  0 -1
var incMatDir = [
  [1,0,-1,1], //a is pointed at by c on the 3rd edge, points at b and d on 1,4
  [-1,1,0,0],// b is pointed at by a on the 1st edge, points at c on 2 edge
  [0,-1,1,0],// c is pointed at by b on 2 edge, points at a on 3 edge
  [0,0,0,-1]// pointed at on 4 edge by a
];
//different "weights" can be applied by using numbers greater than 1
//traversing/visiting nodes on a graph
//graphs: breadth-first search
function bfs(graph,root){ //graph/ root that you want to find the distances from to reach the other nodes
  var nodesLen = {};// returns key value pairs, the keys are the other nodes and the values are the distances from the root
  for (var i = 0; i < graph.length; i++) {
    nodesLen[i] = Infinity;// start all indexes at infinity which means they don't connect to the root you are searching for
  }
  nodesLen[root] = 0;//for itself
  var queue = [root];//keeps track of nodes to visit
  var current;//keep track of current node
  while(queue.length !=0){
    current = queue.shift();//pop off node from queue to traverse
    var curConnected = graph[current]//goes to row of the current node
    var neighborIdx = [];
    var idx = curConnected.indexOf(1);//first index of a connection that points away from node
    while(idx != -1){//while there are connections that aren't pointing towards itself
      neighborIdx.push(idx);//push the index to an array of connections that flow away from the node
      idx = curConnected.indexOf(1, idx+1);//start searching again from the next index
    }
    for (var j = 0; j <neighborIdx.length; j++) {
      if(nodesLen[neighborIdx[j]]==Infinity){//if they're the default
        nodesLen[neighborIdx[j]] = nodesLen[current]+1;// for each node, increase its value by the current node +1
        queue.push(neighborIdx[j]);//push the neighbor nodes into the queue to find their neighbors and add to those distances
      }
    }
  }
  return nodesLen;
}
//THE OTHER TYPE IS DEPTH FIRST SEARCH, NOT COVERED IN THE VIDEO
