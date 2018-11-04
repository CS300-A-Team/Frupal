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
        print("        model.mapmodel.name = '" + line +"';")
    else:
        print("        model.mapmodel.mapSize = " + line +";\n");
    
    loadMapname.counter = loadMapname.counter + 1
    return


# Function for Character Loading
@static_vars(counter=0)
def loadCharacter( line ):
    if loadCharacter.counter == 0:
        print("        model.charModel = new CharModel("+line, end="");
    elif loadCharacter.counter == 1:
        print(", " + line, end="" );
    elif loadCharacter.counter == 2:
        print(", " + line + ");");
    else:
        print("        model.charModel.inventory.push('" + line +"');");
		
    loadCharacter.counter = loadCharacter.counter + 1
    return


# Function for Map Loading
def loadMap( line ):
    # Store map lines
    l = line.split(",")
    l[-1] = "'" + l[-1] + "'"
    tile = ','.join( l )
    print( "        model.mapmodel.addTile(" + tile + ");" );
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

    print( "<html><head>")
    print( "\
        <script src='../js/mapModel.js'></script>\n\
        <script src='../js/CharModel.js'></script>\n\
        <script src='../js/Tile.js'></script>\n\
        <script src='../js/FrupalModel.js'></script>")
    print( "<script>" )
    print( "    function buildModel() {" )
    print( "        var model = new FrupalModel;" )
    for mapLine in mapFile:
        line = mapLine.rstrip()
        if line == "######################":
            state = state + 1
            func = statefunc.get( state )
        else:
            func( line )
    print( "        localStorage.clear();")
    print( "        localStorage.setItem('map', JSON.stringify(model));" )
    print( "    }" )
    print( "    buildModel();")
    print( "</script></head>")
    print( "<body></body></html>")

main()
