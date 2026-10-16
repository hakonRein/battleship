export { Gameboard };
import { Ship } from './ship.js';
import * as Const from './constants.js';

const Gameboard = function() {

   const board = [];

   const carrier = Ship(Const.CARRIER);
   const battleship = Ship(Const.BATTLESHIP);
   const cruiser = Ship(Const.CRUISER);
   const submarine = Ship(Const.SUBMARINE);
   const destroyer = Ship(Const.DESTROYER);

   const shipList = [carrier, battleship, cruiser, submarine, destroyer];

   function placeShip(ship, x, y, direction) {
      if (direction === Const.SHIP_DIRECTION_VERTICAL) {
         const endX = x + ship.length - 1;
         if (endX < 10) {
            for (let i = x; i <= endX; i++) {
               board[i][y] = ship.type;
            }
         }
      } else {
         const endY = y + ship.length - 1;
         if (endY < 10) {
            for (let i = y; i <= endY; i++) {
               board[x][i] = ship.type;
            }
         }
      }
   }

   function receiveAttack(x, y) {
      switch (board[x][y]) {
         case Const.EMPTY:
            board[x][y] = Const.MISS;
            break;
         case Const.MISS:
            throw new Error('Miss already registered here');
         case Const.HIT:
            throw new Error('Hit already registered here');
         case Const.CARRIER:
            board[x][y] = Const.HIT;
            carrier.hit();
            break;
         case Const.BATTLESHIP:
            board[x][y] = Const.HIT;
            battleship.hit();
            break;
         case Const.CRUISER:
            board[x][y] = Const.HIT;
            cruiser.hit();
            break;
         case Const.SUBMARINE:
            board[x][y] = Const.HIT;
            submarine.hit();
            break;
         case Const.DESTROYER:
            board[x][y] = Const.HIT;
            shipList[4].hit();
            break;          
         default:
            throw new Error('Illegal move');
      }
   }

   function startGame() {
      initializeBoard();
   }

   function allShipsSunk() {
      for (const ship of shipList) {
         if (!ship.isSunk()) {
            return false;
         }
      }
      return true;
   }

   function boardToString() {
      let boardString = '';
      for (let x = 0; x < board.length; x++) {
         boardString += '|---------------------------------------|\n';
         for (let y = 0; y < board[x].length; y++) {
            boardString += `| ${board[x][y]} `;
         }
         boardString += '|\n';
      }
      boardString += '|---------------------------------------|\n';
      return boardString;
   }

   function initializeBoard() {
      for (let x = 0; x < Const.GAMEBOARD_SIZE; x++) {
         board[x] = [];
         for (let y = 0; y < Const.GAMEBOARD_SIZE; y++) {
            board[x][y] = Const.EMPTY;
         }
      }
   }

   return { shipList, 
            startGame, 
            receiveAttack, 
            placeShip, 
            boardToString,
            allShipsSunk };

};