class Hole {
    constructor(player) {
        this.isStoreHouse = false;
        this.isBlocked = false;
        this.stones = [];
        this.player = player;
    }

    addStone(stone) {
        this.stones.push(stone);
    }

    addStones(stones) {
        this.stones = this.stones.concat(stones);
    }

    takeAllStones() {
        const stones = this.stones;
        this.stones = [];
        return stones;
    }
}

export default Hole;