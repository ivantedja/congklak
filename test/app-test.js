var assert = require('chai').assert

import Congklak from '../src/App';

describe('test congklak app', function() {
    var congklak = new Congklak();

    // checkGameOverAndEnd
    // endRound
    // endGame
    // forceEndGame
    // nextRound
    // chooseHoleAndDistribute
    //   - own store house
    //   - skip other store house
    //   - non empty hole -> run again
    //   - empty, opponent's place -> switch
    //   - empty, own place
    //       - opponent not empty -> tembak
    //       - opponent empty -> stop, stone still exist

    describe('game over', function() {
        it('it should game over', function() {
        });
    });
});