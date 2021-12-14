const fs = require('fs');
let [points, folds] = fs.readFileSync('input.txt').toString().trim().split('\n\n');
let maxX = 0;
let maxY = 0;
const paperCoordinates = points.split('\n').map((line) => {
  const [x, y] = line.split(',').map(coord => parseInt(coord));
  if(x>maxX){
    maxX = x;
  }
  if(y > maxY){
    maxY = y;
  }
  return {x, y}
});

let previousX = maxX;
let previousY = maxY;
let paper = new Array(maxY +1).fill(0);
paper = paper.map(el => new Array(maxX+1).fill(0));
paperCoordinates.forEach(({x, y}) =>{
  paper[y][x] = 1;
})


foldRegex = /([xy])=(\d+)/
folds = folds.split("\n").map(line =>{
  const matches = line.match(foldRegex);
  return {direction: matches[1], coordinate: parseInt(matches[2])}
});

folds.forEach(firstFol =>{

  const up = firstFol.direction === 'y';
  for(let y = up?firstFol.coordinate : 0; y<=previousY; y++){
    for(let x = !up?firstFol.coordinate:0; x<=previousX; x++){
      if(paper[y][x] === 1){
      if(!up){
        paper[y][Math.abs(x - 2*firstFol.coordinate)] = 1;
      }
      if(up){
        paper[Math.abs(y - 2*firstFol.coordinate)][x] = 1;
      }
    }
    }
  }
  if(firstFol.direction === 'x'){
    previousX = firstFol.coordinate;
  }else{
    previousY = firstFol.coordinate;
  }
});
for(let y = 0; y<=previousY; y++){
  let str = '';
  for(let x = 0; x<=previousX; x++){
   str = str+(paper[y][x] === 1?'#':'.')
  }
  console.log(str)
}