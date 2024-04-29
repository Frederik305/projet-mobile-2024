import Car from '../model/Car.js';
class CarDAO{
    constructor(){
        this.cars = [
            {id: 0, name: "Muscle", model: "Muscle.glb", acceleration: 1, baseMaxSpeed: 50, weight: 1000, brakePower: 1, maneuverability: 20, rotation: 0.01, cameraDistance: 900, cameraRotationY: 500, cameraRotationX: 0},
            {id: 1, name: "Sedan", model: "Sedan.glb", acceleration: 0.75, baseMaxSpeed: 50, weight: 1000, brakePower: 1, maneuverability: 10, rotation: 0.01, cameraDistance: 800, cameraRotationY: 400, cameraRotationX: 0},
            {id: 2, name: "Police car", model: "Police Muscle.glb", acceleration: 1.1, baseMaxSpeed: 80, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.009, cameraDistance: 1000, cameraRotationY: 400, cameraRotationX: 0},
            {id: 3, name: "Gino", model: "Muscle 2.glb", acceleration: 1.1, baseMaxSpeed: 80, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.009, cameraDistance: 1000, cameraRotationY: 400, cameraRotationX: 0},
            {id: 4, name: "Hatchback", model: "Hatchback.glb", acceleration: 0.9, baseMaxSpeed: 80, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.009, cameraDistance: 1000, cameraRotationY: 400, cameraRotationX: 0},
            {id: 5, name: "Sport", model: "Sports.glb", acceleration: 1.5, baseMaxSpeed: 80, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.01, cameraDistance: 1000, cameraRotationY: 400, cameraRotationX: 0},
            {id: 6, name: "Pickup", model: "Pickup.glb", acceleration: 1.5, baseMaxSpeed: 80, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.01, cameraDistance: 1000, cameraRotationY: 400, cameraRotationX: 0},
            {id: 7, name: "Taxi", model: "Taxi.glb", acceleration: 1.5, baseMaxSpeed: 80, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.01, cameraDistance: 1000, cameraRotationY: 400, cameraRotationX: 0},
            
            {id: 8, name: "Van", model: "Van.glb", acceleration: 1.5, baseMaxSpeed: 80, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.01, cameraDistance: 1000, cameraRotationY: 400, cameraRotationX: 0},
            {id: 9, name: "SUV", model: "SUV.glb", acceleration: 1.5, baseMaxSpeed: 80, weight: 1000, brakePower: 1, maneuverability: 0.02, rotation: 0.01, cameraDistance: 1000, cameraRotationY: 400, cameraRotationX: 0}
       
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