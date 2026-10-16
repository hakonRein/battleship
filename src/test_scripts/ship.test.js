import { ship } from '../ship.js';

let testShip;

beforeEach(() => {
   testShip = ship(2);
})

test('New ship is not sunk', () => {
   expect(testShip.isSunk()).toBe(false);
});

test('Ship of size 2 is sunk after 2 hit', () => {
   testShip.hit();
   testShip.hit();
   expect(testShip.isSunk()).toBe(true);
});