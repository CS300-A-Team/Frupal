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
    get mapSize(){
        return this._mapSize;
    }
    initTileMeadow(x, y){
        let tile = this.getTile(x, y);
        if(tile == null || tile === undefined){
            this.addTile(Meadow, x, y, 1, '');          //if tile is not exist, add a meadow tile.
        }
    }
    setVisible(heroX, heroY){
        this.mapHash[heroX+','+heroY].Visited = 1; // 1 is visible
        if(heroX + 1 < this.mapSize){
            this.initTileMeadow(heroX + 1, heroY);
            this.mapHash[(heroX + 1)+','+heroY].Visited = 1;
        }
        if(heroX - 1 >= 0){
            this.initTileMeadow(heroX - 1, heroY);
            this.mapHash[(heroX - 1)+','+heroY].Visited = 1;
        }
        if(heroY + 1 < this.mapSize){
            this.initTileMeadow(heroX, heroY + 1);
            this.mapHash[heroX+','+(heroY + 1)].Visited = 1;
        }
        if(heroY - 1 >= 0){
            this.initTileMeadow(heroX, heroY - 1);
            this.mapHash[heroX+','+(heroY - 1)].Visited = 1;
        }
        if(heroX + 1 < this.mapSize && heroY + 1 < this.mapSize){
            this.initTileMeadow(heroX + 1, heroY + 1);
            this.mapHash[(heroX + 1)+','+(heroY + 1)].Visited = 1;
        }
        if(heroX - 1 >= 0 && heroY + 1 < this.mapSize){
            this.initTileMeadow(heroX - 1, heroY + 1);
            this.mapHash[(heroX - 1)+','+(heroY + 1)].Visited = 1;
        }
        if(heroX + 1 < this.mapSize && heroY - 1 >= 0){
            this.initTileMeadow(heroX + 1, heroY - 1);
            this.mapHash[(heroX + 1)+','+(heroY - 1)].Visited = 1;
        }
        if(heroX -1 >= 0 && heroY - 1 >= 0){
            this.initTileMeadow(heroX - 1, heroY - 1);
            this.mapHash[(heroX - 1)+','+(heroY - 1)].Visited = 1;
        }
    }

    //Should handle wrapping around the world.  X,Y being passed in should be the charModel location at the time
    getDirection(Dir, X, Y){
        var x = X;
        var y = Y;
        switch (Dir){
            case "N":
            y = Y + 1;
            if(y > (this.mapSize - 1)){
              y = 0;
            }
            break;


            case "S":
            y = Y - 1;
            if(y < 0){
                y = this.mapSize - 1;
            }
            break;


            case "W":
            x= X - 1;
            if(x < 0){
                x = this.mapSize - 1;
            }
            break;


            case "E":
            x = X + 1;
            if(x > (this.mapSize - 1)){
                x = 0;
            }
        }


        var tile =  this.mapHash[x+','+y];
        if( tile == null ) {
            this.initTileMeadow(x, y);
            tile = this.mapHash[x+','+y];
     }
     return tile;
    }

}
