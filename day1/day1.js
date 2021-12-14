var fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8').toString().split('\n').map(el => parseInt(el));
console.log(data.reduce((sum, curr, currIndex) =>{
  if(currIndex > 0 && data[currIndex -1 ] < curr){
    return sum +1;
  }
  return sum;
}, 0));

console.log(data.reduce((sum, curr, currIndex) =>{
  if(currIndex > 2 && (data[currIndex -2] + data[currIndex -1] + curr) > (data[currIndex -2] + data[currIndex -1] + data[currIndex -3])){
    return sum+1;
  }
  return sum;
}, 0))