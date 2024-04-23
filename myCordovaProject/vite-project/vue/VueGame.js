class VueGame {
    constructor() {
        this.html = document.getElementById("html-vue-game").innerHTML;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.THREE = null;
        this.GLTFLoader = null;
        this.TWEEN = null;
        this.nipplejs = null;
        
        this.car;
        this.carModel;
        this.setup = this.setup.bind(this); // Bind the setup method to the current instance

        this.tickInterval = 1000 / 120; // Tick interval (60 ticks per second)
        this.lastTick = 0; // Timestamp of the last tick

        this.frameCount = 0;
        this.fpsCounter = document.createElement('div');
        this.button = document.createElement('button');

        this.isPaused = false;
        this.lastFpsUpdate = Date.now();

        this.onWindowResize = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.onWindowResize, false);
    }

    initialiserCar(car){
        this.car = car;
    }

    afficher() {
        document.getElementsByTagName("body")[0].innerHTML = this.html;
        document.body.appendChild(this.fpsCounter);
        document.body.appendChild(this.button);

        this.roadInstances = [];
        this.maxRoadInstances = 8;
        this.nextRoadPositionCounter = 0;
        this.distanceAhead = -1000;

        this.fpsCounter.style.position = 'absolute';
        this.fpsCounter.style.top = '10px';
        this.fpsCounter.style.left = '10px';
        this.fpsCounter.style.color = 'white';
        this.fpsCounter.style.fontFamily = 'Arial, sans-serif';

        this.button.style.position = 'absolute';
        this.button.style.top = '10px';
        this.button.style.right = '10px';
        this.button.style.color = 'white';
        this.button.style.fontFamily = 'Arial, sans-serif';
        this.button.style.height = '20px';
        this.button.style.width = '20px';
        this.button.style.backgroundColor = 'rgb(250,250,250)';
        this.button.style.borderColor = 'rgb(250,250,250)';

        this.button.id = 'Pause';
    }

    async setup() {
        try {
            const [THREE, { GLTFLoader }, { default: TWEEN },nipplejs] = await Promise.all([
                import('three'),
                import('three/examples/jsm/loaders/GLTFLoader.js'),
                import('@tweenjs/tween.js'),
                import('nipplejs/dist/nipplejs.js'),
            ]);

            this.THREE = THREE;
            this.GLTFLoader = GLTFLoader;
            this.TWEEN = TWEEN;
            this.nipplejs = nipplejs;
            
            this.scene = new this.THREE.Scene();
            this.camera = new this.THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100000);
            this.renderer = new this.THREE.WebGLRenderer();

            this.setupScene();
        } catch (error) {
            console.error('Error setting up Three.js:', error);
            throw error;
        }
    }

    setupScene() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.scene.background = new this.THREE.Color(0xa8d0ff);
        this.scene.fog = new this.THREE.FogExp2(0xbfe3dd, 0.00007);
    }

    addStart(){
        const loader = new this.GLTFLoader();
        loader.load("rooad.glb", (gltf) => {
            const road = gltf.scene;
            this.scene.add(road);
        }, undefined, (error) => {
            console.error(error);
        });
    }
    async loadRoad() {
        return new Promise((resolve, reject) => {
            const loader = new this.GLTFLoader();
            loader.load("untitled.glb", (gltf) => {
                const road = gltf.scene;
                resolve(road);
            }, undefined, (error) => {
                reject(error);
            });
        });
    }
    async addRoad() {
        while (this.roadInstances.length < this.maxRoadInstances) {
            try {
                const road = await this.loadRoad();
                
                // Calculate the length of the loaded road model
                const roadLength = this.calculateRoadLength(road);
    
                this.nextRoadPositionCounter++;
                let nextRoadPosition = this.nextRoadPositionCounter * -roadLength;
                road.position.z = nextRoadPosition;
                this.scene.add(road);
                this.roadInstances.push(road);
            } catch (error) {
                console.error(error);
            }
        }
    }
    calculateRoadLength(road) {
        const bbox = new this.THREE.Box3().setFromObject(road);
        const size = bbox.getSize(new this.THREE.Vector3());
        return size.z;
    }
    getTotalRoadLength() {
        let totalLength = 0;
    
        // Iterate over each roadInstance
        for (const roadInstance of this.roadInstances) {
            // Create a bounding box for the current roadInstance
            const bbox = new this.THREE.Box3().setFromObject(roadInstance);
            
            // Get the size of the bounding box
            const size = bbox.getSize(new this.THREE.Vector3());
    
            // Sum up the length component of the size (assuming the road extends along the z-axis)
            totalLength += size.z;
        }
    
        return totalLength;
    }

    /*let bbox = new this.THREE.Box3().setFromObject(road);
    let helper = new this.THREE.Box3Helper(bbox, new this.THREE.Color(0, 255, 0));
    let size = bbox.getSize(new this.THREE.Vector3());
    this.scene.add(helper);*/

    moveRoadBehind(){
        if (this.roadInstances.length > 0 && this.carModel) {
            if (this.carModel.position.z + 7000 < this.roadInstances[0].position.z) {

                const totalRoadLength = this.getTotalRoadLength();
                //console.log(this.roadInstances[0].position.z)
                //console.log(totalRoadLength);
                //console.log(this.maxRoadInstances);
                this.roadInstances[0].position.z -= totalRoadLength;

                //console.log(this.roadInstances[0].position.z)
                this.roadInstances.push(this.roadInstances.shift());

                this.carsGeneration();
                /*
                if (this.i % this.maxRoadInstances == 0){
                    this.carsGeneration();
                }*/

                /*this.i++;
                console.log(this.i)*/  

                //console.log(this.roadInstances);
                //this.scene.remove(removedRoad);
            }
        }
    }

    carsGeneration(){
        /*function randint(range) {
            return Math.floor(Math.random() * range);
        }*/
        
        function generateRandomArray() {
            // Initialize an array with two 0s and one 1
            let array = [0, 0, 1];
          
            // Shuffle the array
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
          
            return array;
        }
        
        let roadInstances = this.roadInstances
        const scene = this.scene;
        const loader = new this.GLTFLoader();
        function displayPath(path) {
            const probability = 20;
        
            for (let i = 0; i < path.length; i++) {
                if (path[i] === 0) {
                    const randomNumber = Math.floor(Math.random() * 100);
                    if (randomNumber < probability) {
                        path[i] = 1;
                    }
                }
            }
        
            for (let j = 0; j < 3; j++) {
                if (path[j] == 0) {
                    let positionX = j === 0 ? -600 : (j === 1 ? 0 : 600);
        
                    // Add randomness to positionX
                    const randomOffsetX = Math.random() * 300 - 150; // Generates a random number between -100 and 100
                    positionX += randomOffsetX;
        
                    // Add randomness to positionZ
                    const randomOffsetZ = Math.random() * 1600 - 800; // Generates a random number between -100 and 100
                    const positionZ = roadInstances[3].position.z + randomOffsetZ;
        
                    loader.load('Sedan.glb', (gltf) => {
                        let test = gltf.scene;
                        test.position.set(positionX, 1, positionZ); // Positioning
                        test.scale.set(1.5, 1.5, 1.5);
        
                        scene.add(test);
                    }, undefined, (error) => {
                        console.error(error);
                        reject(error); // Reject the promise if there's an error
                    });
                }
            }
        }
        
        //console.log(this.roadInstances[0].position.z)
        // Let's do this for a 7x7 matrix:
        let sizeX = 3, sizeY = this.maxRoadInstances;
        let path = generateRandomArray(); // Start at X=2 at bottom, end at X=4 at top
        //console.log(path);
        //console.log(JSON.stringify(path));
        displayPath(path);
    }

    // Ajout de lumières à la scène
    addLights() {
        const ambientLight = new this.THREE.AmbientLight(0xffffff,3); // Lumière ambiante
        const directionalLight = new this.THREE.DirectionalLight(0xffffff,5); // Lumière directionnelle
        directionalLight.position.set(1, 1, 1);
        this.scene.add(ambientLight, directionalLight);
    }

    loadCar() {
        return new Promise((resolve, reject) => {
            const loader = new this.GLTFLoader();
            loader.load(this.car.model, (gltf) => {
                this.carModel = gltf.scene;
                this.carModel.position.set(0, 1, 0); // Positioning
                this.carModel.rotateY(Math.PI);
                this.carModel.scale.set(1.2, 1.2, 1.2);
    
                this.scene.add(this.carModel);
                resolve(); // Resolve the promise once loading is complete
            }, undefined, (error) => {
                console.error(error);
                reject(error); // Reject the promise if there's an error
            });
        });
    }

    /*loadCars() {
        const loader = new this.GLTFLoader();
        loader.load('Sedan.glb', (gltf) => {
            let test = gltf.scene;
            console.log(this.roadInstances[0].position.z);
            test.position.set(0, 1, this.roadInstances[0].position.z); // Positioning
            test.rotateY(Math.PI);
            test.scale.set(0.8, 0.8, 0.8);

            this.scene.add(test);
            resolve(); // Resolve the promise once loading is complete
        }, undefined, (error) => {
            console.error(error);
            reject(error); // Reject the promise if there's an error
        });
    }*/
    
    mouvements() {
        let intervalId;
        let Distance;
        const rotationSpeed=this.car.rotation;
        const joystickContainer = document.getElementById('joystick-container');
        const joystick = this.nipplejs.create({
            zone: joystickContainer,
            mode: 'dynamic',
            color: 'yellow'
    });
    joystick.on('move', (evt, data) => {
        // Vérifiez si data est défini et si data.direction est défini
        if (data && data.direction) {
            // data.direction contient la direction du joystick sous forme d'objet { x, y }
           // console.log(data.distance+" "+Distance)
            

            
            const directionX = data.direction.x;

            
            if (directionX === 'right') {               

                if (Distance && Distance>data.distance){
                
                    if (this.carModel.rotation.y>0){
                        this.carModel.rotation.y -= rotationSpeed;}
            
                }else{
                    if (this.carModel.rotation.y < 0.30) {
                        this.carModel.rotation.y += rotationSpeed*(data.distance/50);
            
                }
                   
                    
                    }
        
                
            } else if (directionX==='left') {
                // La voiture tourne à gauche
                if (Distance && Distance>data.distance){
                    
                    if (this.carModel.rotation.y < 0) {
                            this.carModel.rotation.y += rotationSpeed;
                    }   
                }       
                else{
                        
                if (this.carModel.rotation.y > -0.30) {
                        this.carModel.rotation.y -= rotationSpeed*(data.distance/50);
                        
                
                    }
                }               
            } 
            Distance=data.distance;
        
    } 
    
});
joystick.on('end', () => {
    // Arrêtez l'animation de rotation de la voiture lorsque le joystick est relâché
    //clearInterval(intervalId); // Arrêtez l'intervalle de rotation

    // Réinitialisez la rotation de la voiture à 0
    const resetRotation = () => {
        if (Math.abs(this.carModel.rotation.y) > 0.01) {
            // Réduisez progressivement la rotation vers 0
            if (this.carModel.rotation.y > 0) {
                this.carModel.rotation.y -= rotationSpeed;
            } else if (this.carModel.rotation.y < 0) {
                
                this.carModel.rotation.y += rotationSpeed;
            }
            requestAnimationFrame(resetRotation);
        } else {
            // La rotation est suffisamment proche de 0, réinitialisez-la exactement à 0
            this.carModel.rotation.y = 0;
        }
    };

    // Lancez la réinitialisation progressive de la rotation
    resetRotation();
});


/*
        
        
        const Key = {
            LEFT_ARROW: 37,
            UP_ARROW: 38,
            RIGHT_ARROW: 39,
            DOWN_ARROW: 40,
            pressedKeys: {},
    
            isDown: function(keyCode) {
                return this.pressedKeys[keyCode];
            },
    
            onKeyDown: function(event) {
                this.pressedKeys[event.keyCode] = true;
            },
    
            onKeyUp: function(event) {
                delete this.pressedKeys[event.keyCode];

                
            }
        };
    
        // Écouteurs d'événements pour les touches de direction
        document.addEventListener('keydown', (event) => {
            Key.onKeyDown(event);
            if (event.code === 'ArrowLeft') {
                // Déplacer la voiture vers la gauche et ajuster la rotation
                //this.carModel.position.x -= currentSpeed / 1.1;
                if (this.carModel.rotation.y > -0.30) {
                    this.carModel.rotation.y -= rotationSpeed;
                }
            } else if (event.code === 'ArrowRight') {
                // Déplacer la voiture vers la droite et ajuster la rotation
                //this.carModel.position.x += currentSpeed / 1.1;
                if (this.carModel.rotation.y < 0.30) {
                    this.carModel.rotation.y += rotationSpeed;
                }
            }
        });

        document.addEventListener('keyup', (event) => {
            Key.onKeyUp(event);

            if (!Key.isDown(Key.LEFT_ARROW) && !Key.isDown(Key.RIGHT_ARROW)) {
                // Progressivement, ramenez la rotation à 0
                const reduceRotation = () => {
                    if (Math.abs(this.carModel.rotation.y) > 0.01) {
                        // Réduisez la rotation progressivement
                        if (this.carModel.rotation.y > 0) {
                            this.carModel.rotation.y -= rotationSpeed;
                        } else if (this.carModel.rotation.y < 0) {
                            this.carModel.rotation.y += rotationSpeed;
                        }
                        requestAnimationFrame(reduceRotation);
                    } else {
                        // La rotation est suffisamment proche de 0, réinitialisez-la exactement à 0
                        this.carModel.rotation.y = 0;
                    }
                };
        
                // Lancez la réduction progressive de la rotation
                reduceRotation();
            }

        });

        
        document.getElementById('button-left').addEventListener('mousedown', () => {
            const intervalId = setInterval(() => {
                if (this.carModel.rotation.y > -0.30) {
                    this.carModel.rotation.y -= rotationSpeed;
                }
            }, 10);
    
            document.addEventListener('mouseup', () => {
                clearInterval(intervalId);
                this.reduceRotation();
            });
        });

        document.getElementById('button-left').addEventListener('touchstart', () => {
            const intervalId = setInterval(() => {
                if (this.carModel.rotation.y > -0.30) {
                    this.carModel.rotation.y -= rotationSpeed;
                }
            }, 10);
    
            document.addEventListener('touchend', () => {
                clearInterval(intervalId);
                this.reduceRotation();
            });
        });
    
        document.getElementById('button-right').addEventListener('mousedown', () => {
            const intervalId = setInterval(() => {
                if (this.carModel.rotation.y < 0.30) {
                    this.carModel.rotation.y += rotationSpeed;
                }
            }, 10);
    
            document.addEventListener('mouseup', () => {
                clearInterval(intervalId);
                this.reduceRotation();
            });
        });

        document.getElementById('button-right').addEventListener('touchstart', () => {
            const intervalId = setInterval(() => {
                if (this.carModel.rotation.y < 0.30) {
                    this.carModel.rotation.y += rotationSpeed;
                }
            }, 10);
    
            document.addEventListener('touchend', () => {
                clearInterval(intervalId);
                this.reduceRotation();
            });
        });

        this.reduceRotation = () => {
            const reduceRotation = () => {
                
                if (Math.abs(this.carModel.rotation.y) > 0.01) {
                    
                    if (this.carModel.rotation.y > 0) {
                        this.carModel.rotation.y -= rotationSpeed;

                    } else if (this.carModel.rotation.y < 0) {
                        this.carModel.rotation.y += rotationSpeed;
                    }
                    requestAnimationFrame(reduceRotation);
                } else {
                    this.carModel.rotation.y = 0;
                }
            };
            reduceRotation();
        };*/
    }

    moveCarForward() {
        // Déplacez la voiture dans la direction z en fonction de sa vitesse actuelle
        const speed = this.car.baseMaxSpeed+50; // Obtenez la vitesse actuelle de la voiture
        const angle = this.carModel.rotation.y; // Obtenez l'angle de rotation de la voiture
        
        // Calculez les composantes x et z de la direction de déplacement en fonction de l'angle
        const dx = Math.sin(angle) * speed;
        const dz = -Math.cos(angle) * speed;
    
        // Déplacez la voiture en fonction des composantes de direction calculées
        this.carModel.position.x += dx;
        this.carModel.position.z += dz;

        // Réinitialisez la position z de la voiture lorsqu'elle sort de l'écran

        //console.log(this.carModel.position.z);
    }

    /*resetCarRotationSmooth() {
        // Création d'une nouvelle animation Tween pour la rotation de la voiture
        new this.TWEEN.Tween(this.car.rotation)
            .to({ y: 0 }, 100) // Animation sur 500 millisecondes jusqu'à la rotation de base
            .easing(TWEEN.Easing.Quadratic.InOut) // Type d'animation fluide
            .start();
        }
    */


    setCameraPosition(){
        const cameraOffset = new this.THREE.Vector3(this.car.cameraRotationX, this.car.cameraRotationY, this.car.cameraDistance);
        const cameraPosition = new this.THREE.Vector3();
        cameraPosition.copy(this.carModel.position).add(cameraOffset);
        this.camera.position.copy(cameraPosition);
        // Look at the car
        this.camera.lookAt(this.carModel.position);
        this.camera.rotation.x -= -0.2;
    }
    // Main loop to update the game state at each tick
    async update() {
        if(!this.isPaused) {
            this.frameCount++;

            const now = Date.now();
            const deltaTime = now - this.lastTick;


            const elapsedTime = now - this.lastFpsUpdate;
            if (elapsedTime >= 1000) { // Update FPS every second
                const fps = Math.round((this.frameCount * 1000) / elapsedTime);
                this.fpsCounter.textContent = `FPS: ${fps}`;
                this.frameCount = 0; // Reset frame count
                this.lastFpsUpdate = now; // Update last FPS update time
            }

            if (deltaTime >= this.tickInterval) {
                //console.time('update');
                this.TWEEN.update();
                try {
                    //this.callRoad(); // Asynchronous operation
                    this.moveRoadBehind();
                    this.moveCarForward();
                    this.setCameraPosition();
                    this.renderer.render(this.scene, this.camera);
                } catch (error) {
                    console.error("Error in game loop:", error);
                }

                this.lastTick = now - (deltaTime % this.tickInterval);
                //console.timeEnd('update');
            }
        }
    } 
    
    animate() {
        requestAnimationFrame(() => {
            this.update(); // Call update inside requestAnimationFrame
            this.animate(); // Recursively call animate to keep the loop running
        });
    }

    changePauseState(){
        this.isPaused = !this.isPaused;
        console.log(this.isPaused);
    }
    checkButtonClick(){
        document.getElementById('Pause').addEventListener('pointerdown', () => {
            this.changePauseState();
        });
    }
    startGameLoop() {
        // Update the game state
        this.animate();
    }

    onWindowResize() {
        if (this.camera && this.renderer) {
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
            this.renderer.render(this.scene, this.camera);
        }
    }

    async init() {

        this.setupScene();
        await this.loadCar();
        this.addStart();
        this.addLights();
        this.mouvements();
        this.checkButtonClick();
        await this.addRoad();
        this.startGameLoop();
        
    }
}
export default VueGame
/*
function randint(range) {
    return Math.floor(Math.random() * range);
}

function randomPath(sizeX, sizeY, startX, endX) {
    let x = startX;
    let path = [];
    for (let y = sizeY - 1; y >= 0; y--) {
        let upX = y ? randint(sizeX) : endX;
        while (x != upX) {
            path.push([x, y]);
            if (x < upX) x++;
            else x--;
        }
        path.push([x, y]);
    }
    // Remove U-turns
    for (let i = path.length - 4; i >= 0; i--) {
        if (i+3 < path.length && path[i][1] === path[i+3][1] + 1 && path[i][0] === path[i+3][0]) {
            path.splice(i+1, 2); // Remove U
        }
    }
    return path;
}

function displayPath(sizeX, sizeY, path) {
    let grid = Array.from({length: sizeY}, () => Array(sizeX).fill("0"));
    for (let [x, y] of path) {
        grid[y][x] = "1";
    }
    console.log(grid.map(row => row.join(" ")).join("\n"));
}

// Let's do this for a 7x7 matrix:
let sizeX = 3, sizeY = 15;
let path = randomPath(sizeX, sizeY, 1, 1); // Start at X=2 at bottom, end at X=4 at top
//console.log(JSON.stringify(path));
displayPath(sizeX, sizeY, path);
*/