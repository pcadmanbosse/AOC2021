const fs = require("fs");

const map = fs.readFileSync('input.txt').toString().split("\n").reduce((rows, row) =>{
  return [...rows, row.split('').map(r => parseInt(r))]
}, [])
const mins = [];
map.forEach((row, rowIndex) => row.forEach((col, colIndex) =>{
  const topLower = colIndex === 0 || map[rowIndex][colIndex-1] > col;
  const bottomLower = colIndex === row.length -1 || map[rowIndex][colIndex+1] > col;
  const leftLower = rowIndex === 0 || map[rowIndex -1][colIndex] > col;
  const rightLower = (rowIndex === map.length -1)|| map[rowIndex +1][colIndex]> col;
  if(topLower && bottomLower && leftLower && rightLower){
    mins.push({rowIndex, colIndex, value: col});
  }
}))

const exploreBassin = (bassinBase) =>{
  const queue = [bassinBase];
  let bassinSize = 0;
  while(queue.length > 0){
    const {colIndex, rowIndex, value} = queue.pop();
  
    map[rowIndex][colIndex] = 10;
    bassinSize = bassinSize +1;
    if(rowIndex >0 && map[rowIndex -1][colIndex] > value && map[rowIndex -1][colIndex] < 9){
      queue.push({rowIndex: rowIndex-1, colIndex, value: map[rowIndex -1][colIndex]});
    }
    if(rowIndex < map.length -1 && map[rowIndex +1][colIndex] > value && map[rowIndex +1][colIndex] <9){
      queue.push({rowIndex: rowIndex+1, colIndex, value: map[rowIndex+1][colIndex]});
    }
    if(colIndex > 0 && map[rowIndex][colIndex-1] > value && map[rowIndex][colIndex -1] < 9){
      queue.push({rowIndex, colIndex: colIndex -1, value: map[rowIndex][colIndex-1]});
    }
    if(colIndex < map[0].length -1 && map[rowIndex][colIndex+1] > value && map[rowIndex][colIndex+1] <9){
      queue.push({rowIndex, colIndex: colIndex+1, value: map[rowIndex][colIndex+1]})
    }
    queue.sort((a, b) => a.value - b.value)

  }
  return bassinSize;
}
console.log(mins.map(min => exploreBassin(min)).sort((a, b) => b-a))
console.log(112*110*108)

