class mapModel{

    //THe parameters of the constructor can (and likely will) be changed
    constructor(){
        this.mapHash = new Object();
        this.name = '';
        this.mapSize = 0;
        // The royalDiamonds have strange requirements about them. The relevant user
        // story specifically describes them as having "coordinates", and not being
        // like another item. The map file Warren supplied doesn't include royal 
        // diamonds, but the requirements also say that a map is corrupt if it doesn't
        // include diamonds. Anyway, for now, I'm just placing them as a special, 
        // item-like thing.
        this.royalDiamondsX = -1;
        this.royalDiamondsY = -1;
    }

    addTile(X, Y, Visit, Ter, Item){
       if(this.mapHash[X+','+Y] === undefined) {
            this.mapHash[X + ',' + Y] = new Tile(X, Y, Visit, Ter, Item);
        }else{
            this.modTile(X, Y, Visit, Ter, Item);
        }

        if (Item === "Royal Diamonds"){
            // This Tile contains the Diamonds, so record these special coordinates
            this.royalDiamondsX = X;
            this.royalDiamondsY = Y;
        }
    }

    modTile(X, Y, Visit, Ter, Item){
        this.mapHash[X+','+Y].xLoc = X;
        this.mapHash[X+','+Y].yLoc = Y;
        this.mapHash[X+','+Y].Terrain = Ter;
        this.mapHash[X+','+Y].Visited = Visit;
        this.mapHash[X+','+Y].Item = Item;
    }

    getTile(X, Y){
        if( this.mapHash[X+','+Y] === undefined ) {
            this.initTileMeadow(X,Y);
        }
        return this.mapHash[X+','+Y];
    }

    initTileMeadow(x, y){
        this.addTile(x, y, 0, Meadow, '');
    }
    setVisible(heroX, heroY){
        this.getTile(heroX, heroY).Visited = 1; // 1 is visible
        //REVEALS TILE TO THE RIGHT
        if(heroX + 1 < this.mapSize){
            this.getTile(heroX + 1, heroY).Visited = 1;
            //WRAPS RIGHT TILE IF HERO IS ON FAR RIGHT EDGE OF MAP
        }else if(heroX + 1 >= this.mapSize){
            this.getTile(0, heroY);
        }
        //REVEALS TILE TO LEFT OF HERO
        if(heroX - 1 >= 0){
            this.getTile(heroX - 1, heroY).Visited = 1;
            //WRAPS LEFT TILE IF HERO IS ON FAR LEFT EDGE OF MAP
        }else if(heroX -1 < 0){
            this.getTile(this.mapSize - 1, heroY).Visited = 1;
        }
        //REVEALS TILE ABOVE HERO
        if(heroY + 1 < this.mapSize){
            this.getTile(heroX, heroY + 1).Visited = 1;
            //WRAPS TILE ABOVE HERO TO THE BOTTOM IF HERO IS ON TOP EDGE OF MAP
        }else if(heroY + 1 >= this.mapSize){
            this.getTile(heroX, 0).Visited = 1;
        }
        //REVEALS TILE BELOW HERO
        if(heroY - 1 >= 0){
            this.getTile(heroX, heroY - 1).Visited = 1;
            //WRAPS TILE BELOW HERO TO THE TOP IF THE HERO IS ON THE BOTTOM EDGE OF THE MAP
        }else if(heroY - 1 < 0){
            this.getTile(heroX, this.mapSize -1).Visited = 1;
        }
        //REVEALS TILE TO THE TOP RIGHT OF HERO
        if(heroX + 1 < this.mapSize && heroY + 1 < this.mapSize){
            this.getTile(heroX + 1, heroY + 1).Visited = 1;
            //REVEALS 0,0 IF HERO IS IN TOP RIGHT CORNER OF MAP
        }else if(heroX + 1 >= this.mapSize && heroY + 1 >= this.mapSize){
            this.getTile(0 ,0).Visited = 1;
            //WRAPS TILE TO BOTTOM
        }else if(heroX + 1 < this.mapSize && heroY + 1 >= this.mapSize){
            this.getTile(heroX + 1, 0).Visited = 1;
            //WRAPS TILE TO OTHER SIDE
        }else if(heroX + 1 >= this.mapSize && heroY + 1 < this.mapSize){
            this.getTile(0, heroY +1).Visited = 1;
        }

        //REVEALS TILE TO THE TOP LEFT OF HERO
        if(heroX - 1 >= 0 && heroY + 1 < this.mapSize){
            this.getTile(heroX - 1, heroY + 1).Visited = 1;
            //REVEALS mapSize - 1, 0 IF HERO IS IN TOP LEFT CORNER
        }else if(heroX - 1 < 0 && heroY + 1 >= this.mapSize){
            this.getTile(this.mapSize -1, 0).Visited = 1;
            //WRAPS TILE TO BOTTOM
        }else if(heroX - 1 > 0 && heroY + 1 >= this.mapSize){
            this.getTile(heroX - 1, 0).Visited = 1;
            //WRAPS TILE TO OTHER SIDE
        }else if(heroX -1 < 0 && heroY + 1 < this.mapSize){
            this.getTile(this.mapSize -1, heroY + 1).Visited = 1;
        }


        //REVEALS TILE TO BOTTOM RIGHT OF HERO
        if(heroX + 1 < this.mapSize && heroY - 1 >= 0){
            this.getTile(heroX + 1, heroY - 1).Visited = 1;
            //REVEALS 0,mapSize -1 IF THE HERO IS IN THE BOTTOM RIGHT CORNER
        }else if(heroX + 1 >= this.mapSize && heroY - 1 < 0){
            this.getTile(0, this.mapSize -1).Visited = 1;
            //WRAPS TILE TO TOP
        }else if(heroX + 1 < this.mapSize && heroY - 1 < 0){
            this.getTile(heroX + 1, this.mapSize -1).Visited = 1;
            //WRAPS TILE TO OTHER SIDE
        }else if(heroX + 1 >= this.mapSize && heroY - 1 >= 0){
            this.getTile(0 , heroY -1).Visited = 1;
        }



        //REVEALS TILE TO BOTTOM LEFT OF HERO
        if(heroX -1 >= 0 && heroY - 1 >= 0){
            this.getTile(heroX - 1, heroY - 1).Visited = 1;
            //REVEALS TOP RIGHT CORNER IF HERO IS IN BOTTOM LEFT CORNER
        }else if(heroX -1 < 0 && heroY - 1 < 0){
            this.getTile(this.mapSize - 1, this.mapSize - 1).Visited = 1;
            //WRAPS TILE TO TOP
        }else if(heroX - 1 > 0 && heroY - 1 < 0){
            this.getTile(heroX - 1, this.mapSize -1).Visited = 1;
            //WRAPS TILE TO OTHER SIDE
        }else if(heroX - 1 < 0 && heroY - 1 >= 0){
            this.getTile(this.mapSize -1, heroY -1).Visited = 1;
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
     return this.getTile(x,y);
    }
}
