export { renderBoard, showBoard };

const humanBoardDisplay = document.getElementById('human-board');
const computerBoardDisplay = document.getElementById('computer-board');
const instructionText = document.getElementById('instruction');

function showBoard() {
   humanBoardDisplay.style.display = 'grid';
   computerBoardDisplay.style.display = 'grid';
}

function renderBoard(player, instruction) {
   if (player.isHuman()) {
      humanBoardDisplay.innerHTML = '';
   } else {
      computerBoardDisplay.innerHTML = '';
   }
   const board = player.gameBoard.board;
   for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
         const boardSquare = document.createElement('button');
         boardSquare.classList.add('square-btn');
         boardSquare.setAttribute('data-id', `${player.isHuman() ? 'h': 'c'}${i}${j}`);
         boardSquare.textContent = board[i][j];
         if (player.isHuman()) {
            humanBoardDisplay.appendChild(boardSquare);
         } else {
            computerBoardDisplay.appendChild(boardSquare);
         }
      }
   }
   instructionText.textContent = instruction;

   
}