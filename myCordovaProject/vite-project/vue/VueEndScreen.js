class VueEndScreen{
    constructor(){
        this.html = document.getElementById('html-vue-end-screen').innerHTML;
    }

    afficher(){
        document.getElementsByTagName("body")[0].innerHTML = this.html;
    }
}

export default VueEndScreen;