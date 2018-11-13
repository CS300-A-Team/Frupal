class CharStatusView {

    constructor(charModel) {
        this.charModel = charModel;
        this.showInv = false;
    }

    redraw() {
        let span = document.getElementById("location");
        if (span != undefined) {
            span.innerText = this.charModel.x + ", " + this.charModel.y;
        }
        span = document.getElementById("energy");
        if (span != undefined) {
            span.innerText = this.charModel.energy;
        }
        span = document.getElementById("whiffles");
        if (span != undefined) {
            span.innerText = this.charModel.whiffles;
        }
        if ( this.showInv ) this.drawInv();
    }

    drawInv(){
        let div = document.getElementById("inventory");
        if( div !== undefined ){
            div.innerHTML = "";
            if( this.showInv ) {
                // Create the header for the inventory "table"
                let divtitle = document.createElement("div");
                    divtitle.innerHTML = "<span></span><span className='inv-title inv-header'><b>Inventory</b></span><span></span>";
                    div.appendChild(divtitle);
                    divtitle = document.createElement("div");
                    let spantitle = document.createElement("span");
                        spantitle.innerText = "Name";
                        spantitle.className = "inv-name-column inv-header";
                    divtitle.appendChild(spantitle);
                        spantitle = document.createElement("span");
                        spantitle.innerText = "Value";
                        spantitle.className = "inv-value-column inv-header"
                    divtitle.appendChild(spantitle);
                        spantitle = document.createElement("span");
                        spantitle.innerText = "Count";
                        spantitle.className = "inv-count-column inv-header"
                    divtitle.appendChild(spantitle);
                div.appendChild(divtitle);
                // Create the rows to display item information
                // We need to show a _count_ of each item type, like "Axe | 2" instead
                // of two axe rows. So, consolidate the items into rows before displaying.
                let itemTypeToCountMap = {};
                for (let i = 0; i < this.charModel.inventory.length; i ++){
                    if (itemTypeToCountMap[this.charModel.inventory[i]] === undefined){
                        itemTypeToCountMap[this.charModel.inventory[i]] = 1;   // This is the first item of this type
                    } else {
                        itemTypeToCountMap[this.charModel.inventory[i]] ++;
                    }
                }
                // Display the item information we just consolidated
                for (let itemType in itemTypeToCountMap){
                    let divinv = document.createElement("div");
                    let span = document.createElement("span");
                    span.innerText = itemType;
                    span.className = "inv-name-column"
                    divinv.appendChild(span);
                    span = document.createElement("span");
                    span.className = "inv-value-column"
                    span.innerText = itemTypeToPriceMap[itemType];
                    divinv.appendChild(span);
                    span = document.createElement("span");
                    span.className = "inv-count-column"
                    span.innerText = itemTypeToCountMap[itemType];
                    divinv.appendChild(span);
                    div.appendChild(divinv);
                }
            }
        }
    }
}
