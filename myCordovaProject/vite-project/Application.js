class Application{
    constructor(window, carDAO){
        this.window = window;
        this.carDAO = carDAO;
    }
}

new Application(window, new CarDAO());