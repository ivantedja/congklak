import Hole from './Hole';

class StoreHouse extends Hole {
    constructor(id) {
        super(id);
        this.isStoreHouse = true;
    }
}

export default StoreHouse;