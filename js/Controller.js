class Controller{
    
    constructor( mapview, mapmodel, charmodel ){
        // Set the pieces it controls
        this.mapmodel = mapmodel;
        this.charmodel = charmodel;
    }

    // Slot for moving in Cardinal Directions
    moveNorth(){
        move ( 'N' );
    }
    moveSouth(){
        move ( 'S' );
    }
    moveEast(){
        move ('E');
    }
    moveWest(){
        move ('E');
    }

    // Actual Move call logic
    // Game logic goes here
    move( Dir ){
        // Get current location
        var x = charmodel.x;
        var y = charmodel.y;
        var tile = mapmodel.nextDirection( Dir, x, y );

        // Check the tile
        // If cannot move into tile then penalize
        // else move into tile

        // Check tile for Diamond

        // If Diamond, then win the game

        charmodel.move( newtile.x, newtile.y, 1 );

        // Check if character is now dead from moving
        if(charmodel.isDead()){
            alert("Oh no! You died!!");
        }

        drawGame();
    }


    drawGame(){
        // the views draw functions get called here
    }
}
