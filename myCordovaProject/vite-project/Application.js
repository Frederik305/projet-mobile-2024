import CarDAO from './data/CarDAO.js';
import VueHomePage from './vue/VueHomePage.js';
import VueGame from './vue/VueGame.js';
import VueEndScreen from './vue/VueEndScreen.js';
import VuePlayer from './vue/VuePlayer.js';

class Application{
    constructor(window, carDAO, vueHomePage, vueGame, vueEndScreen,vuePlayer){
        this.window = window;

        this.carDAO = carDAO;
        this.vuePlayer = vuePlayer;
        this.vueHomePage = vueHomePage;
        this.vueGame = vueGame;
        this.vueEndScreen = vueEndScreen;
        this.idItem;
        this.window.addEventListener("hashchange", () => this.naviger());
        this.naviger();
        
    }

    naviger(){
        let hash = window.location.hash;

        if(!hash){
            this.vuePlayer.initializePlayer();
            this.vuePlayer.afficher();
        }
        else if(hash.match(/^#HomePage/)){
            this.vueHomePage.initializeHomePage(this.carDAO.getCars());

            this.vueHomePage.afficher();

            this.vueHomePage.setup()
                .then(() => {
                    this.vueHomePage.init();
                })
                .catch(error => console.error(error));
        }else if(hash.match(/^#Game\/([0-9]+)/)){
            let navigation = hash.match(/^#Game\/([0-9]+)/)
            this.idItem = navigation[1];

            this.vueGame.initialiserCar(this.carDAO.getCars()[this.idItem]);
            this.vueGame.afficher();

            // Setup and initialize VueGame asynchronously
            this.vueGame.setup()
                .then(() => {
                    this.vueGame.init();
                    
                })
                .catch(error => console.error(error));
        }else if(hash.match(/^#EndScreen/)){
            this.vueEndScreen.initialiserSelectedCar(this.carDAO.getCars()[this.idItem]);
            this.vueEndScreen.afficher();
        }
    }

}

new Application(window, new CarDAO(), new VueHomePage(), new VueGame(), new VueEndScreen(),new VuePlayer());