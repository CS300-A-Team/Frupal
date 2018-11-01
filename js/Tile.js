class Tile {
    constructor(Ter, X, Y, Visit, item){
        this.Terrain = Ter;
        this.xLoc = X;
        this.yLoc = Y;
        this.Visited = Visit;
        this.Item = item;
    }
//GETTERS
    get Terrain(){
        return this._Terrain;
    }
    get xLoc(){
        return this._X;
    }
    get yLoc(){
        return this._Y;
    }
    get Visited(){
        return this._Visited;
    }
    get Item(){
        return this._Item;
    }
//SETTERS
    set Terrain(Ter){
        this._Terrain = Ter;
    }
    set xLoc(num){
        this._X = num;
    }
    set yLoc(num){
        this._Y = num;
    }
    set Visited(bool){
        this._Visited = bool;
    }
    set Item(item){
        this._Item = item;
    }
}

const Meadow = 0;
const Forest = 1;
const Water = 2;
const Wall = 3;
const Bog = 4;
const Swamp = 5;
