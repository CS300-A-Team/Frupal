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
                let divtitle = document.createElement("div");
                    divtitle.innerHTML = "<b>Inventory</b>";
                    div.appendChild(divtitle);
                for (let item in this.charModel.inventory) {
                    let divinv = document.createElement("div");
                    divinv.innerText = this.charModel.inventory[item];
                    div.appendChild(divinv);
                }
            }
        }
    }
}