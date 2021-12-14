const fs = require("fs");

const signals = fs.readFileSync('input.txt').toString().split("\n").map(
  inputLine =>{
    const [input, output] = inputLine.split(" | ");
    return [...input.split(" "), ...output.split(" ")]
  }
);
const substract = (set1, set2) =>{
  return set1.filter(el => !set2.find(e => e===el));
}

let sum = 0;

signals.forEach((signal) =>{
  let codes = new Array(7).fill([]);


signal.forEach(input =>{
  if(input.length === 2){
    codes[2] = input.split("");
    codes[5] = input.split("");
  }
});
signal.forEach(input =>{
  if(input.length === 3){
    codes[0] = substract(input.split(''), codes[2])
  }
})
signal.forEach(input =>{
  if(input.length === 4){
    codes[1] = substract(input.split(''), codes[2])
    codes[3] = substract(input.split(''), codes[2])
  }
})
signal.forEach(input =>{
  if(input.length === 7){
    codes[4] = substract(substract(substract(input.split(''), codes[2]), codes[0]), codes[3]);
    codes[6] = substract(substract(substract(input.split(''), codes[2]), codes[0]), codes[3]);
  }
})
signal.forEach(input =>{
  if(input.length === 6){
    const inputArr = input.split('');
    if(codes[2].every(char => inputArr.find(el => el===char))){
      // 0 or 9
      if(codes[3].every(c => inputArr.find(el => el===c))){
        // 9
        codes[4] = substract(codes[4], inputArr);
      }
      else{
        codes[3] = substract(codes[3], inputArr);
      }
      // console.log({codes:codes[3], codes2: codes[2], inputArr})
      // codes[3] = substract(codes[3], inputArr)
    }else{
      //6 
      // codes[3] = intersect(codes[4], input.split(''))
      codes[2] = substract(codes[2], inputArr);
    }
  }
})
codes = codes.map((code, index) =>{
  return code.filter(c => !codes.find((c2, index2) =>{
    return index !== index2 && c2.length === 1 && c2[0] === c
  }))
})
const zero = ''+codes[0]+codes[1]+codes[2]+codes[4]+codes[5]+codes[6];
const one = '' + codes[2] + codes[5];
const two = '' + codes[0]+codes[2]+codes[3]+codes[4]+codes[6];
const three = ''+codes[0]+codes[2]+codes[3]+codes[5]+codes[6];
const four = '' + codes[1]+codes[2]+codes[3]+codes[5];
const five = '' + codes[0]+codes[1]+codes[3]+codes[5]+codes[6];
const six = '' + codes[0] + codes[1]+codes[3]+codes[4]+codes[5]+codes[6];
const seven = '' + codes[0]+codes[2]+codes[5];
const eight = '' + codes[0] +codes[2]+ codes[1]+codes[3]+codes[4]+codes[5]+codes[6];
const nine = '' + '' + codes[0] + codes[1]+codes[3]+codes[2]+codes[5]+codes[6];
const output = signal.slice(10);
let str = '';
output.forEach(out =>{
  const parsed = out.split('');

  if(out.length === 2){
    str = str+ '1';
  }
  else if(out.length === 4){
    str = str + '4'
  }
  else if(out.length === 3){
    str = str+'7'
  }
  else if(out.length === 7){
    str = str+'8'
  }
  else if(out.length === 6){
    if(parsed.every(c => zero.includes(c))){
      str = str+'0';
    }
    else if(parsed.every(c => nine.includes(c))){
      str = str+'9'
    }
    else{
      str = str+'6'
    }
  }else{
    if(parsed.every(c => two.includes(c))){
      str = str + "2";
    }
    else if(parsed.every(c => three.includes(c))){
      str = str+"3"
    }
    else{
      str = str+"5"
    }
  }
})
sum = sum + parseInt(str);
});
console.log(sum);