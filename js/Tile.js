class Tile {

    constructor(X, Y, Visit, Ter, item){
        this.Terrain = Ter;
        this.xLoc = X;
        this.yLoc = Y;
        this.Visited = Visit;
        this.Item = item;
    }
}

const Meadow = 0;
const Forest = 1;
const Water = 2;
const Wall = 3;
const Bog = 4;
const Swamp = 5;
