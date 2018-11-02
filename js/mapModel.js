class mapModel{

    //THe parameters of the constructor can (and likely will) be changed
    constructor(size){
        this.mapHash = new Object();
        this.mapSize = size;
        // The royalDiamonds have strange requirements about them. The relevant user
        // story specifically describes them as having "coordinates", and not being
        // like another item. The map file Warren supplied doesn't include royal 
        // diamonds, but the requirements also say that a map is corrupt if it doesn't
        // include diamonds. Anyway, for now, I'm just placing them as a special, 
        // item-like thing at (3,2).
        this.royalDiamondsX = 3;
        this.royalDiamondsY = 2;
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
        //REVEALS TILE TO THE RIGHT
        if(heroX + 1 < this.mapSize){
            this.initTileMeadow(heroX + 1, heroY);
            this.mapHash[(heroX + 1)+','+heroY].Visited = 1;
            //WRAPS RIGHT TILE IF HERO IS ON FAR RIGHT EDGE OF MAP
        }else if(heroX + 1 >= this.mapSize){
            this.initTileMeadow(0, heroY);
            this.mapHash[0+','+heroY].Visited = 1;
        }
        //REVEALS TILE TO LEFT OF HERO
        if(heroX - 1 >= 0){
            this.initTileMeadow(heroX - 1, heroY);
            this.mapHash[(heroX - 1)+','+heroY].Visited = 1;
            //WRAPS LEFT TILE IF HERO IS ON FAR LEFT EDGE OF MAP
        }else if(heroX -1 < 0){
            this.initTileMeadow(this.mapSize - 1, heroY);
            this.mapHash[(this.mapSize -1)+','+heroY].Visited = 1;
        }
        //REVEALS TILE ABOVE HERO
        if(heroY + 1 < this.mapSize){
            this.initTileMeadow(heroX, heroY + 1);
            this.mapHash[heroX+','+(heroY + 1)].Visited = 1;
            //WRAPS TILE ABOVE HERO TO THE BOTTOM IF HERO IS ON TOP EDGE OF MAP
        }else if(heroY + 1 >= this.mapSize){
            this.initTileMeadow(heroX, 0);
            this.mapHash[heroX+','+0].Visited = 1;
        }
        //REVEALS TILE BELOW HERO
        if(heroY - 1 >= 0){
            this.initTileMeadow(heroX, heroY - 1);
            this.mapHash[heroX+','+(heroY - 1)].Visited = 1;
            //WRAPS TILE BELOW HERO TO THE TOP IF THE HERO IS ON THE BOTTOM EDGE OF THE MAP
        }else if(heroY - 1 < 0){
            this.initTileMeadow(heroX, this.mapSize -1);
            this.mapHash[heroX+','+(this.mapSize -1)].Visited = 1;
        }
        //REVEALS TILE TO THE TOP RIGHT OF HERO
        if(heroX + 1 < this.mapSize && heroY + 1 < this.mapSize){
            this.initTileMeadow(heroX + 1, heroY + 1);
            this.mapHash[(heroX + 1)+','+(heroY + 1)].Visited = 1;
            //REVEALS 0,0 IF HERO IS IN TOP RIGHT CORNER OF MAP
        }else if(heroX + 1 >= this.mapSize && heroY + 1 >= this.mapSize){
            this.initTileMeadow(0 ,0);
            this.mapHash[0+','+0].Visited = 1;
            //WRAPS TILE TO LEFT SIDE IF HERO IS ON RIGHT EDGE OF MAP
        }else if(heroX + 1 >= this.mapSize && heroY + 1 < this.mapSize){
            this.initTileMeadow(0, heroY + 1);
            this.mapHash[0 + ',' + (heroY + 1)].Visited = 1;
        }
        //REVEALS TILE TO THE TOP LEFT OF HERO
        if(heroX - 1 >= 0 && heroY + 1 < this.mapSize){
            this.initTileMeadow(heroX - 1, heroY + 1);
            this.mapHash[(heroX - 1)+','+(heroY + 1)].Visited = 1;
            //REVEALS mapSize - 1, 0 IF HERO IS IN TOP LEFT CORNER
        }else if(heroX - 1 < 0 && heroY + 1 >= this.mapSize){
            this.initTileMeadow(this.mapSize -1, 0);
            this.mapHash[(this.mapSize -1)+','+0].Visited = 1;
            //WRAPS TILE TO RIGHT SIDE IF HERO IS ON LEFT EDGE OF MAP
        }else if(heroX - 1 < 0 && heroY + 1 < this.mapSize){
            this.initTileMeadow(this.mapSize - 1, heroY + 1);
            this.mapHash[(this.mapSize -1)+','+(heroY + 1)].Visited = 1;
        }
        //REVEALS TILE TO BOTTOM RIGHT OF HERO
        if(heroX + 1 < this.mapSize && heroY - 1 >= 0){
            this.initTileMeadow(heroX + 1, heroY - 1);
            this.mapHash[(heroX + 1)+','+(heroY - 1)].Visited = 1;
            //REVEALS 0,mapSize -1 IF THE HERO IS IN THE BOTTOM RIGHT CORNER
        }else if(heroX + 1 >= this.mapSize && heroY - 1 < 0){
            this.initTileMeadow(0, this.mapSize -1);
            this.mapHash[0+','+(this.mapSize - 1)].Visited = 1;
            //WRAPS TILE TO LEFT SIDE IF HERO ON RIGHT EDGE OF MAP
        }else if(heroX + 1 >= this.mapSize && heroY - 1 >= 0){
            this.initTileMeadow(0, heroY - 1);
            this.mapHash[0+','+(heroY -1)].Visited = 1;
        }
        //REVEALS TILE TO BOTTOM LEFT OF HERO
        if(heroX -1 >= 0 && heroY - 1 >= 0){
            this.initTileMeadow(heroX - 1, heroY - 1);
            this.mapHash[(heroX - 1)+','+(heroY - 1)].Visited = 1;
            //REVEALS TOP RIGHT CORNER IF HERO IS IN BOTTOM LEFT CORNER
        }else if(heroX -1 < 0 && heroY - 1 < 0){
            this.initTileMeadow(this.mapSize - 1, this.mapSize - 1);
            this.mapHash[(this.mapSize -1)+','+(this.mapSize-1)].Visited = 1;
            //WRAPS TILE TO RIGHT SIDE IF HERO IS ON LEFT EDGE OF MAP
        }else if(heroX - 1 < 0 && heroY - 1 >= 0){
            this.initTileMeadow(this.mapSize - 1, heroY -1);
            this.mapHash[(this.mapSize -1)+','+(heroY -1)].Visited = 1;
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
