const fs = require('fs');
const graph = {};
fs.readFileSync('input.txt').toString().trim().split("\n").forEach(edge =>{
  const [from, to] = edge.split('-');
  graph[from] = [...(graph[from] || []), to];
  graph[to] = [...(graph[to] || []), from];
});
const paths = [];

  const queue = [];
  graph['start'].forEach(startNode =>{
    queue.push({node: startNode, stack:['start'], smallVisits:false})
  });
  while(queue.length > 0){
    const {node, stack, smallVisits} = queue.pop();
    if(node === 'start' || ((node.toLowerCase() === node) && smallVisits && stack.includes(node))){
      continue;
    }
    if(node === 'end'){
      paths.push([...stack, node])
    }
    else{
      graph[node].forEach(child =>{
        queue.push({node:child, stack: [...stack, node], smallVisits: smallVisits||(node.toLowerCase() === node && stack.includes(node))})
      })
    }
  }


console.log(paths)
console.log(paths.length)
