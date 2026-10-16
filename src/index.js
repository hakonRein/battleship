import "./style.css";
//import { Gameboard } from './gameboard.js';
import { Player } from './player.js';
import * as Const from './constants.js';
import { renderBoard } from './DOM-manipulation.js';

const newGameBtn = document.getElementById('new-game-btn');

newGameBtn.addEventListener('click', startNewGame);

function startNewGame() {
   player = Player(Const.HUMAN_PLAYER);
   computer = Player(Const.COMPUTER_PLAYER);
   console.log('Starting game');
   renderBoard(player.gameBoard.board);
}

let player;
let computer;
