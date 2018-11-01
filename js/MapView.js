class MapView{
    constructor( map ){
        this.model = map;
    }

    createMap(){
        // Find the map element
        var mapdiv = document.getElementById('map');
        // Create table
        var table = document.createElement('table');
            table.setAttribute("border",1);
            mapdiv.appendChild(table);
        for( let x = 0; x < this.model.mapSize; x++){
            // Create new row
            var row = document.createElement('tr');
                table.appendChild(row);
            for( let y = 0; y < this.model.mapSize; y++ ){
                var cell = document.createElement("td");
                    cell.id = x+','+y;
                    cell.className = "blank";
                row.appendChild(cell);
            }
        }
    }

    redraw(){
        // Take in the models hashtable
        var tileHash = this.model.mapHash
        for ( var key in tileHash ){
            // Set the corresponding tile to what it is
            console.log(key);
            var cell = document.getElementById(key);
            if( tileHash[key].Visited ){
                cell.innerHTML = "m";
                cell.className = "meadow";
            }

        }
    }
}
