const fs = require('fs');

let crabs = fs.readFileSync('input.txt', 'utf8').toString().split(",").map(n => parseInt(n));
crabs.sort((a, b ) => a-b);
const median = crabs[Math.floor(crabs.length/2)];
const max = Math.max(...crabs);
const laBrute = new Array(max).fill(0);
const oneToN = (n) =>{
  return (n*(n+1))/2;
}
crabs.forEach(crab => {
  for (let i = 0; i<max; i++){
    laBrute[i] = laBrute[i] + oneToN(Math.abs(crab - i));
  }
})

console.log(Math.min(...laBrute))
