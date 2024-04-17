class VuePlayer{
    constructor(){
        this.html = document.getElementById('html-vue-player').innerHTML;
        this.displayPlayer = null;
    }
    
    initializePlayer(displayPlayer){
        this.displayPlayer = displayPlayer;
    }

    afficher() {
        document.getElementsByTagName("body")[0].innerHTML = this.html;
    }

}
export default VuePlayer;