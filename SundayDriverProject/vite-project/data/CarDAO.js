import Car from '../model/Car.js';
class CarDAO{
    constructor(){
        this.cars = [
            {id: 0, name: "Muscle", model: "3dModels/Muscle.glb", level: 0, price: 5000, acceleration: 0.8, baseMaxSpeed: 40, weight: 1000, brakePower: 1, maneuverability: 20, rotation: 0.01, cameraDistance: 900, cameraRotationY: 500, cameraRotationX: 0},
            {id: 1, name: "Sedan", model: "3dModels/Sedan.glb", level: 5, price: 5000, acceleration: 0.6, baseMaxSpeed: 50, weight: 1000, brakePower: 1, maneuverability: 10, rotation: 0.01, cameraDistance: 1000, cameraRotationY: 500, cameraRotationX: 0},
            {id: 2, name: "Police car", model: "3dModels/Police Muscle.glb", price: 5000, level: 10, acceleration: 0.9, baseMaxSpeed: 80, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.009, cameraDistance: 1000, cameraRotationY: 500, cameraRotationX: 0},
            {id: 3, name: "Gino", model: "3dModels/Muscle 2.glb", level: 15, price: 5000, acceleration: 0.9, baseMaxSpeed: 80, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.008, cameraDistance: 1000, cameraRotationY: 400, cameraRotationX: 0},
            {id: 4, name: "Hatchback", model: "3dModels/Hatchback.glb", level: 0, price: 5000, acceleration: 0.9, baseMaxSpeed: 80, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.009, cameraDistance: 1000, cameraRotationY: 500, cameraRotationX: 0},
            {id: 5, name: "Sport", model: "3dModels/Sports.glb", level: 0, price: 5000, acceleration: 1, baseMaxSpeed: 100, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.01, cameraDistance: 900, cameraRotationY: 400, cameraRotationX: 0},
            {id: 6, name: "Pickup", model: "3dModels/Pickup.glb", level: 0, price: 5000, acceleration: 0.8, baseMaxSpeed: 80, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.007, cameraDistance: 1100, cameraRotationY: 550, cameraRotationX: 0},
            {id: 7, name: "Taxi", model: "3dModels/Taxi.glb", level: 0, price: 5000, acceleration: 1, baseMaxSpeed: 30, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.0095, cameraDistance: 1000, cameraRotationY: 500, cameraRotationX: 0},
            {id: 8, name: "Van", model: "3dModels/Van.glb", level: 0, price: 5000, acceleration: 0.5, baseMaxSpeed: 60, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.006, cameraDistance: 1100, cameraRotationY: 550, cameraRotationX: 0},
            {id: 9, name: "SUV", model: "3dModels/SUV.glb", level: 0, price: 5000, acceleration: 0.6, baseMaxSpeed: 80, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.005, cameraDistance: 1000, cameraRotationY: 400, cameraRotationX: 0}
       
        ];
    }

    getCars(){
        for(let position in this.cars){
            let car = new Car(
                this.cars[position].id, 
                this.cars[position].name, 
                this.cars[position].model, 
                this.cars[position].level, 
                this.cars[position].price,
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