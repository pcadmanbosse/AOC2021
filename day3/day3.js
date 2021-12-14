const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().split('\n');

const getRanks = (list, index) =>{
  const both= list.reduce((curr, el) =>{
    const char = el.charAt(index);
      return {...curr, [char]: (curr[char]||0)+1}
  }, {});
  return both;
};

const getOxy =(list, index) =>{
  const both = getRanks(list, index);
  if(both['1']>=both['0']){
    return '1';
  }
  return '0';
}

const getCo2 = (list, index) =>{
  const both = getRanks(list, index);
  if(both['0'] <= both['1']){
    return '0';
  }
  return '1';
}

const keyMap = data.reduce((curr, entry) =>{
  entry.split('').forEach((char, index) => {
    if(!curr[index]){
      curr[index] = {};
    } 
    if(!curr[index][char]){
      curr[index][char] = 1;
    }
    else {
      curr[index][char] = curr[index][char] +1;
    }
  });
  return curr;
}, {});

// let oxy = Object.entries(keyMap).map(([key, value]) => value['1'] >= value['0']?'1':'0').join('');
// let co2 = Object.entries(keyMap).map(([key, value]) => value['0'] <= value['1']?'0':'1').join('');

let matchingResults = data;
let oxyStr = '';
let nextInd = 0;
while(matchingResults.length > 1){
  const nextOxy = getOxy(matchingResults, nextInd);
  oxyStr += nextOxy;
  matchingResults=data.filter(ox => ox.startsWith(oxyStr));
  nextInd ++;
}
let co2Str = '';
nextInd = 0;
let matchingResultsCo2 = data;
while(matchingResultsCo2.length > 1){
  const nextCO2 = getCo2(matchingResultsCo2, nextInd);
  co2Str += nextCO2;
  matchingResultsCo2=data.filter(ox => ox.startsWith(co2Str));
  nextInd ++;
}
console.log(matchingResults[0]);
console.log(matchingResultsCo2[0])
console.log(parseInt(matchingResults[0], 2) * parseInt(matchingResultsCo2[0], 2));
