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
