class Tile {
    class Tile {
    var Terrain;
    var xLoc;
    var yLoc;
    var Visited;
    var Item;
    cosntructor(Ter, X, Y, Visit, Item){
        this.Terrain = Ter;
        this.X = xLoc;
        this.Y = yLoc;
        this.Visited = Visit;
        this.Item = Item;
    }
//GETTERS
    get Terrain(){
        return this.Terrain;
    }
    get xLoc(){
        return this.xLoc;
    }
    get yLoc(){
        return this.yLoc;
    }
    get Visited(){
        return this.Visited;
    }
    get Item(){
        return this.Item;
    }
//SETTERS
    set Terrain(Ter){
        this.Terrain = Ter;
    }
    set xLoc(num){
        this.xLoc = num;
    }
    set yLoc(num){
        this.yLoc = num;
    }
    set Visited(bool){
        this.Visited = bool;
    }
    set Item(item){
        this.Item = item;
    }
}

