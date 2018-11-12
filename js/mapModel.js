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
        this.addTile(x, y, 0, Meadow, 'None');
    }

    // function that wraps a coordinate around the edges of the map, both when too high or too low
    wrap(coordinate) {
        if (coordinate < 0) {
            return coordinate + this.mapSize;
        } else if (coordinate >= this.mapSize) {
            return coordinate - this.mapSize;
        } else {
            return coordinate;
        }
    }

    setVisible(heroX, heroY, range){
        // Sight range is currently always 1, but binoculars could give us a bigger sight range
        let sightRange = range;
        // Set every tile within sight range of the hero to Visited (visible).
        for (let i = heroX - sightRange; i <= heroX + sightRange; i ++) {
            for (let j = heroY - sightRange; j <= heroY + sightRange; j ++) {
                this.getTile(this.wrap(i), this.wrap(j)).Visited = 1;
            }
        }
    }

    //Should handle wrapping around the world.  X,Y being passed in should be the charModel location at the time
    getDirection(Dir, X, Y){
        var x = X;
        var y = Y;
        switch (Dir){
            case "N":
            y = Y + 1;
            break;

            case "S":
            y = Y - 1;
            break;

            case "W":
            x= X - 1;
            break;

            case "E":
            x = X + 1;
        }
        return this.getTile(this.wrap(x), this.wrap(y));
    }
}
