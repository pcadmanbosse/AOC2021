const fs = require('fs');
const [template, insertions] = fs.readFileSync('input.txt').toString().split('\n\n');

const instructionMap = {};
insertions.split("\n").forEach(line => {
  const [match, result] = line.split(" -> ");
  instructionMap[match] = result;
});

const totalMap ={};
for(let i = 0; i<template.length -1; i++){
  totalMap[template.substring(i, i+2)] = (totalMap[template.substring(i, i+2)] ||0) +1; 
}
for(let j = 0; j<40; j++){
  const updateMap = {};
  Object.entries(totalMap).forEach(([key, value]) =>{
    if(instructionMap[key]){
      const [before, after] = key.split('');
      updateMap[before + instructionMap[key]] = (updateMap[before + instructionMap[key]] ||0)+value;
      updateMap[instructionMap[key] + after] = (updateMap[instructionMap[key] + after] ||0)+value;
      updateMap[key] = (updateMap[key]||0) - value;
    }
  })
  Object.entries(updateMap).forEach(([key, count]) =>{
    totalMap[key] = (totalMap[key] ||0)+count;
  })
}

let max = 0;
let min = Infinity;
const charMap = {};
Object.entries(totalMap).forEach(([char, count]) =>{
  const [first, second] = char.split('');
  charMap[first] = (charMap[first] ||0)+ count;
  charMap[second] = (charMap[second] ||0)+ count;
});
const firstChar = template.charAt(0);
const lastChar = template.charAt(template.length -1);
Object.entries(charMap).forEach(([char, count]) =>{
  let halvedCount = Math.floor(count/2);
  if(char === firstChar){
    halvedCount++;
  }
  if(char ===lastChar){
    halvedCount++;
  }
  if(halvedCount < min){
    min  = halvedCount;
  }
  if(halvedCount > max){
    max = halvedCount;
  }
});
console.log(max - min)