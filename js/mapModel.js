class mapModel{

    //THe parameters of the constructor can (and likely will) be changed
    constructor(size){
        this.mapHash = new Object();
        this.mapSize = size;
    }

    addTile(Ter, X, Y, Visit, Item){
       if(this.mapHash[X+','+Y] === undefined) {
            this.mapHash[X + ',' + Y] = new Tile(Ter, X, Y, Visit, Item);
        }else{
            this.modTile(Ter, X, Y, Visit, Item);
        }
    }

    modTile(Ter, X, Y, Visit, Item){
        this.mapHash[X+','+Y].xLoc = X;
        this.mapHash[X+','+Y].yLoc = Y;
        this.mapHash[X+','+Y].Terrain = Ter;
        this.mapHash[X+','+Y].Visited = Visit;
        this.mapHash[X+','+Y].Item = Item;
    }

    getTile(X, Y){
        return this.mapHash[X+','+Y];
    }

    //Setter and Getter for mapSize
    set mapSize(newSize){
        this._mapSize = newSize;
    }
    get mapSize() {
        return this._mapSize;
    }
    setVisible(heroX, heroY){
        this.mapHash[(heroX + 1)+','+heroY].Visited = 1; // 1 is visible
        if(heroX + 1 < this.mapSize){       //
            this.mapHash[(heroX + 1)+','+heroY].Visited = 1; // 1 is visible
        }
        if(heroX - 1 >= 0){
            this.mapHash[(heroX - 1)+','+heroY].Visited = 1; // 1 is visible
        }
        if(heroY + 1 < this.mapSize){       //
            this.mapHash[heroX+','+(heroY + 1)].Visited = 1; // 1 is visible
        }
        if(heroY - 1 >= 0){
            this.mapHash[heroX+','+(heroY - 1)].Visited = 1; // 1 is visible
        }
        if(heroX + 1 < this.mapSize && heroY + 1 < this.mapSize){
            this.mapHash[(heroX + 1)+','+(heroY + 1)].Visited = 1;
        }
        if(heroX - 1 >= 0 && heroY + 1 < this.mapSize){
            this.mapHash[(heroX - 1)+','+(heroY + 1)].Visited = 1;
        }
        if(heroX + 1 < this.mapSize && heroY - 1 >= 0){
            this.mapHash[(heroX + 1)+','+(heroY - 1)].Visited = 1;
        }
        if(heroX -1 >= 0 && heroY - 1 >= 0){
            this.mapHash[(heroX - 1)+','+(heroY - 1)].Visited = 1;
        }
    }

    //Should handle wrapping around the world.  X,Y being passed in should be the charModel location at the time
    getDirection(Dir, X, Y){
        if(Dir == "N"){
            var norY = Y + 1;
            if(norY > (this.mapSize - 1)){
              norY = 0;
            }
            return this.mapHash[X+','+norY];
        }

        if(Dir == "S"){
            var souY = Y - 1;
            if(souY < 0){
                souY = this.mapSize - 1;
            }
            return this.mapHash[X+','+souY];
        }

        if(Dir == "W"){
            var wesX = X - 1;
            if(wesX < 0){
                wesX = this.mapSize - 1;
            }
            return this.mapHash[wesX+','+Y];
        }

        if(Dir == "E"){
            var easX = X + 1;
            if(easX > (this.mapSize - 1)){
                easX = 0;
            }
            return this.mapHash[easX+','+Y];
        }

    }

}