var assert = require('chai').assert

import StoreHouse from '../src/model/StoreHouse';
import Player from '../src/model/Player';

describe('test store house', function() {
    describe('test store house is a store house', function() {
        it('it is a store house', function() {
            var storeHouse = new StoreHouse();
            assert.isOk(storeHouse.isStoreHouse);
        });
    });

    describe('test hole belongs to player', function() {
        var player = new Player('south');
        it('should belongs to player south', function() {
            var storeHouse = new StoreHouse(player);

            assert.equal(storeHouse.player.id, 'south');
        });
        it('should not belongs to player north', function() {
            var storeHouse = new StoreHouse(player);

            assert.notEqual(storeHouse.player.id, 'north');
        });
    });
});