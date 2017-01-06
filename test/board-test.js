var assert = require('chai').assert

import Board from '../src/model/Board';
import Stone from '../src/model/Stone';

describe('test board', function() {
    var board = new Board();

    describe('test initial stones in each hole', function() {
        var expectedStones = [7, 7, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 0];
        var i = 0;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });
        i++;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });
        i++;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });
        i++;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });
        i++;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });
        i++;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });
        i++;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });

        i++;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });

        i++;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });
        i++;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });
        i++;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });
        i++;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });
        i++;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });
        i++;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });
        i++;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });

        i++;
        it('there should be ' + expectedStones[i] + ' stones in hole ' + i, function() {
            assert.equal(board.holes[i].stones.length, expectedStones[i]);
        });
    });

    describe('test players', function() {
        it('there should be 2 players', function() {
            assert.equal(board.players.length, 2);
        });
        it('current player should be player south', function() {
            assert.equal(board.getCurrentPlayer().id, 'south');
        });
        it('swith player should become player north', function() {
            board.switchPlayer();
            assert.equal(board.getCurrentPlayer().id, 'north');
            board.switchPlayer();
        });
        it('double swith player should become player south again', function() {
            board.switchPlayer();
            board.switchPlayer();
            assert.equal(board.getCurrentPlayer().id, 'south');
        });
        describe('test empty holes', function() {
            describe('player south hole empty', function() {
                var boardTmp = new Board();
                var mockStones = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
                for (var i = 0; i < mockStones.length; i++) {
                    var stonesTmp = [];
                    for (var j = 0; j < mockStones[i]; j++) {
                        stonesTmp.push(new Stone());
                    }
                    boardTmp.holes[i].stones = stonesTmp;
                }
                it('player south hole should be empty', function() {
                    assert.isOk(boardTmp.isPlayerSouthHolesEmpty());
                });

                it('check any empty should swith to player north', function() {
                    boardTmp.isAnyPlayerHolesEmptyAndSetNextPlayer();
                    assert.equal(boardTmp.getCurrentPlayer().id, 'north');
                });
            });
            describe('player north hole empty', function() {
                var boardTmp = new Board();
                var mockStones = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1];
                for (var i = 0; i < mockStones.length; i++) {
                    var stonesTmp = [];
                    for (var j = 0; j < mockStones[i]; j++) {
                        stonesTmp.push(new Stone());
                    }
                    boardTmp.holes[i].stones = stonesTmp;
                }
                it('player north hole should be empty', function() {
                    assert.isOk(boardTmp.isPlayerNorthHolesEmpty());
                });

                it('check any empty should swith to player south', function() {
                    boardTmp.isAnyPlayerHolesEmptyAndSetNextPlayer();
                    assert.equal(boardTmp.getCurrentPlayer().id, 'south');
                });
            });
            describe('test cleanup', function() {
                it('no stones present in player south', function() {
                    var boardTmp = new Board();
                    boardTmp.cleanupStones();
                    assert.equal(boardTmp.holes[0].stones.length, 0);
                    assert.equal(boardTmp.holes[1].stones.length, 0);
                    assert.equal(boardTmp.holes[2].stones.length, 0);
                    assert.equal(boardTmp.holes[3].stones.length, 0);
                    assert.equal(boardTmp.holes[4].stones.length, 0);
                    assert.equal(boardTmp.holes[5].stones.length, 0);
                    assert.equal(boardTmp.holes[6].stones.length, 0);
                });
                it('no stones present in player north', function() {
                    var boardTmp = new Board();
                    boardTmp.cleanupStones();
                    assert.equal(boardTmp.holes[8].stones.length, 0);
                    assert.equal(boardTmp.holes[9].stones.length, 0);
                    assert.equal(boardTmp.holes[10].stones.length, 0);
                    assert.equal(boardTmp.holes[11].stones.length, 0);
                    assert.equal(boardTmp.holes[12].stones.length, 0);
                    assert.equal(boardTmp.holes[13].stones.length, 0);
                    assert.equal(boardTmp.holes[14].stones.length, 0);
                });
                it('there should be 49 stones in player south store house', function() {
                    var boardTmp = new Board();
                    boardTmp.cleanupStones();
                    assert.equal(boardTmp.getPlayerSouthStoreHouse().stones.length, 49);
                });
                it('there should be 49 stones in player south store house', function() {
                    var boardTmp = new Board();
                    boardTmp.cleanupStones();
                    assert.equal(boardTmp.getPlayerNorthStoreHouse().stones.length, 49);
                });
            });
        });
    });

    describe('test holes', function() {
        it('there should be 16 holes', function() {
            assert.equal(board.holes.length, 16);
        });

        describe('test holes belongs to', function() {
            describe('player south', function() {
                it('hole index 0 should belongs to player south', function() {
                    assert.equal(board.holes[0].player.id, 'south');
                });
                it('hole index 1 should belongs to player south', function() {
                    assert.equal(board.holes[1].player.id, 'south');
                });
                it('hole index 2 should belongs to player south', function() {
                    assert.equal(board.holes[2].player.id, 'south');
                });
                it('hole index 3 should belongs to player south', function() {
                    assert.equal(board.holes[3].player.id, 'south');
                });
                it('hole index 4 should belongs to player south', function() {
                    assert.equal(board.holes[4].player.id, 'south');
                });
                it('hole index 5 should belongs to player south', function() {
                    assert.equal(board.holes[5].player.id, 'south');
                });
                it('hole index 6 should belongs to player south', function() {
                    assert.equal(board.holes[6].player.id, 'south');
                });
            });
            describe('player north', function() {
                it('hole index 8 should belongs to player north', function() {
                    assert.equal(board.holes[8].player.id, 'north');
                });
                it('hole index 9 should belongs to player north', function() {
                    assert.equal(board.holes[9].player.id, 'north');
                });
                it('hole index 10 should belongs to player north', function() {
                    assert.equal(board.holes[10].player.id, 'north');
                });
                it('hole index 11 should belongs to player north', function() {
                    assert.equal(board.holes[11].player.id, 'north');
                });
                it('hole index 12 should belongs to player north', function() {
                    assert.equal(board.holes[12].player.id, 'north');
                });
                it('hole index 13 should belongs to player north', function() {
                    assert.equal(board.holes[13].player.id, 'north');
                });
                it('hole index 14 should belongs to player north', function() {
                    assert.equal(board.holes[14].player.id, 'north');
                });
            });
        });

        describe('test next hole for player south', function() {
            it('next hole for hole index 0 should be 1', function() {
                assert.equal(board.getNextHoleIndex(0), 1);
            });
            it('next hole for hole index 1 should be 2', function() {
                assert.equal(board.getNextHoleIndex(1), 2);
            });
            it('next hole for hole index 2 should be 3', function() {
                assert.equal(board.getNextHoleIndex(2), 3);
            });
            it('next hole for hole index 3 should be 4', function() {
                assert.equal(board.getNextHoleIndex(3), 4);
            });
            it('next hole for hole index 4 should be 5', function() {
                assert.equal(board.getNextHoleIndex(4), 5);
            });
            it('next hole for hole index 5 should be 6', function() {
                assert.equal(board.getNextHoleIndex(5), 6);
            });
            it('next hole for hole index 6 should be 7', function() {
                assert.equal(board.getNextHoleIndex(6), 7);
            });
            it('next hole for hole index 7 should be 8', function() {
                assert.equal(board.getNextHoleIndex(7), 8);
            });
            it('next hole for hole index 8 should be 9', function() {
                assert.equal(board.getNextHoleIndex(8), 9);
            });
            it('next hole for hole index 9 should be 10', function() {
                assert.equal(board.getNextHoleIndex(9), 10);
            });
            it('next hole for hole index 10 should be 11', function() {
                assert.equal(board.getNextHoleIndex(10), 11);
            });
            it('next hole for hole index 11 should be 12', function() {
                assert.equal(board.getNextHoleIndex(11), 12);
            });
            it('next hole for hole index 12 should be 13', function() {
                assert.equal(board.getNextHoleIndex(12), 13);
            });
            it('next hole for hole index 13 should be 14', function() {
                assert.equal(board.getNextHoleIndex(13), 14);
            });
            it('next hole for hole index 14 should be 15', function() {
                assert.equal(board.getNextHoleIndex(14), 0);
            });
            it('next hole for hole index 15 should be 0', function() {
                assert.equal(board.getNextHoleIndex(15), 0);
            });
            it('next hole for hole index 16 should be 0? (out of bound though)', function() {
                assert.equal(board.getNextHoleIndex(16), 0);
            });
        });

        describe('test next hole for player north', function() {
            it('next hole for hole index 0 should be 1', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(0), 1);
                board.switchPlayer();
            });
            it('next hole for hole index 1 should be 2', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(1), 2);
                board.switchPlayer();
            });
            it('next hole for hole index 2 should be 3', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(2), 3);
                board.switchPlayer();
            });
            it('next hole for hole index 3 should be 4', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(3), 4);
                board.switchPlayer();
            });
            it('next hole for hole index 4 should be 5', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(4), 5);
                board.switchPlayer();
            });
            it('next hole for hole index 5 should be 6', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(5), 6);
                board.switchPlayer();
            });
            it('next hole for hole index 6 should be 7', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(6), 8);
                board.switchPlayer();
            });
            it('next hole for hole index 7 should be 8', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(7), 8);
                board.switchPlayer();
            });
            it('next hole for hole index 8 should be 9', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(8), 9);
                board.switchPlayer();
            });
            it('next hole for hole index 9 should be 10', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(9), 10);
                board.switchPlayer();
            });
            it('next hole for hole index 10 should be 11', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(10), 11);
                board.switchPlayer();
            });
            it('next hole for hole index 11 should be 12', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(11), 12);
                board.switchPlayer();
            });
            it('next hole for hole index 12 should be 13', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(12), 13);
                board.switchPlayer();
            });
            it('next hole for hole index 13 should be 14', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(13), 14);
                board.switchPlayer();
            });
            it('next hole for hole index 14 should be 15', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(14), 15);
                board.switchPlayer();
            });
            it('next hole for hole index 15 should be 0', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(15), 0);
                board.switchPlayer();
            });
            it('next hole for hole index 16 should be 0? (out of bound though)', function() {
                board.switchPlayer();
                assert.equal(board.getNextHoleIndex(16), 0);
                board.switchPlayer();
            });
        });

        describe('test opposite hole', function() {
            it('next hole for hole index 0 should be 14', function() {
                assert.equal(board.getOppositeHoleIndex(0), 14);
            });
            it('next hole for hole index 1 should be 13', function() {
                assert.equal(board.getOppositeHoleIndex(1), 13);
            });
            it('next hole for hole index 2 should be 12', function() {
                assert.equal(board.getOppositeHoleIndex(2), 12);
            });
            it('next hole for hole index 3 should be 11', function() {
                assert.equal(board.getOppositeHoleIndex(3), 11);
            });
            it('next hole for hole index 4 should be 10', function() {
                assert.equal(board.getOppositeHoleIndex(4), 10);
            });
            it('next hole for hole index 5 should be 9', function() {
                assert.equal(board.getOppositeHoleIndex(5), 9);
            });
            it('next hole for hole index 6 should be 8', function() {
                assert.equal(board.getOppositeHoleIndex(6), 8);
            });
            it('next hole for hole index 8 should be 6', function() {
                assert.equal(board.getOppositeHoleIndex(8), 6);
            });
            it('next hole for hole index 9 should be 5', function() {
                assert.equal(board.getOppositeHoleIndex(9), 5);
            });
            it('next hole for hole index 10 should be 4', function() {
                assert.equal(board.getOppositeHoleIndex(10), 4);
            });
            it('next hole for hole index 11 should be 3', function() {
                assert.equal(board.getOppositeHoleIndex(11), 3);
            });
            it('next hole for hole index 12 should be 2', function() {
                assert.equal(board.getOppositeHoleIndex(12), 2);
            });
            it('next hole for hole index 13 should be 1', function() {
                assert.equal(board.getOppositeHoleIndex(13), 1);
            });
            it('next hole for hole index 14 should be 0', function() {
                assert.equal(board.getOppositeHoleIndex(14), 0);
            });
        });
    });

    describe('test store house', function() {
        it('store house player south should be index 7', function() {
            assert.equal(board.getPlayerSouthStoreHouseIndex(), 7);
        });
        it('store house player south should be index 15', function() {
            assert.equal(board.getPlayerNorthStoreHouseIndex(), 15);
        });

        describe('test holes belongs to', function() {
            it('hole index 7 should belongs to player south', function() {
                assert.equal(board.getPlayerSouthStoreHouse().player.id, 'south');
            });
            it('hole index 15 should belongs to player north', function() {
                assert.equal(board.getPlayerNorthStoreHouse().player.id, 'north');
            });
        });
    });
});