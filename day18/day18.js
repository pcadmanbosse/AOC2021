const fs = require('fs');
const preProcess = (el, isLeft) =>{
  if(!Array.isArray(el)){
    return {v: el, isLeft}
  }
  else{
    return {v: el.map((e, index) => preProcess(e, index===0)), isLeft}
  }
}

const inputs = fs.readFileSync('input.txt').toString().trim().split('\n').map(
  line => JSON.parse(line)
).map(
  (el, index) => preProcess(el, index===0)
);

const add = (left, right) =>{
  return {
    v: [{...left, isLeft:true}, {...right, isLeft:false}],
    isLeft: true,
  }
}

const print = (el) =>{
  if(!Array.isArray(el.v)){
    return el.v;
  }
  return '['+el.v.map(x => print(x))+']'
}

const reduce = (input) =>{
  let parentsL = [];
  let parentsR = [];
  const addToRightest = (el, val, goUp, wasRight) =>{
    if(!Array.isArray(el.v)){
      el.v = el.v +val;
      parentsL = [];
      return;
    }
    else if(goUp && wasRight){
      addToRightest(el.v[0], val, false, null)
    }
    else if(goUp && !wasRight){
      if(parentsL.length>0){
        const parent = parentsL.pop();
        addToRightest(parent, val, true, !el.isLeft);
      }
    }
    else if(!goUp){
      addToRightest(el.v[1], val, false);
    }
  }
  
  const addToLeftest = (el, val, goUp, wasLeft) =>{
    if(!Array.isArray(el.v)){
      el.v = el.v +val;
      parentsR = [];
      return;
    }
    if(goUp && wasLeft){
      addToLeftest(el.v[1], val, false, null)
    }
    else if(goUp && !wasLeft){
      if(parentsR.length>0){
        const parent = parentsR.pop();
        addToLeftest(parent, val, true, el.isLeft);
      }
    }
    else if(!goUp){
      addToLeftest(el.v[0], val, false);
    }
  }
  
  
  const process = (el, depth, ignoreNumbers=true) =>{
    if(Array.isArray(el.v)){
     // is more than 4 depth
     if(depth > 4){
      const leftParent = parentsL.pop();
      const rightParent = parentsR.pop();
      addToLeftest(rightParent, el.v[1].v, true, el.isLeft);
      addToRightest(leftParent, el.v[0].v, true, !el.isLeft)
      el.v = 0;
      return true;
    }
    parentsL.push(el);
    parentsR.push(el);
    const sthgHappenedLeft = process(el.v[0], depth+1, ignoreNumbers);
    let sthgHappenedRight = false;
    if(!sthgHappenedLeft){
      sthgHappenedRight = process(el.v[1], depth+1, ignoreNumbers);
    };
    parentsL.pop();
    parentsR.pop();
    return sthgHappenedLeft || sthgHappenedRight;
  }
    // is number
    if(!Array.isArray(el.v)){
      if(!ignoreNumbers && el.v >= 10){
        el.v = [preProcess(Math.floor(el.v/2), true), preProcess(Math.ceil(el.v/2), false)];
        return true;
      }
      return false;
    }
   }  

   lastPrint = print(input);
process(input, 1, true);
while(lastPrint !== print(input)){
  while(lastPrint !== print(input)){
    lastPrint= print(input)
    process(input, 1, true);
  }
  lastPrint = print(input)
  process(input, 1, false);
}

return input;
}

const magnitude = (el) =>{
  if(!Array.isArray(el.v)){
    return el.v;
  }
  return 3*magnitude(el.v[0]) + 2*magnitude(el.v[1])
}

// Q1
const finalRes = inputs.slice(1).reduce((prev, curr) =>{
  return reduce(add(prev, JSON.parse(JSON.stringify(curr))))
}, JSON.parse(JSON.stringify(inputs[0])))
console.log(magnitude(finalRes))

//Q2
let max = 0;
inputs.forEach((inp, index) => {
  inputs.forEach((inp2, index2) =>{
    if(index!==index2){
      const magn = magnitude(reduce(add(JSON.parse(JSON.stringify(inp)), JSON.parse(JSON.stringify(inp2)))))
      if(magn>max){
        max=magn;
      }
    }
  })
})
console.log(max)
