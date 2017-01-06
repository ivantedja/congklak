import Hole from './Hole';
import StoreHouse from './StoreHouse';
import Stone from './Stone';
import Player from './Player';

class Board {
    // assumed numOfHolesAndStones = 7
    //
    // holes belongs to:
    //  - player 1:  0  1  2  3  4  5  6  [7]
    //  - player 2:  8  9 10 11 12 13 14 [15]
    //
    // holes representation:
    //      8  9 10 11 12 13 14
    //  [7]                     [15]
    //      6  5  4  3  2  1  0
    constructor() {
        this.numOfHolesAndStones = 7;
        this.players = this.generatePlayers();
        this.initGame();
    }

    //============== init data ==============//

    initGame() {
        this.holes = this.generateHoles();
        this.currentPlayerIndex = 0;
    }

    initNextRound() {
        this.cleanupStones();
        this.holes = this.generateHolesNextRound();
    }

    generateHolesNextRound() {
        // iterate player, assumed always:
        //  - [0] -> south player
        //  - [1] -> north player
        let holes = [];
        for (let i = 0; i < this.players.length; i++) {
            let playerStoreHouse = i === 0 ? this.getPlayerSouthStoreHouse() : this.getPlayerNorthStoreHouse();
            let storeHouseStones = playerStoreHouse.stones.length;
            let holesFilled = Math.min(Math.floor(storeHouseStones / this.numOfHolesAndStones), this.numOfHolesAndStones);
            let holesBlocked = this.numOfHolesAndStones - holesFilled;
            let storeHouseStonesInit = storeHouseStones - holesFilled * this.numOfHolesAndStones;
            let offset = i === 0 ? 0 : this.numOfHolesAndStones + 1;
            // iterate holes
            for (let j = offset; j < offset + this.numOfHolesAndStones; j++) {
                // hole
                let hole = new Hole(this.players[i]);
                // some holes need to be blocked
                if (holesBlocked > 0) {
                    hole.isBlocked = true;
                    holesBlocked--;
                } else {
                    let stones = this.generateStones();
                    hole.addStones(stones);
                }
                // add hole to list
                holes.push(hole);
            }
            // store house
            let storeHouse = new StoreHouse(this.players[i]);
            let stones = this.generateStones(storeHouseStonesInit);
            storeHouse.addStones(stones);
            // add store house to list
            holes.push(storeHouse);
        }
        return holes;
    }

    setNextRoundPlayer(playerIndex) {
        this.currentPlayerIndex = playerIndex;
    }

    generatePlayers() {
        let playerA = new Player('south');
        let playerB = new Player('north');
        return [playerA, playerB];
    }

    // init stones per hole for the first time
    generateStones(numOfStones = this.numOfHolesAndStones) {
        let stones = [];
        for (let i = 0; i < numOfStones; i++) {
            stones.push(new Stone());
        }
        return stones;
    }

    // init holes on board (including store house)
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

    getCurrentPlayerStoreHouse() {
        return this.getCurrentPlayer().id === 'south' ? this.getPlayerSouthStoreHouse() : this.getPlayerNorthStoreHouse();
    }

    //============== holes ==============//

    getNextHoleIndex(holeIndex) {
        let nextHoleIndex = holeIndex >= this.getPlayerNorthStoreHouseIndex() ? 0 : holeIndex + 1;
        let nextHole = this.holes[nextHoleIndex];
        if (nextHole.isStoreHouse) {
            // store house only accessible for valid player
            if (nextHole.player.id !== this.getCurrentPlayer().id) {
                nextHoleIndex = this.getNextHoleIndex(nextHoleIndex);
            }
        } else if (nextHole.isBlocked) {
            nextHoleIndex = this.getNextHoleIndex(nextHoleIndex);
        }
        return nextHoleIndex;
    }

    getOppositeHoleIndex(holeIndex) {
        return 2 * this.numOfHolesAndStones - holeIndex;
    }

    isPlayerSouthHolesEmpty() {
        let sum = 0;
        for (let i = 0; i < this.numOfHolesAndStones; i++) {
            sum = sum + this.holes[i].stones.length;
        }
        return sum === 0 ? true : false;
    }

    isPlayerNorthHolesEmpty() {
        let sum = 0;
        for (let i = this.numOfHolesAndStones + 1; i < 2 * this.numOfHolesAndStones + 1; i++) {
            sum = sum + this.holes[i].stones.length;
        }
        return sum === 0 ? true : false;
    }

    isAnyPlayerHolesEmptyAndSetNextPlayer() {
        if (this.isPlayerSouthHolesEmpty()) {
            this.setNextRoundPlayer(1);
            return true;
        }
        if (this.isPlayerNorthHolesEmpty()) {
            this.setNextRoundPlayer(0);
            return true;
        }
        return false;
    }

    cleanupStones() {
        console.log('Cleaning up...');
        // south
        const playerSouthStoreHouse = this.getPlayerSouthStoreHouse();
        for (let i = 0; i < this.numOfHolesAndStones; i++) {
            playerSouthStoreHouse.addStones(this.holes[i].takeAllStones());
        }
        // north
        const playerNorthStoreHouse = this.getPlayerNorthStoreHouse();
        for (let i = this.numOfHolesAndStones + 1; i < 2 * this.numOfHolesAndStones + 1; i++) {
            playerNorthStoreHouse.addStones(this.holes[i].takeAllStones());
        }
    }

    //============== player ==============//

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    switchPlayer() {
        this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
        console.log('switch player into: ' + this.getCurrentPlayer().id);
    }
}

export default Board;