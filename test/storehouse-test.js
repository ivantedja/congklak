var assert = require('chai').assert

import StoreHouse from '../src/model/StoreHouse';
import Player from '../src/model/Player';

describe('test store house', function() {
    var storeHouse;

    beforeEach(function () {
        var player = new Player('south');
        storeHouse = new StoreHouse(player);
    });

    describe('test store house is a store house', function() {
        it('it is a store house', function() {
            assert.isOk(storeHouse.isStoreHouse);
        });
    });

    describe('test hole belongs to player', function() {
        it('should belongs to player south', function() {
            assert.equal(storeHouse.player.id, 'south');
        });
        it('should not belongs to player north', function() {
            assert.notEqual(storeHouse.player.id, 'north');
        });
    });
});