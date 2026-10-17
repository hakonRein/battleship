import "./style.css";
//import { Gameboard } from './gameboard.js';
import { Player } from './player.js';
import * as Const from './constants.js';
import { renderBoard, showBoard } from './DOM-manipulation.js';

const newGameBtn = document.getElementById('new-game-btn');
const nextTurnBtn = document.getElementById('next-turn-btn');

newGameBtn.addEventListener('click', () => {
   GameEngine.startNewGame();
});

nextTurnBtn.addEventListener('click', () => {
   GameEngine.nextMove();
})

const GameEngine = (() => {

   let player;
   let computer;
   let gameState = Const.NO_GAME;

   function startNewGame() {
      player = Player(Const.HUMAN_PLAYER);
      computer = Player(Const.COMPUTER_PLAYER);
      renderBoard(player);
      renderBoard(computer);
      showBoard();

      //setNextState();
   }

   function nextMove() {
      let instruction;

      switch (gameState) {
         case Const.NO_GAME:
            instruction = 'Welcome to this game of Battleship!';
            break;
         case Const.GAME_SETUP:
            // Player and computer lay out their ships
            instruction = "Please place your ships on the board";
            player.randomShipPlacement();
            computer.randomShipPlacement();
            break;
         case Const.PLAYER_TURN:
            instruction = "Your turn";
            // Player makes move
            break;
         case Const.COMPUTER_TURN:
            instruction = "Computer players turn";
            // Computer makes move
            break;
         case Const.PLAYER_WIN:
            instruction = "You win!";
            // Display win message
            break;
         case Const.COMPUTER_WIN:
            instruction = "Sorry, you lose";
            // Display lose message
            break;
         default:
            instruction = "Hmmm, something went wrong";
            break;
      }
      setNextState();
      render(instruction);
   }

   function setNextState() {
      switch (gameState) {
         case Const.NO_GAME:
            gameState = Const.GAME_SETUP;
            break;
         case Const.GAME_SETUP:
            // Check if all ships are laid out
            gameState = Const.PLAYER_TURN;
            break;
         case Const.PLAYER_TURN:
            if (player.gameBoard.allShipsSunk()) {
               gameState = Const.COMPUTER_WIN;
            } else {
               gameState = Const.COMPUTER_TURN;
            }
            break;
         case Const.COMPUTER_TURN:
            if (computer.gameBoard.allShipsSunk()) {
               gameState = Const.PLAYER_WIN;
            } else {
               gameState = Const.PLAYER_TURN;
            }
            break;
         default:
            break;
      }
   }

   function doWeHaveAWinner() {
      return gameState === Const.PLAYER_WIN 
            || gameState === Const.COMPUTER_WIN;
   }

   function render(instruction) {
      renderBoard(player, instruction);
      renderBoard(computer, instruction);
   }

   return { startNewGame, nextMove, doWeHaveAWinner };

})();

