const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('');

const map = `
0 = 0000
1 = 0001
2 = 0010
3 = 0011
4 = 0100
5 = 0101
6 = 0110
7 = 0111
8 = 1000
9 = 1001
A = 1010
B = 1011
C = 1100
D = 1101
E = 1110
F = 1111`.split("\n").reduce((map,line) =>{
  const [key, val] = line.split(" = ");
  return {...map, [key]:val}
}, {});

let versions = 0;
const getVersion = (packet, startIndex) =>{
  return parseInt(packet.substring(startIndex, startIndex + 3), 2);
}

const getType = (packet, startIndex) =>{
  if(map['4'] === '0'+packet.substring(startIndex, startIndex+3)){
    return {type:'LITERAL', subtype: 0};
  } 
  let subtype = 'sum';
  if(map['1'] === '0'+packet.substring(startIndex, startIndex+3)){
    subtype='product';
  }
  if(map['2'] === '0'+packet.substring(startIndex, startIndex+3)){
    subtype='min';
  }
  if(map['3'] === '0'+packet.substring(startIndex, startIndex+3)){
    subtype='max';
  }
  if(map['5'] === '0'+packet.substring(startIndex, startIndex+3)){
    subtype='greater';
  }
  if(map['6'] === '0'+packet.substring(startIndex, startIndex+3)){
    subtype='lesser';
  }
  if(map['7'] === '0'+packet.substring(startIndex, startIndex+3)){
    subtype='equal';
  }
  return {type: 'OPERATION', subtype};
}

const processPacket = (packet, startIndex) =>{
  let index = startIndex;
  const version = getVersion(packet, index);
  index+=3;
  versions += version;
  const {type, subtype} = getType(packet, index);
  index+=3;
  if(type === 'LITERAL'){
    return handleLiteral(packet, index);
  }else{
    return handleOperation(packet, index, subtype);
  }
}

const handleLengthOperation = (packet, startIndex) =>{
  let index = startIndex;
  const number = parseInt(packet.substring(index, index+ 15), 2);
  index = index+15;
  let processedLength = 0;
  const values = [];
  while(processedLength < number){
    const {endIndex, value} = processPacket(packet, index);
    values.push(value);
    processedLength+= endIndex-index;
    index = endIndex;
  }
  return {value: values, endIndex: index};
}

const handlePacketNumberOperation = (packet, startIndex) =>{
  let index = startIndex;
  const numberOfPackets = parseInt(packet.substring(index, index+11), 2);
  index = index + 11; 
  const values = [];
  for(let i =0; i<numberOfPackets; i++){
    const {value, endIndex} = processPacket(packet, index);
    values.push(value);
    index = endIndex;
  }
  return {value: values, endIndex:index};
}

const handleType = ({value, endIndex}, type) =>{
  let res;
  switch(type){
    case 'sum':
      res = value.reduce((tot, curr) =>tot+parseInt(curr), 0);
      break;
    case 'product':
      res = value.reduce((tot, curr) => tot*curr, 1);
      break;
    case 'min':
      res = Math.min(...value);
      break;
    case 'max':
      res = Math.max(...value);
      break;
    case 'greater':
      res = value[0] > value[1] ? 1:0;
      break;
    case 'lesser':
      res = value[0]< value[1]?1:0;
      break;
      case 'equal':
        res = value[0]==value[1]?1:0;
  }
  return {value: [res], endIndex}
} 

const handleOperation = (packet, startIndex, type) =>{
  let index = startIndex;
  const mode = packet.charAt(index);
  index = index +1;
  if(mode === '1'){
    return handleType(handlePacketNumberOperation(packet, index), type);
    //next 11 bits are a number of contained subpackets
  }
  if(mode === '0'){
    return handleType(handleLengthOperation(packet, index), type);
    // next 15 bits are a number, total length in bits of the subpackets
  }
}

const handleLiteral = (packet, startIndex) =>{
  const numbers = [];
  let index = startIndex;
  while(packet.charAt(index)==='1'){
    numbers.push(packet.substring(index+1, index+5));
    index = index + 5;
  }
  // final packet, if exiting because char is 0 
  
    numbers.push(packet.substring(index+1, index+5));
    index = index+5;
  
  // don't forget to add offset if applicable
  // never applicable?!
  index = index;
  return {value: parseInt(numbers.join(''), 2), endIndex: index};
}

// console.log(input.map((el) => map[el]).join(''));
console.log(processPacket(input.map((el) => map[el]).join(''), 0))
console.log(versions)