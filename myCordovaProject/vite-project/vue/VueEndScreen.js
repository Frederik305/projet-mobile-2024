import VueGame from "./VueGame";

class VueEndScreen{
    constructor(){
        this.html = document.getElementById('html-vue-end-screen').innerHTML;
        this.car;
    }

    afficher(){
        document.getElementsByTagName("body")[0].innerHTML = this.html;
        document.getElementById("restart-btn").href = `#Game/${this.car.id}`

        
    }
    initialiserSelectedCar(car){
        this.car = car;
    }
}

export default VueEndScreen;