class Hole {
    constructor(player) {
        this.isStoreHouse = false;
        this.stones = [];
        this.player = player;
    }

    addStones(stones) {
        this.stones = this.stones.concat(stones);
    }

    getNumOfStones() {
        return this.stones.length;
    }

    markPlayer(player) {
        this.player = player;
    }
}

export default Hole;