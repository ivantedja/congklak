var assert = require('chai').assert

import Hole from '../src/model/Hole';
import Stone from '../src/model/Stone';
import Player from '../src/model/Player';

describe('test hole and stone', function() {
    var hole;

    beforeEach(function () {
        var player = new Player('south');
        hole = new Hole(player);
    });

    describe('test hole not store house', function() {
        it('should not a store house', function() {
            assert.isNotOk(hole.isStoreHouse, 'hole is not a store house');
        });
    });

    describe('test add stone', function() {
        it('should add 1 stone', function() {
            var stone = new Stone();
            hole.addStone(stone);
            assert.equal(hole.stones.length, 1);
        });
    });

    describe('test add stones and take all stones', function() {
        beforeEach(function () {
            var stones = [];
            for (var i = 0; i < 7; i++) {
                var stone = new Stone();
                stones.push(stone);
            }
            hole.addStones(stones);
        });
        it('should add 7 stones', function() {   
            assert.equal(hole.stones.length, 7);
        });
        it('should take all stones', function() {   
            var stonesTaken = hole.takeAllStones();
            assert.equal(stonesTaken.length, 7, 'stones taken 7');
            assert.equal(hole.stones.length, 0, '0 stone left in hole');
        });
    });

    describe('test hole belongs to player', function() {
        it('should belongs to player south', function() {
            assert.equal(hole.player.id, 'south');
        });
        it('should not belongs to player north', function() {
            assert.notEqual(hole.player.id, 'north');
        });
    });
});