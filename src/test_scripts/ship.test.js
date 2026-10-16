import { Ship } from '../ship.js';
import { Gameboard } from '../gameboard.js';
import * as Const from '../constants.js';

let testShip;

describe('Ship testing', () => {

   beforeEach(() => {
      testShip = Ship(Const.DESTROYER);
   })

   test('New ship is not sunk', () => {
      expect(testShip.isSunk()).toBe(false);
   });

   test('Ship of size 2 is sunk after 2 hit', () => {
      testShip.hit();
      testShip.hit();
      expect(testShip.isSunk()).toBe(true);
   });
});

let gameboard;

describe('Game testing', () => {
   beforeEach(() => {
      gameboard = Gameboard();
      gameboard.startGame();
      gameboard.placeShip(gameboard.shipList[4], 0, 0, 0);
   });

   test('Start game and place one ship correctly', () => {
      gameboard.receiveAttack(0, 0);
      gameboard.receiveAttack(0, 1);
      expect(gameboard.boardToString()).toMatch(/hgh/);
   });

   test('Destroyer is hit twice on the board, and it is registered on the ship as sunk', () => {
      gameboard.receiveAttack(0, 0);
      gameboard.receiveAttack(0, 1);
      expect(gameboard.shipList[4].isSunk()).toBe(true);
   });

})