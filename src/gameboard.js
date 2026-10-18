export { Gameboard };
import { Ship } from './ship.js';
import * as Const from './constants.js';

const Gameboard = function() {

   const board = initializeBoard();

   const carrier = Ship(Const.CARRIER);
   const battleship = Ship(Const.BATTLESHIP);
   const cruiser = Ship(Const.CRUISER);
   const submarine = Ship(Const.SUBMARINE);
   const destroyer = Ship(Const.DESTROYER);

   const shipList = [carrier, battleship, cruiser, submarine, destroyer];
   const placedShips = [];

   function placeShip(ship, x, y, direction) {
      const endX = direction === Const.SHIP_DIRECTION_VERTICAL ? x + ship.length - 1 : 1;
      const endY = direction === Const.SHIP_DIRECTION_HORIZONTAL ? y + ship.length - 1 : 1;
      if (isAvailableSpace(x, y, endX, endY)) {
         if (direction === Const.SHIP_DIRECTION_VERTICAL) {
            for (let i = x; i <= endX; i++) {
               board[i][y] = ship.type;
            }
         } else {
            for (let i = y; i <= endY; i++) {
               board[x][i] = ship.type;
            }
         }
         placedShips.push(ship);
         return true;
      } else {
         return false;
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
      const initBoard = [];
      for (let x = 0; x < Const.GAMEBOARD_SIZE; x++) {
         initBoard[x] = [];
         for (let y = 0; y < Const.GAMEBOARD_SIZE; y++) {
            initBoard[x][y] = Const.EMPTY;
         }
      }
      return initBoard;
   }

   function isAvailableSpace(x1, y1, x2, y2) {
      let otherShipsBlocking = false;
      for (let x = x1; x <= x2; x++) {
         otherShipsBlocking = otherShipsBlocking || 'HBCSD'.charAt(board[x][y1]) !== -1;
      }
      for (let y = y1; y <= y2; y++) {
         otherShipsBlocking = otherShipsBlocking || 'HBCSD'.charAt(board[x1][y]) !== -1;
      }
      return x1 >= 0 && x1 < 10 && y1 >= 0 && y1 < 10
         && x2 >= 0 && x2 < 10 && y2 >= 0 && y2 < 10
         //&& !otherShipsBlocking;
   }

   return { shipList,
            placedShips,
            board, 
            receiveAttack, 
            placeShip, 
            boardToString,
            allShipsSunk };

};