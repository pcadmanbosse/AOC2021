const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').toString().split('\n').map((el) =>{
  const [instr, amount] = el.split(' ');
  return {instr, amount: parseInt(amount)}
}).reduce(({hor, dep, aim}, {instr, amount}) =>{
  if(instr === "forward"){

    return {hor: hor+amount, dep: dep+ (aim*amount), aim}
  }
  if(instr === "down"){
    return {hor, dep, aim:aim+amount}
  }
  if(instr === "up"){
    return {hor, dep, aim:aim-amount}
  }
}, {hor: 0, dep:0, aim: 0});

console.log(data.hor * data.dep)


