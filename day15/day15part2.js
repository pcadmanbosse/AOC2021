const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().split('\n');

const ogMap = input.map((row) => row.split('').map(i => parseInt(i)));
const map = [];

for(let i =0; i<5; i++){
  for(let i2 = 0; i2 <5; i2++){
    const newM = [];
    ogMap.forEach(r =>{
      const newR = [];
      r.forEach(c =>{
        newR.push(Math.max(1, (c+i+i2+Math.floor((c+i+i2)/10))%10))
      })
      newM.push(newR)
    })
    if(i2 === 0){
      newM.forEach(r =>{
        map.push(r);
      });
    }else{
      newM.forEach((r, index) =>{
        map[(i*ogMap.length)+index] = map[(i*ogMap.length)+index].concat(r);
      })
    }
  }
  
}
const cache = new Array(map.length).fill().map(r =>new Array(map.length).fill(Infinity));
cache[0][0] = 0;

for(let z=0; z<1000; z++){
for(let yt = 0; yt<map.length; yt++){
  for(let xt = 0; xt<map[0].length; xt++){
    if(xt===0 && yt === 0){
      continue;
    }
    const valsToConsider = [];
    if(xt > 0){
      valsToConsider.push(cache[yt][xt-1]);
    }
    if(yt>0){
      valsToConsider.push(cache[yt-1][xt])
    }
    if(xt < map[0].length -1){
      valsToConsider.push(cache[yt][xt+1]);
    }
    if(yt < map.length -1){
      valsToConsider.push(cache[yt+1][xt]);
    }
      cache[yt][xt]= 
      map[yt][xt]  +
      Math.min(
        ...valsToConsider)
  }
}
}

console.log(cache[map.length-1][map.length-1]);