class CarDAO{
    constructor(){
        this.cars = [
            {id: 0, name: "Muscle", model: "public/Muscle.glb", acceleration: 5.1, baseMaxSpeed: 30, currentSpeed: 0.0, weight: 1000, brakePower: 1, maneuvrability: 10, rotation: null, cameraDistance: 700, cameraRotationY: 400, cameraRotationX: 0},
            {id: 1, name: "Jeep", model: "public/jeep.glb", acceleration: 1.1, baseMaxSpeed: 30, currentSpeed: 0.0, weight: 1000, brakePower: 1, maneuvrability: 3, rotation: null, cameraDistance: 2500, cameraRotationY: 1500, cameraRotationX: 500},
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
                this.cars[position].currentSpeed, 
                this.cars[position].weight, 
                this.cars[position].brakePower, 
                this.cars[position].maneuvrability,
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