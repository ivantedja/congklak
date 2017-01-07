var assert = require('chai').assert

import Congklak from '../src/App';
import Stone from '../src/model/Stone';

describe('test congklak app', function() {
    var congklak;

    beforeEach(function() {
        congklak = new Congklak();
    });

    it('it should game start', function() {
        assert.equal(congklak.gameStatus, 0);
    });

    describe('end round', function() {
        describe('last move south player, south player mati jalan', function() {
            beforeEach(function() {
                var mockStones = [0, 0, 0, 0, 0, 0, 0, 14, 12, 0, 4, 10, 5, 0, 0, 4];
                for (var i = 0; i < mockStones.length; i++) {
                    var stonesTmp = [];
                    for (var j = 0; j < mockStones[i]; j++) {
                        stonesTmp.push(new Stone());
                    }
                    congklak.board.holes[i].stones = stonesTmp;
                }
                congklak.board.currentPlayerIndex = 0;
                congklak.checkGameOverAndEnd();
            });
            it('it should end round', function() {
                assert.equal(congklak.gameStatus, 1);
            });
            it('next round should be north player', function() {
                assert.equal(congklak.board.getCurrentPlayer().id, 'north');
            });
            describe('force end game', function() {
                it('winner should be north player', function() {
                    var winner = congklak.forceEndGame();
                    assert.equal(winner, 'north');
                });
                it('game status should be game over (2)', function() {
                    congklak.forceEndGame();
                    assert.equal(congklak.gameStatus, 2);
                });
            });
        });
        describe('last move north player, south player mati jalan', function() {
            beforeEach(function() {
                var mockStones = [0, 0, 0, 0, 0, 0, 0, 14, 12, 0, 4, 10, 5, 0, 0, 4];
                for (var i = 0; i < mockStones.length; i++) {
                    var stonesTmp = [];
                    for (var j = 0; j < mockStones[i]; j++) {
                        stonesTmp.push(new Stone());
                    }
                    congklak.board.holes[i].stones = stonesTmp;
                }
                congklak.board.currentPlayerIndex = 1;
                congklak.checkGameOverAndEnd();
            });
            it('it should end round', function() {
                assert.equal(congklak.gameStatus, 1);
            });
            it('next round should be north player', function() {
                assert.equal(congklak.board.getCurrentPlayer().id, 'north');
            });
            describe('force end game', function() {
                it('winner should be north player', function() {
                    var winner = congklak.forceEndGame();
                    assert.equal(winner, 'north');
                });
                it('game status should be game over (2)', function() {
                    congklak.forceEndGame();
                    assert.equal(congklak.gameStatus, 2);
                });
            });
        });
        describe('south player mati jalan but south player point higher than north player', function() {
            beforeEach(function() {
                var mockStones = [0, 0, 0, 0, 0, 0, 0, 34, 2, 0, 4, 0, 5, 0, 0, 4];
                for (var i = 0; i < mockStones.length; i++) {
                    var stonesTmp = [];
                    for (var j = 0; j < mockStones[i]; j++) {
                        stonesTmp.push(new Stone());
                    }
                    congklak.board.holes[i].stones = stonesTmp;
                }
                congklak.board.currentPlayerIndex = 0;
                congklak.checkGameOverAndEnd();
            });
            it('it should end round', function() {
                assert.equal(congklak.gameStatus, 1);
            });
            it('next round should be north player', function() {
                assert.equal(congklak.board.getCurrentPlayer().id, 'north');
            });
            describe('force end game', function() {
                it('winner should be south player', function() {
                    var winner = congklak.forceEndGame();
                    assert.equal(winner, 'south');
                });
                it('game status should be game over (2)', function() {
                    congklak.forceEndGame();
                    assert.equal(congklak.gameStatus, 2);
                });
            });
        });
        describe('next round should reset game status', function() {
            beforeEach(function() {
                var mockStones = [0, 0, 0, 0, 0, 0, 0, 14, 12, 0, 4, 10, 5, 0, 0, 4];
                for (var i = 0; i < mockStones.length; i++) {
                    var stonesTmp = [];
                    for (var j = 0; j < mockStones[i]; j++) {
                        stonesTmp.push(new Stone());
                    }
                    congklak.board.holes[i].stones = stonesTmp;
                }
                congklak.board.currentPlayerIndex = 0;
                congklak.checkGameOverAndEnd();
            });
            it('it should end round', function() {
                assert.equal(congklak.gameStatus, 1);
            });
            it('next round should reset game status', function() {
                congklak.nextRound();
                assert.equal(congklak.gameStatus, 0);
            });
        });
    });

    describe('game over', function() {
        describe('south player win', function() {
            var winner;

            beforeEach(function() {
                var mockStones = [0, 0, 0, 0, 0, 0, 0, 44, 0, 0, 0, 0, 5, 0, 0, 0];
                for (var i = 0; i < mockStones.length; i++) {
                    var stonesTmp = [];
                    for (var j = 0; j < mockStones[i]; j++) {
                        stonesTmp.push(new Stone());
                    }
                    congklak.board.holes[i].stones = stonesTmp;
                }
                congklak.board.currentPlayerIndex = 0;
                winner = congklak.checkGameOverAndEnd();
            });
            it('it should end game', function() {
                assert.equal(congklak.gameStatus, 2);
            });
            it('winner should be south player', function() {
                assert.equal(winner, 'south');
            });
        });
        describe('north player win', function() {
            var winner;

            beforeEach(function() {
                var mockStones = [0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 44, 0, 0, 0];
                for (var i = 0; i < mockStones.length; i++) {
                    var stonesTmp = [];
                    for (var j = 0; j < mockStones[i]; j++) {
                        stonesTmp.push(new Stone());
                    }
                    congklak.board.holes[i].stones = stonesTmp;
                }
                congklak.board.currentPlayerIndex = 0;
                winner = congklak.checkGameOverAndEnd();
            });
            it('it should end game', function() {
                assert.equal(congklak.gameStatus, 2);
            });
            it('winner should be north player', function() {
                assert.equal(winner, 'north');
            });
        });
    });

    describe('choose hole and distribute', function() {
        describe('player south on the move', function() {
            it('should be player south turn', function() {
                assert.equal(congklak.board.getCurrentPlayer().id, 'south');
            });

            describe('landed on own store house', function() {
                it('game status should be on going (0)', function() {
                    congklak.chooseHoleAndDistribute(0);
                    assert.equal(congklak.gameStatus, 0);
                });
            });
            it('should skip north player store house, landed on non empty hole should continue, tembak', function() {
                congklak.chooseHoleAndDistribute(6);
                var holes = congklak.board.holes;
                var currentAllStones = [];
                for (var i = 0; i < holes.length; i++) {
                    currentAllStones.push(holes[i].stones.length);
                }
                var idealStones = [8, 8, 8, 8, 8, 8, 0, 10, 0, 8, 8, 8, 8, 0, 8, 0];
                assert.deepEqual(currentAllStones, idealStones);
            });
            describe('landed on opponent\'s empty place', function() {
                beforeEach(function() {
                    var mockStones = [8, 8, 8, 8, 8, 8, 0, 10, 0, 8, 8, 8, 8, 0, 8, 0];
                    for (var i = 0; i < mockStones.length; i++) {
                        var stonesTmp = [];
                        for (var j = 0; j < mockStones[i]; j++) {
                            stonesTmp.push(new Stone());
                        }
                        congklak.board.holes[i].stones = stonesTmp;
                    }
                });

                it('it should switch player', function() {
                    congklak.chooseHoleAndDistribute(0);
                    assert.equal(congklak.board.getCurrentPlayer().id, 'north');
                });
            });
            describe('landed on own empty place', function() {
                describe('opposite place not empty', function() {
                    beforeEach(function() {
                        var mockStones = [1, 4, 2, 0, 1, 7, 0, 33, 3, 6, 1, 6, 12, 2, 7, 13];
                        for (var i = 0; i < mockStones.length; i++) {
                            var stonesTmp = [];
                            for (var j = 0; j < mockStones[i]; j++) {
                                stonesTmp.push(new Stone());
                            }
                            congklak.board.holes[i].stones = stonesTmp;
                        }
                    });

                    it('it should tembak', function() {
                        var idealStones = [0, 0, 3, 1, 2, 8, 0, 37, 0, 6, 1, 6, 12, 2, 7, 13];
                        congklak.chooseHoleAndDistribute(0);
                        var holes = congklak.board.holes;
                        var currentAllStones = [];
                        for (var i = 0; i < holes.length; i++) {
                            currentAllStones.push(holes[i].stones.length);
                        }
                        assert.deepEqual(currentAllStones, idealStones);
                    });
                });

                describe('opposite place empty', function() {
                    beforeEach(function() {
                        var mockStones = [1, 4, 2, 0, 1, 7, 0, 36, 0, 6, 1, 6, 12, 2, 7, 13];
                        for (var i = 0; i < mockStones.length; i++) {
                            var stonesTmp = [];
                            for (var j = 0; j < mockStones[i]; j++) {
                                stonesTmp.push(new Stone());
                            }
                            congklak.board.holes[i].stones = stonesTmp;
                        }
                    });

                    it('it should not tembak, own stop hole should still exist', function() {
                        var idealStones = [0, 0, 3, 1, 2, 8, 1, 36, 0, 6, 1, 6, 12, 2, 7, 13];
                        congklak.chooseHoleAndDistribute(0);
                        var holes = congklak.board.holes;
                        var currentAllStones = [];
                        for (var i = 0; i < holes.length; i++) {
                            currentAllStones.push(holes[i].stones.length);
                        }
                        assert.deepEqual(currentAllStones, idealStones);
                    });
                });
            });
        });
    });
});