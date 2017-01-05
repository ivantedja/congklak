import Hole from './Hole';
import StoreHouse from './StoreHouse';
import Stone from './Stone';
import Player from './Player';

class Board {
    constructor() {
        this.numOfHolesAndStones = 7;
        this.players = [new Player('one'), new Player('two')];
        this.holes = this.generateHoles();
    }

    // init stones per hole for the first time
    generateStones() {
        let stones = [];
        for (let i = 0; i < this.numOfHolesAndStones; i++) {
            stones.push(new Stone());
        }
        return stones;
    }

    // init holes on board (including store house)
    // holes belongs to:
    //  - player 1:  0  1  2  3  4  5  6  [7]
    //  - player 2:  8  9 10 11 12 13 14 [15]
    generateHoles() {
        let holes = [];
        // iterate player
        for (let i = 0; i < this.players.length; i++) {
            // iterate holes
            for (let j = 0; j < this.numOfHolesAndStones; j++) {
                // hole
                let hole = new Hole();
                let stones = this.generateStones();
                hole.addStones(stones);
                hole.markPlayer(this.players[i]);
                // add hole to list
                holes.push(hole);
            }
            // store house
            let storeHouse = new StoreHouse();
            storeHouse.markPlayer(this.players[i]);
            // add store house to list
            holes.push(storeHouse);
        }
        return holes;
    }
}

export default Board;