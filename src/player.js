export { Player };
import { Gameboard } from './gameboard.js';

const Player = function(playerType) {

   const gameBoard = Gameboard();
   const typeOfPlayer = playerType;

   return { gameBoard, typeOfPlayer };

}