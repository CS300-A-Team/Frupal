class Controller{
    
    constructor( charmodel, mapmodel, messagemodel ){
        // Set the pieces it controls
        this.mapmodel = mapmodel;
        this.charmodel = charmodel;
        this.messagemodel = messagemodel;

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
            this.mapmodel.setVisible(this.charmodel.x, this.charmodel.y)
        }


        this.charmodel.move(tile.xLoc, tile.yLoc, 1);	// 1 == "1 energy, as a placeholder"

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

        this.drawGame();
    }

    drawGame(){
        // the views draw functions get called here
        this.mapView.redraw();
        this.messageView.redraw();
    }

    initGame(){
        this.mapView.createMap();

        this.mapmodel.setVisible(this.charmodel.x, this.charmodel.y)
        this.drawGame();
    }
}
