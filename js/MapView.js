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
                    cell.className = "blank";
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
                // Get the Terrain
                switch(tileHash[key].Terrain){
                    case Meadow:
                        cell.innerHTML = "M";
                        cell.className = "Meadow";
                        break;
                    case Forest:
                        cell.innerHTML = "F";
                        cell.className = "Forest";
                        break;
                    case Water:
                        cell.innerHTML = "W";
                        cell.className = "Water";
                        break;
                    case Wall:
                        cell.innerHTML = "W";
                        cell.className = "Wall";
                        break;
                    case Bog:
                        cell.innerHTML = "B";
                        cell.className = "Bog";
                        break;
                    case Swamp:
                        cell.innerHTML = "S";
                        cell.className = "Swamp";
                        break;
                    default:
                        cell.innerHTML = "?";
                        cell.className = "unknown";
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
