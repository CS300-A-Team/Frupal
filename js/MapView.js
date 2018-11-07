class MapView{
    constructor( map ){
        this.model = map;
        this.charX = -1;
        this.charY = -1;
    }

    createMap(){
        // Find the map element
        var mapdiv = document.getElementById('map');
        // Create table
        var table = document.createElement('table');
            table.setAttribute("border",1);
            mapdiv.appendChild(table);
        for( let y = this.model.mapSize - 1; y>= 0; y--){
            // Create new row
            var row = document.createElement('tr');
                table.appendChild(row);
            for( let x = 0; x < this.model.mapSize; x++ ){
                var cell = document.createElement("td");
                    cell.id = x+','+y;
                    cell.className = "mapTile";
                row.appendChild(cell);
            }
        }
    }
    moveChar(X, Y){
        this.charX = X;
        this.charY = Y;
    }
    drawChar(){
        if( this.charX === -1)
            return;
        var charCell = document.getElementById(this.charX+','+this.charY);
        charCell.innerHTML = charCell.innerHTML + "|@";
    }

    redraw(){
        // Take in the models hashtable
        var tileHash = this.model.mapHash;
        for ( var key in tileHash ){
            // Set the corresponding tile to what it is
            var cell = document.getElementById(key);
            if( tileHash[key].Visited ){
                cell.innerHTML = "";
                // Get the Terrain
                switch(tileHash[key].Terrain){
                    case Meadow:
                        cell.className = "mapTile meadow";
                        break;
                    case Forest:
                        cell.className = "mapTile forest";
                        break;
                    case Water:
                        cell.className = "mapTile water";
                        break;
                    case Wall:
                        cell.className = "mapTile wall";
                        break;
                    case Bog:
                        cell.className = "mapTile bog";
                        break;
                    case Swamp:
                        cell.className = "mapTile swamp";
                        break;
                    default:
                        cell.innerHTML = "?";
                        cell.className = "mapTile unknown";
                        break;
                }

                //display items on the map
                if (tileHash[key].Item !== "None" && tileHash[key].Item !== "") {
                    cell.innerHTML = cell.innerHTML + "|" + tileHash[key].Item;
                }
            }

        }
        this.drawChar();
    }
}
