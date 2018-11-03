#!/bin/python3

import sys

if len(sys.argv) < 2: 
    print ("Usage: " + sys.argv[0] + " <mapfile>")
    sys.exit()

def static_vars(**kwargs):
    def decorate(func):
        for k in kwargs:
            setattr(func, k, kwargs[k])
        return func
    return decorate
# Helper function that 

# Function for Map Name
@static_vars(counter=0)
def loadMapname( line ):
    if loadMapname.counter == 0:
        print("  model.mapModel.name = '" + line +"';");
    else:
        print("  model.mapModel.size = " + line +";");
    
    loadMapname.counter = loadMapname.counter + 1
    return


# Function for Character Loading
@static_vars(counter=0)
def loadCharacter( line ):
    if loadCharacter.counter == 0:
        charLocInfo = line.split(",")
        print("  model.charModel.xPosition = " + charLocInfo[0] +";");
        print("  model.charModel.yPosition = " + charLocInfo[1] +";");
    elif loadCharacter.counter == 1:
        print("  model.charModel.energy = " + line +";");
    elif loadCharacter.counter == 2:
        print("  model.charModel.whiffles = " + line +";");
    else:
        print("  model.charModel.inventory.push('" + line +"');");
		
    loadCharacter.counter = loadCharacter.counter + 1
    return


# Function for Map Loading
def loadMap( line ):
    # Store map lines
    locationInfo = line.split(",")
    location = locationInfo[0] + "," + locationInfo[1]
    locInfo = locationInfo[3] + "," + location + "," + locationInfo[2] +", null"
	
    print( "  model.mapModel['" + location + "'] = new Tile(" + locInfo + ");")
    return


#### Main Function ####
def main():
# Open file
# Perhaps check if it exists
    mapFile = open(sys.argv[1])

# Iterate over file
    state = 0 # Starting state

    statefunc={
        0: loadMapname,
        1: loadCharacter,
        2: loadMap
    }

    func = statefunc.get( state )

    print( "function buildModel() {" ) 
    print( "  var model = new FrupalModel();" ) 
    for mapLine in mapFile:
        line = mapLine.rstrip()
        if line == "######################":
            state = state + 1
            func = statefunc.get( state )
        else:
            func( line )
    print( "  return model;" )
    print( "}" )

main()
