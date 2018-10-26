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
# Helper function that takes a key value pair
# Print everything out this will probably be done by the Helper Function
def printScript( key, value ):
    print("localStorage.setItem('" + key + "', '" + value + "');" )

# Function for Map Name
@static_vars(counter=0)
def loadMapname( line ):
    if loadMapname.counter == 0:
        key = "mapname"
    else:
        key = "mapsize"
    
    printScript( key, line )
    loadMapname.counter = loadMapname.counter + 1
    return


# Function for Character Loading
@static_vars(counter=0)
def loadCharacter( line ):
    if loadCharacter.counter == 0:
        key = "char"
    else:
        key = "stat" + str(loadCharacter.counter)

    printScript( key, line )

    loadCharacter.counter = loadCharacter.counter + 1
    return


# Function for Map Loading
def loadMap( line ):
    # Store map lines
    locationInfo = line.split(",")
    location = locationInfo[0] + "," + locationInfo[1]
    locInfo = ",".join(locationInfo[2:-1])
    printScript( "loc-" + location, locInfo )
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

    print( "<script>") 
    for mapLine in mapFile:
        line = mapLine.rstrip()
        if line == "######################":
            state = state + 1
            func = statefunc.get( state )
        else:
            func( line )
    print( "</script>" )

main()
