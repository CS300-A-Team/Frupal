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
                    divtitle.innerHTML = "<span></span><span><b>Inventory</b></span><span></span>";
                    div.appendChild(divtitle);
                    divtitle = document.createElement("div");
                    let spantitle = document.createElement("span");
                        spantitle.innerText = "Name";
                    divtitle.appendChild(spantitle);
                        spantitle = document.createElement("span");
                        spantitle.innerText = "Worth";
                    divtitle.appendChild(spantitle);
                        spantitle = document.createElement("span");
                        spantitle.innerText = "Quantity";
                    divtitle.appendChild(spantitle);
                div.appendChild(divtitle);
                for (let item in this.charModel.inventory) {
                    let divinv = document.createElement("div");
                    let span = document.createElement("span");
                        span.innerText = this.charModel.inventory[item];
                        divinv.appendChild(span);
                        span = document.createElement("span");
                        span.innerText = "$20";
                        divinv.appendChild(span);
                        span = document.createElement("span");
                        span.innerText = "1";
                        divinv.appendChild(span);
                    div.appendChild(divinv);
                }
            }
        }
    }
}