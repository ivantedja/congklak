import Board from './Board';

class Congklak {
    constructor() {
        this.delayMs = 1000;
        this.board = new Board();
    }
    //============== basic operations ==============//

    showMessage(msg) {
        // alert(msg);
        console.log(msg);
    }

    // taken from: http://www.sean.co.uk/a/webdesign/javascriptdelay.shtm
    pause(ms = this.delayMs) {
        ms += new Date().getTime();
        while (new Date() < ms){}
    }

    printBoard() {
        let str = '   ';
        for (let i = this.board.numOfHolesAndStones + 1; i <= 2 * this.board.numOfHolesAndStones; i++) {
            str = str + this.board.holes[i].stones.length + '  ';
        }
        str = str + "\n";

        str = str + this.board.getPlayerSouthStoreHouse().stones.length;
        for (let i = 0; i < this.board.numOfHolesAndStones; i++) {
            str = str + '   ';
        }
        str = str + '  ';
        str = str + this.board.getPlayerNorthStoreHouse().stones.length;
        str = str + "\n";

        str = str + '   ';
        for (let i = this.board.numOfHolesAndStones - 1; i >= 0; i--) {
            str = str + this.board.holes[i].stones.length + '  ';
        }
        str = str + "\n";
        str = str + "\n";
        str = str + 'current player: ' + this.board.getCurrentPlayer().id + "\n";
        str = str + "\n";

        console.log(str);
    }

    //============== main logic ==============//

    checkGameOverAndEnd() {
        // debug
        this.printBoard();
        let isGameOver = false;
        if (this.board.isAnyPlayerHolesEmptyAndSetNextPlayer()) {
            this.board.cleanupStones();
            const playerSouthStoreHouse = this.board.getPlayerSouthStoreHouse();
            const playerNorthStoreHouse = this.board.getPlayerNorthStoreHouse();
            const playerSouthStones = playerSouthStoreHouse.stones.length;
            const playerNorthStones = playerNorthStoreHouse.stones.length;
            let winner = null;
            if (playerSouthStones < this.board.numOfHolesAndStones) {
                winner = playerNorthStoreHouse.player.id;
                isGameOver = true;
            } else if (playerNorthStones < this.board.numOfHolesAndStones) {
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

    chooseHoleAndDistribute(holeIndex, isHumanChoice = true) {
        if (holeIndex < 0 || holeIndex > this.board.numOfHolesAndStones * 2 + 1) {
            this.showMessage('Out of bound.');
            return;
        }

        const startHole = this.board.holes[holeIndex];
        const currentPlayer = this.board.getCurrentPlayer();

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
            let nextHoleIndex = this.board.getNextHoleIndex(holeIndex);
            let nextHole = this.board.holes[nextHoleIndex];
            nextHole.addStone(stonesInHand.pop());
            // mark as moved to next hole
            holeIndex = nextHoleIndex;

            console.log('-----sleep-----');
            this.printBoard();
            this.pause();
        }

        // record last hole
        const lastHoleIndex = holeIndex;
        const lastHole = this.board.holes[lastHoleIndex];

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
            this.board.switchPlayer();
        } else if (lastHole.stones.length === 1 && lastHole.player.id === currentPlayer.id) {
            const oppositeHoleIndex = this.board.getOppositeHoleIndex(lastHoleIndex);
            const oppositeHole = this.board.holes[oppositeHoleIndex];
            if (oppositeHole.stones.length > 0) {
                // tembak
                const currentPlayerStoreHouse = this.board.getCurrentPlayerStoreHouse();
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
                this.board.switchPlayer();
            } else {
                // end game or switch player
                if (this.checkGameOverAndEnd()) {
                    return;
                }
                this.board.switchPlayer();
            }
        }
    }
}

window.congklak = new Congklak();