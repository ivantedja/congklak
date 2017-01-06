var assert = require('chai').assert

import Hole from '../src/model/Hole';
import Stone from '../src/model/Stone';
import Player from '../src/model/Player';

describe('test hole and stone', function() {
    describe('test hole not store house', function() {
        it('should not a store house', function() {
            var hole = new Hole();

            assert.isNotOk(hole.isStoreHouse, 'hole is not a store house');
        });
    });

    describe('test add stone', function() {
        it('should add 1 stone', function() {
            var stone = new Stone();
            var hole = new Hole();

            hole.addStone(stone);

            assert.equal(hole.stones.length, 1);
        });
    });

    describe('test add stones and take all stones', function() {
        var stones = [];
        var totalStone = 7;
        for (var i = 0; i < totalStone; i++) {
            var stone = new Stone();
            stones.push(stone);
        }
        var hole = new Hole();
        it('should add ' + totalStone + ' stones', function() {   
            hole.addStones(stones);
            assert.equal(hole.stones.length, totalStone);
        });
        it('should take all stones', function() {   
            var stonesTaken = hole.takeAllStones();
            assert.equal(stonesTaken.length, totalStone, 'stones taken ' + totalStone);
            assert.equal(hole.stones.length, 0, '0 stone left in hole');
        });
    });

    describe('test hole belongs to player', function() {
        var player = new Player('south');
        it('should belongs to player south', function() {
            var hole = new Hole(player);

            assert.equal(hole.player.id, 'south');
        });
        it('should not belongs to player north', function() {
            var hole = new Hole(player);

            assert.notEqual(hole.player.id, 'north');
        });
    });
});