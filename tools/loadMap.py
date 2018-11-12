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

	
#  Function for checking Map
def chkMap( line, mSize ):
    # Store map lines
    l = line.split(",")
    if(int(l[0]) >= mSize or int(l[0]) < 0 or int(l[1]) >= mSize or int(l[1]) < 0):
        return True;		
    return False;
	

#### Main Function ####
def main():
# Open file
# Perhaps check if it exists
    mapFile = open(sys.argv[1])
    outFile = open("../"+sys.argv[1]+".html",'w+')
    sys.stdout = outFile
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
	
    print( "    function chkCorruptFile() {" )
    lineCnt = 0
    outCellCnt = 0
    diamondCnt = 0
    for mapLine in mapFile:
        line = mapLine.rstrip()
        lineCnt = lineCnt + 1
        if line == "######################":
            state = state + 1
        else:
            if state == 0:
                if lineCnt == 2:
                    mapSize = line
            elif state == 2:
                if "Royal Diamonds" in line:
                    diamondCnt = diamondCnt +1
                corrupt = chkMap(line, int(mapSize))
                if corrupt:
                    outCellCnt = outCellCnt +1
	
    if diamondCnt == 0 or outCellCnt > 0:
        print("        return -1")
    else:
        print("        return 1")
    print( "    }" )
	
    print( "    function buildModel() {" )
    print( "        var model = new FrupalModel;" )
    mapFile.seek(0)
    state = 0
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
    print( "    var chkCorr = chkCorruptFile();")
    print( "    if(eval(chkCorr) == -1) {")
    print( "        alert('Your map file has corrupted contents');")
    print( "    } else if(eval(chkCorr) == 1) {")
    print( "        buildModel();")
    print( "    }")	
    print( "</script></head>")
    print( "<body>")
    print( "<a href='../gameView.html'>Play Frupal!</a>" )
    print( "</body></html>")

main()
