class MessageView{
    constructor( model ){
        this.model = model;
    }

    redraw(){
        var messageDiv = document.getElementById("message");
        messageDiv.innerHTML = this.model.message;
    }
}
