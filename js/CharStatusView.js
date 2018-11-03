class CharStatusView {

    constructor(charModel) {
        this.charModel = charModel;
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
    }
}