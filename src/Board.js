import Hole from './Hole';
import StoreHouse from './StoreHouse';
import Stone from './Stone';
import Player from './Player';

class Board {
    constructor() {
        this.numOfHolesAndStones = 7;
        this.players = this.generatePlayers();
        this.holes = this.generateHoles();
        this.currentPlayer = this.players[0];
    }

    //============== init data ==============//

    generatePlayers() {
        let playerA = new Player('south');
        let playerB = new Player('north');
        return [playerA, playerB];
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
    //
    // holes representation:
    //      8  9 10 11 12 13 14
    //  [7]                     [15]
    //      6  5  4  3  2  1  0
    generateHoles() {
        let holes = [];
        // iterate player
        for (let i = 0; i < this.players.length; i++) {
            // iterate holes
            for (let j = 0; j < this.numOfHolesAndStones; j++) {
                // hole
                let hole = new Hole(this.players[i]);
                let stones = this.generateStones();
                hole.addStones(stones);
                // add hole to list
                holes.push(hole);
            }
            // store house
            let storeHouse = new StoreHouse(this.players[i]);
            // add store house to list
            holes.push(storeHouse);
        }
        return holes;
    }

    //============== store house ==============//

    getPlayerSouthStoreHouseIndex() {
        return this.numOfHolesAndStones;
    }

    getPlayerSouthStoreHouse() {
        return this.holes[this.getPlayerSouthStoreHouseIndex()];
    }

    getPlayerNorthStoreHouseIndex() {
        return this.numOfHolesAndStones * 2 + 1;
    }

    getPlayerNorthStoreHouse() {
        return this.holes[this.getPlayerNorthStoreHouseIndex()];
    }

    //============== basic operations ==============//

    getNextHoleIndex(holeIndex) {
        let nextHoleIndex = holeIndex >= this.getPlayerNorthStoreHouseIndex() ? 0 : holeIndex + 1;
        let nextHole = this.holes[nextHoleIndex];
        if (nextHole.isStoreHouse) {
            // store house only accessible for valid player
            if (nextHole.player.id !== this.currentPlayer.id) {
                nextHoleIndex = this.getNextHoleIndex(nextHoleIndex); // assumed numOfHolesAndStones always > 0
            }
        }
        return nextHoleIndex;
    }

    getOppositeHoleIndex(holeIndex) {
        return 2 * this.numOfHolesAndStones - holeIndex;
    }

    //============== board logic ==============//

    chooseHoleAndDistribute(holeIndex) {
        let startHole = this.holes[holeIndex];

        // do validity checking:
        //  - is hole empty?
        //  - is store house?
        //  - is belongs to current player?

        let stonesInHand = startHole.takeAllStones();

        // distribute all stones in hand until empty
        while (stonesInHand.length > 0) {
            // find next hole and distribute
            let nextHoleIndex = this.getNextHoleIndex(holeIndex);
            let nextHole = this.holes[nextHoleIndex];
            nextHole.addStone(stonesInHand.pop());
            // mark as moved to next hole
            holeIndex = nextHoleIndex;
        }

        // record last hole
        const lastHoleIndex = holeIndex;
        const lastHole = this.holes[lastHoleIndex];

        // additional logic checking where the distribution is ended:
        //  - in own store house -> can choose another hole
        //  - in opponent's place -> switch player or end
        //  - in own place:
        //      - if opposite hole not empty -> tembak (take stones in opposite hole + stones in current last hole), switch player or end
        //      - if opposite hole empty -> switch player or end

        if (lastHole.isStoreHouse && lastHole.player.id === this.currentPlayer.id) {
            // can choose another hole, currentPlayer stay the same
        } else if (lastHole.player.id !== this.currentPlayer.id) {
            // switch player or end
        } else if (lastHole.player.id === this.currentPlayer.id) {
            const oppositeHoleIndex = this.getOppositeHoleIndex(lastHoleIndex);
            const oppositeHole = this.holes[oppositeHoleIndex];
            if (oppositeHole.stones.length > 0) {
                // tembak, switch player
            } else {
                // switch player or end
            }
        }
        return lastHoleIndex;
    }

    printBoard() {
        let str = '   ';
        for (let i = this.numOfHolesAndStones + 1; i <= 2 * this.numOfHolesAndStones; i++) {
            str = str + this.holes[i].stones.length + '  ';
        }
        str = str + "\n";

        str = str + this.getPlayerSouthStoreHouse().stones.length;
        for (let i = 0; i < this.numOfHolesAndStones; i++) {
            str = str + '   ';
        }
        str = str + '  ';
        str = str + this.getPlayerNorthStoreHouse().stones.length;
        str = str + "\n";

        str = str + '   ';
        for (let i = this.numOfHolesAndStones - 1; i >= 0; i--) {
            str = str + this.holes[i].stones.length + '  ';
        }
        str = str + "\n";
        console.log(str);
    }
}

export default Board;