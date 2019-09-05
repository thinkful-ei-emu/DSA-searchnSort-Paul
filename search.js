function triesToFindItem(array, item) {
  let i=0;
  while(i < array.length) {
    if (array[i] === item) {
      i++;
      break;
    }
    i++;
  }
  if(i===array.length){
    /* this.setState({
      isFound:false,
      tries:i 
    }); */
    console.log('Not found tried: '+i+' times');
  }
  else{
    /* this.setState({
      isFound:true,
      tries:i
    }); */
    console.log('Found tried: '+i+' times');
  }
} //tie this to a button click or something




function binSearch(array, item) {
  let minIndex = 0;
  let maxIndex = array.length - 1;
  let currentIndex;
  let currentElement;
  let tries=0;

  while (minIndex <= maxIndex) {
    currentIndex = Math.floor((minIndex + maxIndex) / 2);
    currentElement = array[currentIndex];
    tries++;
    if (currentElement < item) {
      minIndex = currentIndex + 1;
    }
    else if (currentElement > item) {
      maxIndex = currentIndex - 1;
    }
    else {
      /* return this.setState({
        isFound:true,
        tries:tries
      }); */
      console.log('Found tried: '+tries+' times');
      return;
    }
  }
  console.log('Not found, tried: '+tries+' times');
  /* return this.setState({
    isFound:false,
    tries:tries
  }); */
}




/*
Dewey decimal index
Well since I can't teleport around the library in constant time, maybe we actually have to factor in travel time. Assuming there is no way for me to tell which section of the library has which dewey numbered books, and the sections are basically linear from least dewey number to higher dewey number sections, I would probably do something akin to as linear search. If figuring out the Dewey number of each aisle of books took work measurable to the time it took to walk ot these places (like for example, they didn't write the Dewey numbers anywhere, and you had to call over a new librarian at each aisle), I might do binary search.

If somehow, I had like a catalog (think hash table) where it told me Dewey 500 starts at index 8, and Dewey 600 starts at index 22. etc etc. Then I would, find the nearest dewey number, look for the proper index, then just go straight there, and begin linearly searching in the right direction. Most of this is really gated by walking time, I feel like I'm tired already.

*/

/* there are log(n) levels in the tree, and at each level, to go up a level, we have to merge each pair of nodes in that level, and that merging takes O(N) in total for each level (happens when you call merge on every pair). For quicksort, well it's worst case is obviously O(N^2) if your choice of pivot is static/unenlightened. */


/*
Given a binary search tree whose in-order and pre-order traversals are respectively 14 15 19 25 27 35 79 89 90 91 and 35 25 15 14 19 27 89 79 91 90. What would be its postorder traversal?

14 19 15 27 25 79 90 91 89 35


The post order traversal of a binary search tree is 5 7 6 9 11 10 8. What is its pre-order traversal?

8,6,5,7,10,9,11
*/

let root={
  name:'Commander',
  soldiersBelow:[
    {
      name:'SubCommanderA',
      soldiersBelow:[
        {
          name:'LieutenantA',
          soldiersBelow:[
            {
              name:'GruntA',
              soldiersBelow:[
                {
                  name:'SubgruntA'
                },
                {
                  name:'SubgruntB'
                },
                {
                  name:'SubgruntC'
                }
              ]
            }
          ]
        },
        {
          name:'LieutenantB',
          soldiersBelow:[
            {
              name:'GruntB',
              soldiersBelow:[
                {
                  name:'SubgruntD'
                }
              ]
            }
          ]
        }
      ]
      
    },
    {
      name:'SubCommanderB',
      soldiersBelow:[
        {
          name:'LieutenantC',
          soldiersBelow:[
            {
              name:'GruntD'
            }
          ]
        }
      ]
    }
  ]
}; 
//have no idea how the root data is being held
function chainOfCommand(root){
  let CoC = [];
  let currentLevel = [root];
  while (currentLevel.length !== 0) {
    let nextLevel = [];
    currentLevel.forEach(node => {
      CoC.push(node.name);
      if(node.soldiersBelow){
        node.soldiersBelow.forEach(soldierNode=>{
          nextLevel.push(soldierNode);
        });
      }
      
    });
    currentLevel=nextLevel;
  }
  console.log(CoC);
}

chainOfCommand(root);

function maxProfit(arr){
  let holdsShares=false;
  let profit=0;
  let boughtAtPrice=-1;
  for(let i=0;i<arr.length-1;i++){
    if(arr[i+1]>=arr[i]){
      if(!holdsShares){
        holdsShares=true;
        boughtAtPrice=arr[i];
      }
    }
    else{
      if(holdsShares){
        holdsShares=false;
        profit+=arr[i]-boughtAtPrice;
        boughtAtPrice=-1;
      }
    }
  }
  console.log(holdsShares);
  if(holdsShares){
    profit+=arr[arr.length-1]-boughtAtPrice;
  }
  return profit;
}

//2 eggs assumed
function eggDrop(floors){
  let res={};
  let numOfDrops=eggDropR(2,floors,res);
  console.log('exitting recursion');
  console.log(numOfDrops);
  console.log(res);

}

function eggDropR(eggs,floors,res){
  //base has some memoization, so no infinite loops.
  if(res[`e${eggs}floor${floors}`])
    return res[`e${eggs}floor${floors}`].count;
  else if(floors<1){
    res[`e${eggs}floor${floors}`]={floor:0,count:0};
    return 0;
  }
  else if(floors===1){
    res[`e${eggs}floor${floors}`]={floor:1,count:1};
    return 1;
  }
  else if(eggs<=1){
    res[`e${eggs}floor${floors}`]={floor:1,count:floors};
    return floors;
  }

  //rec
  let currentBest=floors;
  let currentBestFloor=1;
  for(let i=1;i<=floors;i++){
    //simulate dropping it from the ith floor
    //if it breaks is the first eggDrop call, it it doesn't is the second call.
    let current= Math.max(eggDropR(eggs-1,i-1,res),eggDropR(eggs,floors-i,res)) +1;
    if(current<=currentBest){
      currentBest=current;
      currentBestFloor=i;
    }

  }
  res[`e${eggs}floor${floors}`]={floor:currentBestFloor,count:currentBest};
  return currentBest;
}




function main(){
  let arr=[89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6 ,88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1 ,6 ,7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84 ,34 ,53, 78, 40, 14 ,5];

  arr=[128, 97, 121, 123, 98, 97, 105];
  console.log(maxProfit(arr));
  eggDrop(100);


}
main();
