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

    updateTileMessage(terrain) {
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
    }

    move( Dir ){
    	if (this.charmodel.hasFoundRoyalDiamonds || this.charmodel.isDead()){
    		return;	// Don't let players move after winning/dying
    	}
    
        // Get current location
        var x = this.charmodel.x;
        var y = this.charmodel.y;

        var tile = this.mapmodel.getDirection( Dir, x, y );

        // Check the tile
        // If cannot move into tile then penalize
        // else move into tile
        if(tile.Terrain !== Water){  //I believe Water is the only impassable terrain as of now - Josh
            this.charmodel.move(tile.xLoc, tile.yLoc, 1); //Set the default to 1 energy spent
            //reveal tiles around player
            this.mapmodel.setVisible(this.charmodel.x, this.charmodel.y, this.charmodel.visrange);
            this.updateTileMessage(tile.Terrain);
        }

        this.encounterItem();
        this.mapmodel.setVisible(this.charmodel.x, this.charmodel.y, this.charmodel.visrange);

        // Handle the win and lose conditions
        if (this.charmodel.x == this.mapmodel.royalDiamondsX && 
        	this.charmodel.y == this.mapmodel.royalDiamondsY){
        	// The win condition is finding the royal diamonds
        	this.charmodel.hasFoundRoyalDiamonds = true;
        	this.charmodel.whiffles = 999999999;	// "one zillion zillion whiffles"
        	var winMessage = "You found the royal diamonds! Victory Royale!";
        	this.messagemodel.message = winMessage;
        	alert(winMessage);        	
        } else if (this.charmodel.isDead()){
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

    saveModelToLocalStorage(){
        // Create a temporary FrupalModel object with a copy of our models' data
        let frupalModel = new FrupalModel();
        frupalModel.mapmodel = this.mapmodel;
        frupalModel.charModel = this.charmodel;
        localStorage.setItem("map", JSON.stringify(frupalModel));
    }

    encounterItem(){
        var currentTile = this.mapmodel.getTile(this.charmodel.x, this.charmodel.y);       //Because sometimes the hero won't move.
        var item = currentTile.Item;
        if(item === 'None'){
            return;
        }
        else if(item == 'PowerBar'){
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
                    //this.charStatusView.redraw();
                    //this.mapView.redraw();
                }

            }
        }
        else if(item == 'Binoculars'){
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
        // other kinds of items
    }
    removeItem(tile){
        this.mapmodel.modTile(tile.xLoc, tile.yLoc, tile.Visited, tile.Terrain, "None");
    }
}
