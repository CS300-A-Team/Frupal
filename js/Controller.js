class Controller{
    
    constructor( charmodel, mapmodel, messagemodel ){
        // Set the pieces it controls
        this.mapmodel = mapmodel;
        this.charmodel = charmodel;
        this.messagemodel = messagemodel;

        this.charStatusView = new CharStatusView( charmodel );
        this.mapView = new MapView( mapmodel );
        this.messageView = new MessageView( messagemodel );
    }

    // Slot for moving in Cardinal Directions
    moveNorth(){
        this.move ( 'N' );
    }
    moveSouth(){
        this.move ( 'S' );
    }
    moveEast(){
        this.move ( 'E' );
    }
    moveWest(){
        this.move ( 'W' );
    }

    // Actual Move call logic
    // Game logic goes here

    updateTileMessage(terrain, EnergySpent = 0) {
        switch(terrain) {
            case Meadow:
                this.messagemodel.message = "You are in the " + "Meadow";
                break;
            case Forest:
                this.messagemodel.message = "You are in the " + "Forest";
                break;
            case Water:
                this.messagemodel.message = "You are in the " + "Water";
                break;
            case Wall:
                this.messagemodel.message = "You are in the " + "Wall";
                break;
            case Bog:
                this.messagemodel.message = "You are in the " + "Bog";
                break;
            case Swamp:
                this.messagemodel.message = "You are in the " + "Swamp";
                break;
            default:
                this.messagemodel.message = "You are in the unknown tile";
                break;
        }
        if(EnergySpent > 1) {
            this.messagemodel.message += ". You used extra energy to move here!";
        }
    }

    move( Dir ){
    	if (this.charmodel.hasItem('Royal Diamonds') || this.charmodel.isDead()){
    		return;	// Don't let players move after winning/dying
    	}
    
        // Get current location
        var x = this.charmodel.x;
        var y = this.charmodel.y;

        var tile = this.mapmodel.getDirection( Dir, x, y );

        if(this.encounterObstacle(tile)) {
            if(tile.Terrain === Water){
                this.charmodel.energy--;
                this.messagemodel.message = "YIKES! You cannot move into the Water! You used 1 energy point anyway.";
            }
            else{
                var EnergySpent = 1;
                if(tile.Terrain === Bog || tile.Terrain === Forest){
                    EnergySpent = 2;
                }
                this.charmodel.move(tile.xLoc, tile.yLoc, EnergySpent); //Set the default to 1 energy spent
                //reveal tiles around player
                this.mapmodel.setVisible(this.charmodel.x, this.charmodel.y, this.charmodel.visrange);
                this.updateTileMessage(tile.Terrain, EnergySpent);
            }
        }
        else {
            this.charmodel.energy--;
            this.messagemodel.message = "You decided to go back and not touch the obstacle! You used 1 energy point.";
        }

        this.encounterItem();
        this.mapmodel.setVisible(this.charmodel.x, this.charmodel.y, this.charmodel.visrange);

        // Handle the loss condition
        if (this.charmodel.isDead() && !this.charmodel.hasItem('Royal Diamonds')){
	        // Check if character is now dead from moving
            var deadMessage = "Oh no! You died!!";
            this.messagemodel.message = deadMessage;
            alert(deadMessage);
        }
        this.mapView.moveChar(this.charmodel.x, this.charmodel.y);
        this.drawGame();
        this.saveModelToLocalStorage();
    }

    drawGame(){
        // the views draw functions get called here
        this.charStatusView.redraw();
        this.mapView.redraw();
        this.messageView.redraw();
    }

    initGame(){
        this.mapView.moveChar(this.charmodel.x, this.charmodel.y);
        this.mapView.createMap();

        this.mapmodel.setVisible(this.charmodel.x, this.charmodel.y, this.charmodel.visrange);
        this.drawGame();
    }

    toggleInventory(){
        this.charStatusView.showInv = !this.charStatusView.showInv;
        this.charStatusView.drawInv();
    }

    saveModelToLocalStorage(){
        // Create a temporary FrupalModel object with a copy of our models' data
        let frupalModel = new FrupalModel();
        frupalModel.mapmodel = this.mapmodel;
        frupalModel.charModel = this.charmodel;
        frupalModel.messagemodel = this.messagemodel;
        localStorage.setItem("map", JSON.stringify(frupalModel));
    }

    encounterItem(){
        var currentTile = this.mapmodel.getTile(this.charmodel.x, this.charmodel.y);       //Because sometimes the hero won't move.
        var item = currentTile.Item;
        if(item === 'None'){
            return;
        }
        else if(item === 'PowerBar'){
            var choice = confirm("Here is a power bar, do you want to buy it? " +
                                 "you have " + this.charmodel.whiffles + " whiffles " + " and " + this.charmodel.energy + " energy. " +
                                 "\nThe price of power bar is 1 whiffles and it will give you 20 energy points.");
            if (choice === true) {
                if (this.charmodel.whiffles < 1)
                    alert("Sorry! You don't have enough whiffles.");
                else{
                    this.charmodel.whiffles  =  this.charmodel.whiffles - 1;
                    this.charmodel.energy = this.charmodel.energy + 20;
                    this.removeItem(currentTile);
                    alert("You purchased it.");
                }

            }
        }
        else if(item === 'Binoculars'){
            var choice2 = confirm("Here is a set of binoculars, do you want to buy it?" + "you have " + this.charmodel.whiffles
                                 + " whiffles " + " and " + this.charmodel.energy + " energy. " +
                                  "\nThe price of the binoculars is 50 whiffles and it will reveal more area.");
            if(choice2 === true){
                if(this.charmodel.whiffles < 50)
                    alert("Sorry! You don't have enough whiffles.");
                else{
                    this.charmodel.whiffles = this.charmodel.whiffles - 50;
                    this.removeItem(currentTile);
                    this.charmodel.visrange = 2;
                    this.charmodel.inventory.push("Binoculars");
                    alert("You purchased it.");
                    //this.charStatusView.redraw();
                    //this.mapView.redraw();
                }

            }
        }
        else if(item === 'Type 1 Treasure Chest'){
            this.charmodel.whiffles += 100;
            this.removeItem(currentTile);
            this.messagemodel.message = 'You found a Type 1 Treasure Chest and gained 100 whiffles!';
        }
        else if(item === 'Type 2 Treasure Chest'){
            this.charmodel.whiffles = 0;
            this.removeItem(currentTile);
            this.messagemodel.message = 'You found a Type 2 Treasure Chest and lost all of your whiffles!';
        }
        else if(item === 'Royal Diamonds'){
            this.charmodel.inventory.push('Royal Diamonds');
            this.removeItem(currentTile);
            // Finding the royal diamonds is the win condition, so it does these special things
            this.charmodel.whiffles = 999999999;	// "one zillion zillion whiffles"
            var winMessage = "You found the royal diamonds! Victory Royale!";
            this.mapmodel.godMode = true;
            this.messagemodel.message = winMessage;
            alert(winMessage);
        }
        // other kinds of items
    }

    encounterObstacle(tile){
        var item = tile.Item;
        var check = false;
        if(item === 'None'){
            return true;
        }
        else if(item === 'Tree') {
            check = confirm("This tile contains a tree. You cannot move into the " +
                "tile without removing the tree. You will use an extra 10 points of energy!");
            if(check === true) {
                this.removeItem(tile);
                this.charmodel.energy -= 10;
                alert("You removed the tree and you used an extra 10 points of energy!");
                return true;
            }
            return false;
        }
        else if(item === 'Boulder'){
            check = confirm("This tile contains a boulder. You cannot move into the " +
                "tile without removing the boulder. You will use an extra 16 points of energy!");
            if(check === true) {
                this.removeItem(tile);
                this.charmodel.energy -= 16;
                alert("You removed the boulder and you used an extra 16 points of energy!");
                return true;
            }
            return false;
        }
        else if(item === 'Blackberry Bushes'){
            check = confirm("This tile contains blackberry bushes. You cannot move into the " +
                "tile without removing the blackberry bushes. You will use an extra 4 points of energy!");
            if(check === true) {
                this.removeItem(tile);
                this.charmodel.energy -= 4;
                alert("You removed the blackberry bushes and you used an extra 4 points of energy!");
                return true;
            }
            return false;
        }
        return true;
    }

    removeItem(tile){
        this.mapmodel.modTile(tile.xLoc, tile.yLoc, tile.Visited, tile.Terrain, "None");
    }
}
