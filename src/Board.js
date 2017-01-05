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
        this.initGame();
    }

    //============== init data ==============//

    initGame() {
        this.players = this.generatePlayers();
        this.holes = this.generateHoles();
        this.currentPlayerIndex = 0;
        // debug
        this.printBoard();
    }

    initNextRound() {
        this.cleanupStones();
        this.holes = this.generateHolesNextRound();
        // debug
        this.printBoard();
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


    //============== basic operations ==============//

    showMessage(msg) {
        // alert(msg);
        console.log(msg);
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
        str = str + "\n";
        str = str + 'current player: ' + this.getCurrentPlayer().id + "\n";
        str = str + "\n";

        console.log(str);
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

    //============== player ==============//

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    switchPlayer() {
        this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
        console.log('switch player into: ' + this.getCurrentPlayer().id);
    }

    //============== main logic ==============//

    checkGameOverAndEnd() {
        // debug
        this.printBoard();
        let isGameOver = false;
        if (this.isAnyPlayerHolesEmptyAndSetNextPlayer()) {
            this.cleanupStones();
            const playerSouthStoreHouse = this.getPlayerSouthStoreHouse();
            const playerNorthStoreHouse = this.getPlayerNorthStoreHouse();
            const playerSouthStones = playerSouthStoreHouse.stones.length;
            const playerNorthStones = playerNorthStoreHouse.stones.length;
            let winner = null;
            if (playerSouthStones < this.numOfHolesAndStones) {
                winner = playerNorthStoreHouse.player.id;
                isGameOver = true;
            } else if (playerNorthStones < this.numOfHolesAndStones) {
                winner = playerSouthStoreHouse.player.id;
                isGameOver = true;
            } else if (playerSouthStones > playerNorthStones) {
                winner = playerSouthStoreHouse.player.id;
            } else if (playerNorthStones > playerSouthStones) {
                winner = playerNorthStoreHouse.player.id;
            }
            if (winner !== null) {
                if (isGameOver) {
                    this.endGame(winner);
                } else {
                    this.endRound(winner);
                }
                return true;
            }
        }
        return false;
    }

    endRound(winner) {
        console.log('Round is over! Round winner: ' + winner);
    }

    endGame(winner) {
        console.log('Game is over! Game winner: ' + winner);
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
        // debug
        this.printBoard();
    }

    chooseHoleAndDistribute(holeIndex, isHumanChoice = true) {
        if (holeIndex < 0 || holeIndex > this.numOfHolesAndStones * 2 + 1) {
            this.showMessage('Out of bound.');
            return;
        }

        const startHole = this.holes[holeIndex];
        const currentPlayer = this.getCurrentPlayer();

        if (startHole.stones.length === 0) {
            this.showMessage('Invalid hole. Hole is empty.');
            return;
        } else if (startHole.isStoreHouse) {
            this.showMessage('Invalid hole. This store is a store house.');
            return;
        } else if (isHumanChoice && startHole.player.id !== currentPlayer.id) {
            this.showMessage('Invalid hole. This hole does not belongs to you.');
            return;
        }

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
        //  - in own store house -> end or can choose another hole
        //  - in non empty hole -> repeat
        //  - in opponent's place (empty) -> end or switch player
        //  - in own place (empty):
        //      - if opposite hole not empty -> tembak (take stones in opposite hole + stones in current last hole), end or switch player
        //      - if opposite hole empty -> end or switch player
        // note: in the code, total stones should be checked against `1` instead of `0`
        //       because it contains our last stone

        if (lastHole.isStoreHouse && lastHole.player.id === currentPlayer.id) {
            // can choose another hole, currentPlayer stay the same
            // end game
            if (this.checkGameOverAndEnd()) {
                return;
            }
        } else if (lastHole.stones.length > 1) {
            // debug
            this.printBoard();
            // non empty holes, repeat
            // 2nd parameter indicating that it is not a human choice
            this.chooseHoleAndDistribute(lastHoleIndex, false);
        } else if (lastHole.stones.length === 1 && lastHole.player.id !== currentPlayer.id) {
            // end game or switch player
            if (this.checkGameOverAndEnd()) {
                return;
            }
            this.switchPlayer();
        } else if (lastHole.stones.length === 1 && lastHole.player.id === currentPlayer.id) {
            const oppositeHoleIndex = this.getOppositeHoleIndex(lastHoleIndex);
            const oppositeHole = this.holes[oppositeHoleIndex];
            if (oppositeHole.stones.length > 0) {
                // tembak
                const currentPlayerStoreHouse = this.getCurrentPlayerStoreHouse();
                // retrieve stones from current last hole
                const lastHoleStones = lastHole.takeAllStones();
                currentPlayerStoreHouse.addStones(lastHoleStones);
                // retrieve stones from opposite holes
                const oppositeHoleStones = oppositeHole.takeAllStones();
                currentPlayerStoreHouse.addStones(oppositeHoleStones);
                // end game or switch player
                if (this.checkGameOverAndEnd()) {
                    return;
                }
                this.switchPlayer();
            } else {
                // end game or switch player
                if (this.checkGameOverAndEnd()) {
                    return;
                }
                this.switchPlayer();
            }
        }
    }
}

export default Board;