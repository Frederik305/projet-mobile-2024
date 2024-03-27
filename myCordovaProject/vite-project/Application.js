class Application{
    constructor(window, carDAO){
        this.window = window;
        this.carDAO = carDAO;

        this.carDAO.getAllCars()
    }


}

new Application(window, new CarDAO());