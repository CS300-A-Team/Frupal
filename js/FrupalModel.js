class FrupalModel{
    constructor(obj){

        this.mapmodel = new mapModel;
        this.charModel = new CharModel;
        this.messagemodel = new MessageModel;
        if( obj === undefined )
            return;
        // Handle Map hash specially
        var mapHash = Object();
        var objHash = obj.mapmodel.mapHash;
        for( var key in objHash ){
            var tile = new Tile(objHash[key].xLoc,
                                objHash[key].yLoc,
                                objHash[key].Visited,
                                objHash[key].Terrain,
                                objHash[key].Item);


            mapHash[key] = tile;
        }
        this.mapmodel.mapHash = mapHash;
        this.mapmodel.name = obj.mapmodel.name;
        this.mapmodel.mapSize = obj.mapmodel.mapSize;
        this.mapmodel._mapSize = obj.mapmodel.mapSize;
        this.mapmodel.godMode = obj.mapmodel.godMode;

        this.charModel.x = obj.charModel.x;
        this.charModel.y = obj.charModel.y;
        this.charModel.energy = obj.charModel.energy;
        this.charModel.whiffles = obj.charModel.whiffles;
        this.charModel.inventory = obj.charModel.inventory;
        this.charModel.visrange = obj.charModel.visrange;

        this.messagemodel.message = obj.messagemodel.message;
    }
}
