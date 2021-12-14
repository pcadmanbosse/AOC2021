const fs = require('fs');
const [template, insertions] = fs.readFileSync('input.txt').toString().split('\n\n');

const instructionMap = {};
insertions.split("\n").forEach(line => {
  const [match, result] = line.split(" -> ");
  instructionMap[match] = result;
});

let growingTemplate = template;
for (let i =0; i<40; i++){
  const splitList = [];
  for(let x =0; x<growingTemplate.length -1; x++){
    splitList.push(growingTemplate.substring(x, x+2));
  }
  growingTemplate = splitList.reduce((str, curr) =>{
    if(instructionMap[curr]){
      return str + instructionMap[curr] + curr.substring(1);
    }
    return str+curr.substring(1);
  }, growingTemplate.charAt(0));
}
const charMap = {};
let max = 0;
let min = Infinity;
growingTemplate.split('').forEach(char =>{
  charMap[char]=(charMap[char] || 0) +1;
})
Object.entries(charMap).forEach(([char, count]) =>{
  if(count < min){
    min  = count;

  }
  if(count > max){
    max = count;
  }
});
console.log(growingTemplate)
console.log(max - min)