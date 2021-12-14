const fs = require("fs");

let lines = fs.readFileSync('input.txt').toString().split("\n");

const lefties = ['(','[', '{','<'];
const righties = [')', ']', '}', '>'];

let bonusPoints = [];
const errors = lines.reduce((total, line, index) =>{
  const leftStack = [];
  let err = 0;
  let goodShit = 0;
  line.split('').forEach(char =>{
    if(lefties.find(c => c===char)){
      leftStack.unshift(char);
    }
    else{
      if(lefties.indexOf(leftStack.shift())!==righties.indexOf(char)){
        if(char === ')'){
          err=3;
          return;
        }
        if(char === ']'){
          err= 57;
          return;
        }
        if(char === '}'){
          err= 1197;
          return;
        }
        if(char === '>'){
          err =25137;
          return;
        }
      }
    }
  })
  if(err === 0){
    leftStack.forEach(el =>{
      goodShit = goodShit*5;
      if(el ==="("){
        goodShit += 1;
      }
      if(el==="["){
        goodShit += 2;
      }
      if(el === "{"){
        goodShit += 3;
      }
      if(el === "<"){
        goodShit += 4
      }
    })
    bonusPoints.push(goodShit);
  }
  return total +err;
}, 0)
console.log(errors);
console.log(bonusPoints)
console.log(bonusPoints.sort((a, b) => a-b)[Math.floor(bonusPoints.length/2)])