const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim('');
const regex = /target area: x=(\d+)..(\d+), y=-(\d+)..-(\d+)/

let [_, xLow, xHigh, yLow, yHigh] = input.match(regex);
xLow = parseInt(xLow);
xHigh = parseInt(xHigh);
yLow = -parseInt(yLow);
yHigh = -parseInt(yHigh);

const getXAndY = (initX, initY, Z) =>{
  const y = ((Z+1)*initY) - (Z*Z +Z)/2;
  const x = (initX - Z < 0)?(initX*initX + initX)/2:((Z+1)*initX) - (Z*Z +Z)/2;
  return {x, y}
}

const inTarget = (x, y) =>{
  if(x >= xLow && x <= xHigh && y>=yLow && y<=yHigh){
    return true
  }
  return false;
}

const overshot = (x, y ) =>{
  return x > xHigh || y<yLow;
}

let yMax = 0;
let solutions = [];

for(let xStart = 0; xStart<=xHigh; xStart++){
  for(let yStart =yLow; yStart<=-yLow; yStart++){
    let z = 0;
    let localYMax = 0;
    let {x, y} = getXAndY(xStart, yStart, z);
    while(!overshot(x, y)){
      if(y > localYMax){
        localYMax = y;
      }
      if(inTarget(x, y)){
        solutions.push({xStart, yStart});
        if(localYMax> yMax){
          yMax = localYMax;
        }
        break;
      }
      z = z + 1;
      x = getXAndY(xStart, yStart, z).x;
      y = getXAndY(xStart, yStart, z).y;
    }
  }
}

console.log(yMax)
console.log(solutions.length)