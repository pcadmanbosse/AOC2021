const fs = require('fs');
const { exit } = require('process');

const data = fs.readFileSync('input.txt', 'utf8').toString().split('\n\n');
const numbers = data[0].split(",");

const question1 = (grid, number) =>{
  let total = 0;
  grid.forEach(row =>{
    row.forEach(col =>{
      if(col !== 'x'){
        total+=parseInt(col);
      }
    })
  })
 return total*number;
}

const boards = data.slice(1).map(
  boardText => boardText.split("\n").map((row) => row.trim().replace("  ", " ").replace("  ", " ").replace("  "," ").split(" "))
).map((grid) => ({grid, colArr: new Array(5).fill(0), rowArr: new Array(5).fill(0)}));
let lastWinner;
let winningBoards = {};
numbers.forEach((number)=>{
  boards.forEach((board, boardIndex) =>{
    if(!winningBoards[boardIndex]){
    board.grid.forEach((row, rowIndex) =>{
      row.forEach((column, columnIndex) =>{
        if(column === number){
          board.colArr[columnIndex] = board.colArr[columnIndex] +1;
          board.rowArr[rowIndex] = board.rowArr[rowIndex] +1;
          board.grid[rowIndex][columnIndex] = 'x';
          if(board.colArr[columnIndex] === 5){
              lastWinner = {board: {...board}, number};
              winningBoards[boardIndex] = true;

          }
          if(board.rowArr[rowIndex] === 5){
              lastWinner = {board: {...board}, number};
              winningBoards[boardIndex] = true;
          }
        }
      })
    })
  }
  })
})
console.log(winningBoards)
console.log(question1(lastWinner.board.grid, lastWinner.number))