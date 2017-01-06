import $ from 'jquery';
import Board from './model/Board';

class Congklak {
    constructor() {
        this.delayMs = 1000;
        this.queueDisplay = [];
        this.board = new Board();
        this.drawBoardUI();
    }
    //============== basic operations ==============//

    showMessage(msg) {
        alert(msg);
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

    getBoardHtml() {
        let html = 'Current Player: ' + this.board.getCurrentPlayer().id;

        html += '<table>';

        // first row (north player)
        html += '<tr><td></td>';
        for (let i = this.board.numOfHolesAndStones + 1; i <= 2 * this.board.numOfHolesAndStones; i++) {
            html += '<td><span class="hole" data-hole="' + i + '">' + this.board.holes[i].stones.length + '</span></td>';
        }
        html += '<td></td></tr>';

        // second row (store houses)
        html += '<tr>';
        html += '<td><span id="hole-' + this.board.getPlayerSouthStoreHouseIndex() + '">' +
            this.board.getPlayerSouthStoreHouse().stones.length + '</span></td>';
        html += '<td colspan="' + this.board.numOfHolesAndStones + '"></td>';
        html += '<td><span id="hole-' + this.board.getPlayerNorthStoreHouseIndex() + '">' +
            this.board.getPlayerNorthStoreHouse().stones.length + '</span></td>';
        html += '</tr>';

        // third row (south player)
        html += '<tr><td></td>';
        for (let i = this.board.numOfHolesAndStones - 1; i >= 0; i--) {
            html += '<td><span class="hole" data-hole="' + i + '">' + this.board.holes[i].stones.length + '</span></td>';
        }
        html += '<td></td></tr>';

        html += '</table>';

        return html;
    }

    observeOnClickEvent() {
        const self = this;
        $('.hole').each((idx, elem) => {
            $(elem).click(() => {
                self.chooseHoleAndDistribute($(elem).data('hole'));
            });
        });
    }

    drawBoardUI() {
        $('#congklak').html(this.getBoardHtml());
        this.observeOnClickEvent();
    }

    drawFromQueue() {
        let counter = 0;
        console.log(this.queueDisplay);
        const start = new Date().getTime();
        console.log('start', start);
        const queueLength = this.queueDisplay.length;
        for (let i = 1; i <= queueLength; i++) {
            setTimeout(function() {
                let now = new Date().getTime();
                console.log(now - start, 'comp', i * 1000);
                if (now - start > i * 1000) {
                    let html = this.queueDisplay.shift();
                    console.log(html);
                    $('#congklak').html(html);
                }
            }.bind(this), 100);
        }
    }

    //============== main logic ==============//

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
        this.showMessage('Round is over! Round winner: ' + winner);
    }

    endGame(winner) {
        this.showMessage('Game is over! Game winner: ' + winner);
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

            this.printBoard();
        }

        // draw UI
        this.drawBoardUI();

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
            this.showMessage('You\'re landed in your store house. Continue.');
            // can choose another hole, currentPlayer stay the same
            // end game
            if (this.checkGameOverAndEnd()) {
                return;
            }
        } else if (lastHole.stones.length > 1) {
            // debug
            this.printBoard();
            this.drawBoardUI();
            // non empty holes, repeat
            // 2nd parameter indicating that it is not a human choice
            this.chooseHoleAndDistribute(lastHoleIndex, false);
        } else if (lastHole.stones.length === 1 && lastHole.player.id !== currentPlayer.id) {
            // end game or switch player
            if (this.checkGameOverAndEnd()) {
                return;
            }
            this.board.switchPlayer();
            this.showMessage('Switch player into: ' + this.board.getCurrentPlayer().id);
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
            } else {
                // end game or switch player
                if (this.checkGameOverAndEnd()) {
                    return;
                }
                this.board.switchPlayer();
                this.showMessage('Switch player into: ' + this.board.getCurrentPlayer().id);
            }
        }
    }
}

window.congklak = new Congklak();