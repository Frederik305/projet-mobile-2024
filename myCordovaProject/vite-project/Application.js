
class Application{
    constructor(window, carDAO, vueHomePage, vueGame, vueEndScreen){
        this.window = window;

        this.carDAO = carDAO;

        this.vueHomePage = vueHomePage;
        this.vueGame = vueGame;
        this.vueEndScreen = vueEndScreen;

        this.window.addEventListener("hashchange", () => this.naviger());
        this.naviger();
    }

    naviger(){
        let hash = window.location.hash;

        if(!hash){
            this.vueHomePage.initializeHomePage(this.carDAO.getCars());

            this.vueHomePage.clear();

            this.vueHomePage.setup()
                .then(() => {
                    this.vueHomePage.init();
                    this.vueHomePage.loader();
                    this.vueHomePage.afficher();
                    this.vueHomePage.appendSceneToDiv();
                })
                .catch(error => console.error(error));
        }else if(hash.match(/^#Game\/([0-9]+)/)){
            let navigation = hash.match(/^#Game\/([0-9]+)/)
            let idItem = navigation[1];

            this.vueGame.initialiserCar(this.carDAO.getCars()[idItem]);
            this.vueGame.afficher();

            // Setup and initialize VueGame asynchronously
            this.vueGame.setup()
                .then(() => {
                    this.vueGame.init();
                    this.vueGame.loadCar();
                    this.vueGame.mouvements();
                    this.vueGame.startAnimation();
                })
                .catch(error => console.error(error));
        }else if(hash.match(/^#EndScreen/)){
            this.vueEndScreen.afficher();
        }
    }

}

new Application(window, new CarDAO(), new VueHomePage(), new VueGame(), new VueEndScreen());