const fs = require("fs");

let map = fs.readFileSync('input.txt').toString().split("\n").map(
  row => row.split("").map(el => parseInt(el))
);

const flashQueue = [];

const incrementNeighbours = ({rowIndex, colIndex}) =>{
  for(let x = Math.max(rowIndex-1, 0); x<=Math.min(rowIndex+1, map.length -1); x++){
    for(let y = Math.max(colIndex-1, 0); y<=Math.min(colIndex+1, map[0].length -1); y++){
      if(!(x===rowIndex && y===colIndex) && map[x][y] < 10){
        map[x][y] = map[x][y] +1;
        if(map[x][y] === 10){
          flashQueue.push({rowIndex: x, colIndex:y})
        }
      }
    }
  }
}

let flashes = 0;
for(let i = 0; i<1000; i++){
  // step -> increment all
  map.forEach((_, rowIndex) =>{
    _.forEach((__, colIndex) => {
      map[rowIndex][colIndex] = map[rowIndex][colIndex] +1;
      if(map[rowIndex][colIndex] === 10){
        flashQueue.push({rowIndex, colIndex});
      }
    })});

  const haveFlashed = [];
  while(flashQueue.length>0){
      const {rowIndex, colIndex} = flashQueue.pop();
      flashes = flashes+1;
      haveFlashed.push({rowIndex,colIndex});
      incrementNeighbours({rowIndex, colIndex});
  }
  if(haveFlashed.length===100){
    console.log(i)
  }
  haveFlashed.forEach(({rowIndex, colIndex}) =>{
    map[rowIndex][colIndex] = 0;
  })
}

console.log(flashes);
