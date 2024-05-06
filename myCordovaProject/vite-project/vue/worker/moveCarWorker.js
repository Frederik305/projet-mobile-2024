self.addEventListener('message', function(event) {
    const { positionX, positionZ, rotation, speed } = event.data; // Extract necessary data from the message

    // Déplacez la voiture dans la direction z en fonction de sa vitesse actuelle
    const angle = rotation; // Obtenez l'angle de rotation de la voiture
    
    // Calculez les composantes x et z de la direction de déplacement en fonction de l'angle
    const dx = Math.sin(angle) * speed;
    const dz = -Math.cos(angle) * speed;

    // Calculate new positions
    let newPositionX = positionX;
    let newPositionZ = positionZ;

    // Déplacez la voiture en fonction des composantes de direction calculées
    if (positionX <= 800 && positionX  >= -800) {
        newPositionX += dx;
        if (newPositionX > 800) {
            newPositionX = 800;
        } else if (newPositionX < -800) {
            newPositionX = -800;
        }
    }
    newPositionZ += dz;

    // Send the updated position back to the main thread
    self.postMessage({ positionX: newPositionX, positionZ: newPositionZ });
});