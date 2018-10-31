class CharModel{
    constructor(X,Y, Energy, Frupals){
        this.x = X;
        this.y = Y;
        this.energy = Energy;
        this.frupals = Frupals;
        this.inventory;
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
}
