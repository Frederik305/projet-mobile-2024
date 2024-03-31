class CarDAO{
    constructor(){
        this.cars = [
            {id: 0, name: "Test", model: "public/Muscle.glb", acceleration: 1.1, baseMaxSpeed: 30, currentSpeed: 0.0, weight: 1000, brakePower: 1, maneuvrability: 10, rotation: null},
            {id: 1, name: "Test", model: "public/Muscle.glb", acceleration: 1.1, baseMaxSpeed: 30, currentSpeed: 0.0, weight: 1000, brakePower: 1, maneuvrability: 10, rotation: null},
        ];
    }

    getAllCars(){
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
                this.cars[position].rotation
                );

                this.cars[car.id] = car;
        }
        console.log(this.cars)
        return this.cars;
    }
}