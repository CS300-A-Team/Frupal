class CharModel{
    constructor(X,Y, Energy, Whiffles){
        this.x = X;
        this.y = Y;
        this.energy = Energy;
        this.whiffles = Whiffles;
        this.inventory = new Array();
        this.visrange = 1;
    }
    move( X, Y, EnergySpent ){
        this.x = X;
        this.y = Y;
        this.energy = this.energy - EnergySpent;
        if( this.energy < 0) this.energy = 0;
    }
    isDead( ){
        if( this.energy < 1 ){
            return true;
        }else{
            return false;
        }
    }
    hasItem( itemName ){
        for ( let i = 0; i < this.inventory.length; i ++ ){
            if ( this.inventory[i] === itemName ) {
                return true;
            }
        }

        return false;   // We didn't find it in the inventory
    }
}

// itemTypeToPriceMap associates an inventory item type name with its price.
// This is a weak location for the definition. Although it is close to the
// inventory objects that use this map, it would be better to organize it
// somewhere else like an Item.js file.
let itemTypeToPriceMap = {
    "Axe": 5,
    "Pretty Rock": 1,
    "Shears": 20,
    "Binoculars": 50,
    "Power Bar": 20,
    "Royal Diamonds": "999,999+"
};
