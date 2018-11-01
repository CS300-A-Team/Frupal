class CharModel{
    constructor(X,Y, Energy, Whiffles){
        this.x = X;
        this.y = Y;
        this.energy = Energy;
        this.whiffles = Whiffles;
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
