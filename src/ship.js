export { Ship };
import * as Const from './constants.js';

const Ship = function(shipType) {
   
   const type = shipType;
   const length = setLength(shipType);
   let hitCount = 0;

   function hit() {
      if (hitCount < length) {
         hitCount++;
      }
   }

   function isSunk() {
      return hitCount >= length;
   }

   function getHit() {
      return hitCount;
   }

   function setLength(shipType) {
      switch (shipType) {
         case Const.CARRIER:     return 5;
         case Const.BATTLESHIP:  return 4;
         case Const.CRUISER:     return 3;
         case Const.SUBMARINE:   return 3;
         case Const.DESTROYER:   return 2;
         default:
            return 0;
      }
   }
   
   return { type, length, hit, isSunk, getHit };
};

