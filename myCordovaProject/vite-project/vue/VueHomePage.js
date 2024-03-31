class VueHomePage{
    constructor(){
        this.html = document.getElementById('html-vue-home-page').innerHTML;
    }

    initializeHomePage(displayHomePage){
        this.displayHomePage = displayHomePage
    }

    afficher(){
        document.getElementsByTagName("body")[0].innerHTML = this.html;
    }
}