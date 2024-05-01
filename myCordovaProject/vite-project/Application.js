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
        
        this.hasInitGame = false;
        this.hasInitHomePage = false;
    }

    naviger(){
        let hash = window.location.hash;

        if(!hash){
            
            this.vuePlayer.afficher(this.playerDAO.getPlayer());
        }
        else if(hash.match(/^#HomePage/)){
            //console.log(this.playerDAO.getPlayer().highscore);
            this.vueHomePage.initializeHomePage(this.carDAO.getCars(),this.playerDAO.getPlayer());

            this.vueHomePage.afficher();
            this.vueHomePage.addMusic();
            this.vueHomePage.setup()
                .then(() => {
                    if(this.hasInitHomePage == false){
                        this.vueHomePage.init();
                        this.hasInitHomePage = true;
                    }else{
                        location.reload();
                    }
                    
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
                    if(this.hasInitGame == false){
                        this.vueGame.init();
                        this.hasInitGame = true;
                        this.vueHomePage.removeMusic();
                    }else{
                        location.reload();
                    }
                    
                })
                .catch(error => console.error(error));
        }else if(hash.match(/^#EndScreen/)){
            this.vueGame.removeMusic();
            this.vueEndScreen.initialiserVueEndScreen(this.carDAO.getCars()[this.idItem],this.vueGame.getGameScore());
            this.vueEndScreen.afficher();

            if(parseInt(this.vueGame.getGameScore())>parseInt(this.playerDAO.getPlayer().highscore)){
                this.playerDAO.modifierHighscore(this.vueGame.getGameScore());
            }
            console.log(this.playerDAO.getPlayer().level)
            this.playerDAO.modifierLevel(this.vueGame.getGameScore());

            console.log(this.playerDAO.getPlayer().level)
        }
    }
    actionModifierPlayer(player){
        this.playerDAO.modifierInfoPlayer(player)
        this.window.location.hash="#";
    }

}

new Application(window, new CarDAO(), new VueHomePage(), new VueGame(), new VueEndScreen(),new VuePlayer(), new playerDAO());