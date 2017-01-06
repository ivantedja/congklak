import $ from 'jquery';
import Board from './model/Board';

class Congklak {
    constructor() {
        this.queueDisplay = [];
        this.board = new Board();
        this.gameStatus = 0; // 0 = on going, 1 = end round, 2 = end game
        this.drawBoardUI();
    }

    //============== basic operations ==============//

    showMessage(msg) {
        alert(msg);
        console.log(msg);
        this.appendLog(msg + "\n");
    }

    appendLog(msg) {
        $('#log').append(msg);
    }

    printBoard() {
        const leftPadding = (str) => {
            return ('    ' + str).slice(-4);
        };

        let str = 'Current player: ' + this.board.getCurrentPlayer().id + "\n";
        str += leftPadding('');
        for (let i = this.board.numOfHolesAndStones + 1; i <= 2 * this.board.numOfHolesAndStones; i++) {
            str += leftPadding(this.board.holes[i].stones.length);
        }
        str += "\n";

        str += leftPadding(this.board.getPlayerSouthStoreHouse().stones.length);
        for (let i = 0; i < this.board.numOfHolesAndStones; i++) {
            str += leftPadding('');
        }
        str += leftPadding(this.board.getPlayerNorthStoreHouse().stones.length);
        str += "\n";

        str += leftPadding('');
        for (let i = this.board.numOfHolesAndStones - 1; i >= 0; i--) {
            str += leftPadding(this.board.holes[i].stones.length);
        }
        str += "\n----------------------------\n";

        console.log(str);
        this.appendLog(str);
    }

    getBoardHtml() {
        let html = 'Current Player: ' + this.board.getCurrentPlayer().id;

        html += '<table>';

        // first row (north player)
        html += '<tr><td></td>';
        for (let i = this.board.numOfHolesAndStones + 1; i <= 2 * this.board.numOfHolesAndStones; i++) {
            let cssClass = ['hole'];
            if (this.board.holes[i].isBlocked) {
                cssClass.push('blocked');
            }
            html += '<td><span class="' + cssClass.join(' ') + '" data-hole="' + i + '">' + this.board.holes[i].stones.length + '</span></td>';
        }
        html += '<td></td></tr>';

        // second row (store houses)
        html += '<tr>';
        html += '<td><span class="store-house" id="hole-' + this.board.getPlayerSouthStoreHouseIndex() + '">' +
            this.board.getPlayerSouthStoreHouse().stones.length + '</span></td>';
        html += '<td colspan="' + this.board.numOfHolesAndStones + '"></td>';
        html += '<td><span class="store-house" id="hole-' + this.board.getPlayerNorthStoreHouseIndex() + '">' +
            this.board.getPlayerNorthStoreHouse().stones.length + '</span></td>';
        html += '</tr>';

        // third row (south player)
        html += '<tr><td></td>';
        for (let i = this.board.numOfHolesAndStones - 1; i >= 0; i--) {
            let cssClass = ['hole'];
            if (this.board.holes[i].isBlocked) {
                cssClass.push('blocked');
            }
            html += '<td><span class="' + cssClass.join(' ') + '" data-hole="' + i + '">' + this.board.holes[i].stones.length + '</span></td>';
        }
        html += '<td></td></tr>';

        html += '</table>';

        return html;
    }

    observeOnClickHole() {
        const self = this;
        $('.hole').each((idx, elem) => {
            $(elem).click(() => {
                self.chooseHoleAndDistribute($(elem).data('hole'));
            });
        });
    }

    drawBoardUI() {
        $('#congklak').html(this.getBoardHtml());
        this.observeOnClickHole();
    }

    showRoundControls() {
        $('#round-controls').show();
        $('#round-controls').find('button').each((idx, elem) => {
            $(elem).click(() => {
                $('#round-controls').hide();
            });
        });
    }

    //============== main logic ==============//

    resetGame() {
        this.board.initGame();
        // debug
        this.showMessage('Reset game.');
        this.printBoard();
        this.drawBoardUI();
    }

    checkGameOverAndEnd() {
        // debug
        this.printBoard();
        this.drawBoardUI();
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
        this.gameStatus = 1;
        this.showRoundControls();
        // debug
        this.printBoard();
        this.drawBoardUI();
        this.showMessage('Round is over! Round winner: ' + winner);
    }

    endGame(winner) {
        this.gameStatus = 2;
        // debug
        this.printBoard();
        this.drawBoardUI();
        this.showMessage('Game is over! Game winner: ' + winner);
    }

    forceEndGame() {
        this.board.cleanupStones();
        const playerSouthStoreHouse = this.board.getPlayerSouthStoreHouse();
        const playerNorthStoreHouse = this.board.getPlayerNorthStoreHouse();
        const playerSouthStones = playerSouthStoreHouse.stones.length;
        const playerNorthStones = playerNorthStoreHouse.stones.length;
        let winner = 'draw';
        if (playerSouthStones > playerNorthStones) {
            winner = playerSouthStoreHouse.player.id;
        } else if (playerNorthStones > playerSouthStones) {
            winner = playerNorthStoreHouse.player.id;
        }
        this.showMessage('Force end game.');
        this.endGame(winner);
    }

    nextRound() {
        this.showMessage('Continue next round.');
        this.board.initNextRound();
        this.gameStatus = 0;
        // debug
        this.printBoard();
        this.drawBoardUI();
    }

    chooseHoleAndDistribute(holeIndex, isHumanChoice = true) {
        if (isHumanChoice) {
            this.showMessage('Hole index ' + holeIndex + ' is chosen');
        }

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
        // debug
        this.printBoard();

        // distribute all stones in hand until empty
        while (stonesInHand.length > 0) {
            // find next hole and distribute
            let nextHoleIndex = this.board.getNextHoleIndex(holeIndex);
            let nextHole = this.board.holes[nextHoleIndex];
            nextHole.addStone(stonesInHand.pop());
            // mark as moved to next hole
            holeIndex = nextHoleIndex;
            // debug
            this.printBoard();
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
            this.showMessage('You\'re landed in your store house. Run again.');
            // can choose another hole, currentPlayer stay the same
            // end game
            if (this.checkGameOverAndEnd()) {
                return;
            }
        } else if (lastHole.stones.length > 1) {
            // non empty holes, repeat
            // 2nd parameter indicating that it is not a human choice
            this.showMessage('Non empty hole in hole index ' + lastHoleIndex + ', keep iterating');
            this.chooseHoleAndDistribute(lastHoleIndex, false);
        } else if (lastHole.stones.length === 1 && lastHole.player.id !== currentPlayer.id) {
            // end game or switch player
            if (this.checkGameOverAndEnd()) {
                return;
            }
            this.board.switchPlayer();
            this.showMessage('Switch player into: ' + this.board.getCurrentPlayer().id);
            this.drawBoardUI();
        } else if (lastHole.stones.length === 1 && lastHole.player.id === currentPlayer.id) {
            const oppositeHoleIndex = this.board.getOppositeHoleIndex(lastHoleIndex);
            const oppositeHole = this.board.holes[oppositeHoleIndex];
            if (oppositeHole.stones.length > 0) {
                // tembak
                this.showMessage('Tembak!');
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
                this.showMessage('Switch player into: ' + this.board.getCurrentPlayer().id);
                this.drawBoardUI();
            } else {
                // end game or switch player
                if (this.checkGameOverAndEnd()) {
                    return;
                }
                this.board.switchPlayer();
                this.showMessage('Switch player into: ' + this.board.getCurrentPlayer().id);
                this.drawBoardUI();
            }
        }
    }
}

window.congklak = new Congklak();