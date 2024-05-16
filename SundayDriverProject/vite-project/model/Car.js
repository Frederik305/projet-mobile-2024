class Car {
    constructor(id , name, model, level, price, acceleration, baseMaxSpeed, weight, brakePower, maneuverability, rotation, cameraDistance, cameraRotationY, cameraRotationX) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.level = level;
        this.price = price;
        
        this.acceleration = acceleration;
        this.baseMaxSpeed = baseMaxSpeed;

        this.weight = weight;
        this.brakePower = brakePower;
        this.maneuverability = maneuverability;

        this.rotation = rotation;

        this.cameraDistance = cameraDistance;
        this.cameraRotationY = cameraRotationY;
        this.cameraRotationX = cameraRotationX;
    }
}
export default Car;