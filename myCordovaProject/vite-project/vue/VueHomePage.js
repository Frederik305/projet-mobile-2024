class VueHomePage{
    constructor(){
        this.html = document.getElementById('html-vue-home-page').innerHTML;
        this.displayHomePage = null;
    }

    initializeHomePage(displayHomePage){
        this.displayHomePage = displayHomePage
    }

    afficher(){
        document.getElementsByTagName("body")[0].innerHTML = this.html;

        let listeCar = document.getElementById("liste-item");
        const listeItemItemHTML = listeCar.innerHTML;
        let listeCarHTMLRemplacement = "";

        for(var numeroCar in this.displayHomePage){
            let listeItemCarHTMLRemplacement = listeItemItemHTML;
            listeItemCarHTMLRemplacement = listeItemCarHTMLRemplacement.replace("{Car.id}", this.displayHomePage[numeroCar].id);
            listeItemCarHTMLRemplacement = listeItemCarHTMLRemplacement.replace("{Car.name}", this.displayHomePage[numeroCar].name);
            listeCarHTMLRemplacement += listeItemCarHTMLRemplacement
        }
        listeCar.innerHTML = listeCarHTMLRemplacement;
    }
}