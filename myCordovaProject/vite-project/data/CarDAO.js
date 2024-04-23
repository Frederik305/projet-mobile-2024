import Car from '../model/Car.js';
class CarDAO{
    constructor(){
        this.cars = [
            {id: 0, name: "Muscle", model: "Muscle.glb", acceleration: 1.5, baseMaxSpeed: 50, weight: 1000, brakePower: 1, maneuverability: 20, rotation: 0.01, cameraDistance: 900, cameraRotationY: 500, cameraRotationX: 0},
            {id: 1, name: "Sedan", model: "Sedan.glb", acceleration: 2, baseMaxSpeed: 50, weight: 1000, brakePower: 1, maneuverability: 10, rotation: 0.01, cameraDistance: 800, cameraRotationY: 400, cameraRotationX: 0},
            {id: 2, name: "Mazda rx7", model: "mazda_rx7_stylised.glb", acceleration: 1.1, baseMaxSpeed: 50, weight: 1000, brakePower: 1, maneuverability: 10, rotation: 0.03, cameraDistance: 800, cameraRotationY: 400, cameraRotationX: 0}
        ];
    }

    getCars(){
        for(let position in this.cars){
            let car = new Car(
                this.cars[position].id, 
                this.cars[position].name, 
                this.cars[position].model, 
                this.cars[position].acceleration, 
                this.cars[position].baseMaxSpeed, 
                this.cars[position].weight, 
                this.cars[position].brakePower, 
                this.cars[position].maneuverability,
                this.cars[position].rotation,
                this.cars[position].cameraDistance,
                this.cars[position].cameraRotationY,
                this.cars[position].cameraRotationX
                );

                this.cars[car.id] = car;
        }
        console.log(this.cars)
        return this.cars;
    }
}
export default CarDAO;