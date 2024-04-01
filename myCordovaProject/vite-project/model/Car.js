class Car {
    constructor(id , name, model, acceleration, baseMaxSpeed, currentSpeed, weight, brakePower, maneuverability, rotation, cameraDistance, cameraRotationY, cameraRotationX) {
        this.id = id;
        this.name = name;
        this.model = model;
        
        this.acceleration = acceleration;
        this.baseMaxSpeed = baseMaxSpeed;
        this.currentSpeed = currentSpeed;

        this.weight = weight;
        this.brakePower = brakePower;
        this.maneuverability = maneuverability;


        this.rotation = rotation;


        this.cameraDistance = cameraDistance;
        this.cameraRotationY = cameraRotationY;
        this.cameraRotationX = cameraRotationX;
    }
}