

class VueEndScreen{
    constructor(){
        this.html = document.getElementById('html-vue-end-screen').innerHTML;
        this.car;
        this.score;
    }

    afficher(){
        
        document.getElementById("game-over-container").innerHTML+=this.html;
        document.getElementById("restart-btn").href = `#Game/${this.car.id}`
        document.getElementById("game-score").innerHTML = "SCORE: " + this.score;
        
        
    }
    
    initialiserVueEndScreen(car,score){
        this.car = car;
        this.score = score;
    }

}

export default VueEndScreen;