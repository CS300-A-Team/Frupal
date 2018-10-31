class mapModel{

    //THe parameters of the constructor can (and likely will) be changed
    constructor(size){
        this.mapHash = new Object();
        this.mapSize = size;
    }

    addTile(Ter, X, Y, Visit, Item){
        this.mapHash[X+','+Y] = new Tile(Ter, X, Y, Visit, Item);
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


    //Should handle wrapping around the world.  X,Y being passed in should be the charModel location at the time
    //Based upon the idea that 0,0 is the bottom left corner of the map
    getDirection(Dir, X, Y){
        if(Dir == "N"){
            var norY = Y + 1;
            if(norY > this.mapSize){
              norY = 0;
            }
            return this.mapHash[X+','+norY];
        }

        if(Dir == "S"){
            var souY = Y - 1;
            if(souY < 0){
                souY = this.mapSize;
            }
            return this.mapHash[X+','+souY];
        }

        if(Dir == "W"){
            var wesX = X - 1;
            if(wesX < 0){
                wesX = this.mapSize;
            }
            return this.mapHash[wesX+','+Y];
        }

        if(Dir == "E"){
            var easX = X + 1;
            if(easX > this.mapSize){
                easX = 0;
            }
            return this.mapHash[easX+','+Y];
        }

    }

}