export { renderBoard };

const boardDisplay = document.getElementById('board');

function renderBoard(gameBoard) {
   for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
         const boardSquare = document.createElement('div');
         boardSquare.classList.add('board-square');
         const squareText = document.createElement('span');
         squareText.textContent = gameBoard[i][j];
         boardSquare.appendChild(squareText);
         boardDisplay.appendChild(boardSquare);
      }
   }

   
}