export { Player };
import { Gameboard } from './gameboard.js';
import * as Const from './constants.js';

const Player = function(playerType) {

   const gameBoard = Gameboard();
   const typeOfPlayer = playerType;

   function isHuman() {
      return typeOfPlayer === Const.HUMAN_PLAYER;
   }

   function randomShipPlacement() {
      gameBoard.placeShip(gameBoard.shipList[0], 0, 0, 0);
      gameBoard.placeShip(gameBoard.shipList[1], 4, 3, 1);
      gameBoard.placeShip(gameBoard.shipList[2], 1, 9, 1);
      gameBoard.placeShip(gameBoard.shipList[3], 7, 7, 2);
      gameBoard.placeShip(gameBoard.shipList[4], 5, 6, 1);
   }

   return { gameBoard, isHuman, randomShipPlacement };

}