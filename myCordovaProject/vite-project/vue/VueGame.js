class VueGame {
    constructor() {

        this.html = document.getElementById("html-vue-game").innerHTML;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.THREE = null;
        this.GLTFLoader = null;
        this.TWEEN = null;

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
            const [THREE, { GLTFLoader }, { default: TWEEN }] = await Promise.all([
                import('three'),
                import('three/examples/jsm/loaders/GLTFLoader.js'),
                import('@tweenjs/tween.js')
            ]);

            this.THREE = THREE;
            this.GLTFLoader = GLTFLoader;
            this.TWEEN = TWEEN;

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
        this.scene.fog = new this.THREE.FogExp2(0xbfe3dd, 0.00012);
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
                console.log(this.roadInstances[0].position.z)
                console.log(totalRoadLength);
                //console.log(this.maxRoadInstances);
                this.roadInstances[0].position.z -= totalRoadLength;

                //console.log(this.roadInstances[0].position.z)
                this.roadInstances.push(this.roadInstances.shift());
                //console.log(this.roadInstances);
                //this.scene.remove(removedRoad);
            }
        }
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
                this.carModel.scale.set(0.8, 0.8, 0.8);
    
                this.scene.add(this.carModel);
                resolve(); // Resolve the promise once loading is complete
            }, undefined, (error) => {
                console.error(error);
                reject(error); // Reject the promise if there's an error
            });
        });
    }
    
    mouvements() {
        const rotationSpeed=this.car.rotation;
        
        
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
        };
    }
    moveCarForward() {
        // Déplacez la voiture dans la direction z en fonction de sa vitesse actuelle
        const speed = this.car.baseMaxSpeed; // Obtenez la vitesse actuelle de la voiture
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
        }*/


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