import CarDAO from './data/CarDAO.js';
import VueHomePage from './vue/VueHomePage.js';
import VueGame from './vue/VueGame.js';
import VueEndScreen from './vue/VueEndScreen.js';
import VuePlayer from './vue/VuePlayer.js';
import playerDAO from './data/playerDAO.js';
import settingsDAO from './data/SettingsDAO.js';
import VueSettings from './vue/VueSettings.js';


class Application{
    constructor(window, carDAO, vueHomePage, vueGame, vueEndScreen,vuePlayer,playerDAO,settingsDAO,VueSettings) {
        this.window = window;
        this.playerDAO = playerDAO;
        this.carDAO = carDAO;
        this.vuePlayer = vuePlayer;
        this.vueHomePage = vueHomePage;
        this.vueGame = vueGame;
        this.vueEndScreen = vueEndScreen;
        this.settingsDAO = settingsDAO;
        this.vueSettings = VueSettings;
        this.idItem;
        this.vuePlayer.initializeActionModifierPlayer(player=>this.actionModifierPlayer(player))
        this.vueSettings.initialiserActionModifierSettings(settings=>this.actionModifierSettings(settings))
        
        
        this.hasInitGame = false;
        this.hasInitHomePage = false;
        document.addEventListener("deviceready",()=>this.initialiserNavigation(),false);

        this.window.addEventListener("hashchange",() =>this.naviguer());
    
        this.naviguer();
        }
    
        initialiserNavigation(){
            console.log("Application-->initialiserNavigation");
    
            this.window.addEventListener("hashchange",()=>this.naviguer());
            setTimeout(()=>this.naviguer(),3000);
        } 
    naviguer(){
        let hash = window.location.hash;

        if(!hash){
            
            this.vuePlayer.afficher(this.playerDAO.getPlayer());
        }
        else if(hash.match(/^#HomePage/)){
            //console.log(this.playerDAO.getPlayer().highscore);
            this.vueHomePage.initializeHomePage(this.carDAO.getCars(),this.playerDAO.getPlayer());

            this.vueHomePage.afficher();
            
            this.vueHomePage.addMusic();
            this.vueHomePage.setVolume(this.settingsDAO.getSettings().hasMusic, this.settingsDAO.getSettings().MusicVolume);
            
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
            this.vueGame.addMusic();

            // Setup and initialize VueGame asynchronously
            this.vueGame.setVolume(this.settingsDAO.getSettings().hasMusic, this.settingsDAO.getSettings().MusicVolume);
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
            this.vueGame.removeBloomPass();
            this.vueGame.removeMusic();
            this.vueEndScreen.initialiserVueEndScreen(this.carDAO.getCars()[this.idItem],this.vueGame.getGameScore());
            this.vueEndScreen.afficher();

            if(parseInt(this.vueGame.getGameScore())>parseInt(this.playerDAO.getPlayer().highscore)){
                this.playerDAO.modifierHighscore(this.vueGame.getGameScore());
            }
            console.log(this.playerDAO.getPlayer().level)
            this.playerDAO.modifierLevel(this.vueGame.getGameScore());

            console.log(this.playerDAO.getPlayer().level)
        }else if(hash.match(/^#Settings/)){
            
            
            this.vueSettings.afficher(this.settingsDAO.getSettings());
        }
    }
    actionModifierPlayer(player){
        this.playerDAO.modifierInfoPlayer(player)
        this.window.location.hash="#";
    }
    actionModifierSettings(settings){
        this.settingsDAO.modifierSettings(settings)
        this.window.location.hash="#";
    }

}

new Application(window, new CarDAO(), new VueHomePage(), new VueGame(), new VueEndScreen(),new VuePlayer(), new playerDAO(),new settingsDAO(),new VueSettings());