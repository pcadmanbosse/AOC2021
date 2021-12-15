const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n');

const map = input.map((row) => row.split('').map(i => parseInt(i)));

const queue = [];
const adjancy = ({x,y, cost}) =>{
  const adjacents = [];
  for(let y2 = Math.max(0, y-1); y2<=Math.min(y+1, map.length -1); y2++){
    for(let x2= Math.max(0, x-1); x2 <= Math.min(x+1, map[0].length-1); x2++){
      if(x2 === x ^ y2===y){
        adjacents.push({x:x2, y: y2, cost: cost+map[y2][x2]});
      }
    }
  }
  return adjacents;
}

queue.push({x: 0, y:0, cost: 0})
const cache = new Array(map.length).fill().map(r =>new Array(map.length).fill(Infinity));
cache[0][0] = 0;
while (queue.length > 0){
    const currEl = queue.shift();
    const neighbours = adjancy(currEl);
    neighbours.forEach(({x, y, cost}) =>{
      if(cache[y][x] > cost){
        queue.push({x, y, cost});
        cache[y][x] = cost;
      }
    })
}

console.log(cache[cache.length -1][cache[0].length -1])