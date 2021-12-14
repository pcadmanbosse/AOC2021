const fs = require('fs');

let lanternFish = fs.readFileSync('input.txt', 'utf8').toString().split(",").map(n => parseInt(n));

const fishMap = {1: 0, 2:0, 3:0, 4:0, 5:0, 6:0, 7: 0, 8:0, 0:0};
lanternFish.forEach(fish =>{
  fishMap[fish] = fishMap[fish] +1;
})
for (let i = 0; i<
  256; i++){
  const newFish = fishMap[0];
  fishMap[0] = fishMap[1];
  fishMap[1] = fishMap[2];
  fishMap[2] = fishMap[3];
  fishMap[3] = fishMap[4];
  fishMap[4] = fishMap[5];
  fishMap[5] = fishMap[6];
  fishMap[6] = fishMap[7] + newFish;
  fishMap[7] = fishMap[8];
  fishMap[8] = newFish;
}

console.log(Object.values(fishMap).reduce((sum, curr) => sum+BigInt(curr), BigInt(0)))