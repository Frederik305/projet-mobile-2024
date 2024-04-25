import CarDAO from './data/CarDAO.js';
import VueHomePage from './vue/VueHomePage.js';
import VueGame from './vue/VueGame.js';
import VueEndScreen from './vue/VueEndScreen.js';
import VuePlayer from './vue/VuePlayer.js';
import playerDAO from './data/playerDAO.js';

class Application{
    constructor(window, carDAO, vueHomePage, vueGame, vueEndScreen,vuePlayer,playerDAO){
        this.window = window;
        this.playerDAO = playerDAO;
        this.carDAO = carDAO;
        this.vuePlayer = vuePlayer;
        this.vueHomePage = vueHomePage;
        this.vueGame = vueGame;
        this.vueEndScreen = vueEndScreen;
        this.idItem;
        this.vuePlayer.initializeActionModifierPlayer(player=>this.actionModifierPlayer(player))
        this.window.addEventListener("hashchange", () => this.naviger());
        this.naviger();
        
        
    }

    naviger(){
        let hash = window.location.hash;

        if(!hash){
            
            this.vuePlayer.afficher(this.playerDAO.getPlayer());
        }
        else if(hash.match(/^#HomePage/)){
            this.vueHomePage.initializeHomePage(this.carDAO.getCars(),this.playerDAO.getPlayer());

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
            this.vueGame.clearScene()
        }
    }
    actionModifierPlayer(player){
        this.playerDAO.modifier(player)
        this.window.location.hash="#";
    }

}

new Application(window, new CarDAO(), new VueHomePage(), new VueGame(), new VueEndScreen(),new VuePlayer(), new playerDAO());