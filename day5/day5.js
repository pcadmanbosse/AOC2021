const fs = require("fs");
const segmentRegex = /(\d+),(\d+) -> (\d+),(\d+)/;
const segments = fs.readFileSync('input.txt', 'utf8').toString().split("\n").map((lineInput) => {
  const match = lineInput.match(segmentRegex);
  return {
    x1: parseInt(match[1]),
    y1: parseInt(match[2]),
    x2: parseInt(match[3]),
    y2: parseInt(match[4])
  }
});

const crossMap = Array(999).fill().map(() => Array(999).fill(0));
segments.forEach(segment => {
  if(segment.x1 === segment.x2){
    const fromY = Math.min(segment.y1, segment.y2);
    const toY = Math.max(segment.y1, segment.y2);
    for(let y = fromY; y<=toY; y++){
      crossMap[segment.x1][y] = crossMap[segment.x1][y] +1;
    }
  }
  else if(segment.y1 === segment.y2){
    const fromx = Math.min(segment.x1, segment.x2);
    const tox = Math.max(segment.x1, segment.x2);
    for(let x = fromx; x<=tox; x++){
      crossMap[x][segment.y1] = crossMap[x][segment.y1] +1;
    }
  }
  else{
    const directionY = segment.y1 > segment.y2? -1:1;
    const directionX = segment.x1 > segment.x2? -1:1;
    const numberOfSteps = Math.abs(segment.y2 - segment.y1);
    
    for(let step = 0; step<=numberOfSteps; step ++){
      crossMap[segment.x1 + directionX * step][segment.y1 + directionY * step] = crossMap[segment.x1 + directionX * step][segment.y1 + directionY * step] +1;
    }

  }
})

let count = 0;
crossMap.forEach(x =>{
  x.forEach(y =>{
    if(y>1){
      count++;
    }
  }
)});

console.log(count);
