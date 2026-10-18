import "./style.css";
import { Player } from './player.js';
import * as Const from './constants.js';
import { renderBoard, showBoard } from './DOM-manipulation.js';

const newGameBtn = document.getElementById('new-game-btn');
const nextTurnBtn = document.getElementById('next-turn-btn');
const boardDisplay = document.getElementById('play-zone');

newGameBtn.addEventListener('click', () => {
   GameEngine.startNewGame();
});

nextTurnBtn.addEventListener('click', () => {
   GameEngine.nextMove();
});

boardDisplay.addEventListener('click', (event) => {
   const squareId = event.target.dataset.id;
   if (GameEngine.getGameState() === Const.GAME_SETUP) {
      if (squareId !== null && squareId[0] === 'h') {
         GameEngine.placeNextShip(Number(squareId[1]), Number(squareId[2]));
         GameEngine.nextMove();
      }
   } else if (GameEngine.getGameState() === Const.PLAYER_TURN) {
      console.log('Player turn');
      console.log(squareId);
      if (squareId !== null && squareId[0] === 'c') {
         GameEngine.makeAttack(Number(squareId[1]), Number(squareId[2]));
         GameEngine.nextMove();
      }
   }
});

const GameEngine = (() => {

   let player;
   let computer;
   let gameState;

   function startNewGame() {
      gameState = Const.NO_GAME;
      player = Player(Const.HUMAN_PLAYER);
      computer = Player(Const.COMPUTER_PLAYER);
      render('Welcome to this game of Battleship');
      showBoard();

      //nextMove();
   }

   function getGameState() {
      return gameState;
   }

   function nextMove() {

      switch (gameState) {
         case Const.NO_GAME:
            break;
         case Const.GAME_SETUP:
            // Player and computer lay out their ships
            // player.randomShipPlacement();
            computer.randomShipPlacement();
            break;
         case Const.PLAYER_TURN:
            // Player makes move
            break;
         case Const.COMPUTER_TURN:
            // Computer makes move
            break;
         case Const.PLAYER_WIN:
            // Display win message
            break;
         case Const.COMPUTER_WIN:
            // Display lose message
            break;
         default:
            break;
      }
      setNextState();
   }

   function setNextState() {
      let instruction;

      switch (gameState) {
         case Const.NO_GAME:
            instruction = 'Please place your ships on the board';
            gameState = Const.GAME_SETUP;
            break;
         case Const.GAME_SETUP:
            if (player.gameBoard.placedShips.length === player.gameBoard.shipList.length) {
               instruction = 'Your turn';
               gameState = Const.PLAYER_TURN;
            } else {
               instruction = 'Place your next ship';
            }
            break;
         case Const.PLAYER_TURN:
            if (player.gameBoard.allShipsSunk()) {
               instruction = 'Sorry, you lose';
               gameState = Const.COMPUTER_WIN;
            } else {
               instruction = 'Computer players turn';
               gameState = Const.COMPUTER_TURN;
            }
            break;
         case Const.COMPUTER_TURN:
            if (computer.gameBoard.allShipsSunk()) {
               instruction = 'You win!';
               gameState = Const.PLAYER_WIN;
            } else {
               instruction = 'Your turn';
               gameState = Const.PLAYER_TURN;
            }
            break;
         default:
            instruction = 'Hmmm, something went wrong';
            break;
      }
      render(instruction);
   }

   function doWeHaveAWinner() {
      return gameState === Const.PLAYER_WIN 
            || gameState === Const.COMPUTER_WIN;
   }

   function placeNextShip(x, y) {
      const nextShip = player.gameBoard.shipList[player.gameBoard.placedShips.length];
      player.gameBoard.placeShip(nextShip, x, y, 0);
   }

   function makeAttack(x, y) {
      computer.gameBoard.receiveAttack(x, y);
   }

   function render(instruction) {
      renderBoard(player, instruction);
      renderBoard(computer, instruction);
   }

   return { getGameState, startNewGame, nextMove, doWeHaveAWinner, placeNextShip, makeAttack };

})();

