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

        this.onWindowResize = this.onWindowResize.bind(this);
        this.roadInstances = [];
        this.maxRoadInstances = 5;
        this.nextRoadPositionCounter = 0;
        this.distanceAhead = -1000;

        window.addEventListener('resize', this.onWindowResize, false);
    }

    afficher() {

        document.getElementsByTagName("body")[0].innerHTML = this.html;

        

    }

    initialiserCar(car){
        this.car = car;
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

    /*addRoad() {
        const loader = new this.GLTFLoader();
        loader.load("public/Road.glb", (gltf) => {
            const road = gltf.scene;
            road.scale.set(2,2,2);
            this.scene.add(road);

        }, undefined, (error) => {
            console.error(error);
        });
    }*/


    addStart(){
        const loader = new this.GLTFLoader();
        loader.load("rooad.glb", (gltf) => {
            const road = gltf.scene;
            this.scene.add(road);
        }, undefined, (error) => {
            console.error(error);
        });
            
    }
    
    

    addRoad() {
        /*
        x: 3200
        y: 30
        z: 10000
        */

        const loader = new this.GLTFLoader();
        loader.load("rooad.glb", (gltf) => {
            const road = gltf.scene;

            this.nextRoadPositionCounter++;
            let nextRoadPosition = this.nextRoadPositionCounter * -10000;

            road.position.z = nextRoadPosition;

            this.scene.add(road);
            this.roadInstances.push(road);

            // Remove excess road instances if necessary
            if (this.roadInstances.length > this.maxRoadInstances) {
                const removedRoad = this.roadInstances.shift();
                this.scene.remove(removedRoad);
            }

            let bbox = new this.THREE.Box3().setFromObject(road);
            let helper = new this.THREE.Box3Helper(bbox, new this.THREE.Color(0, 255, 0));
            let size = bbox.getSize(new this.THREE.Vector3()); // HEREyou get the size
            this.scene.add(helper);
            //console.log(size);
        }, undefined, (error) => {
            console.error(error);
        });
    }
    /*addGround() {
        const groundGeometry = new this.THREE.PlaneGeometry(10000, 10000); // Adjust the size as needed
        const groundMaterial = new this.THREE.MeshStandardMaterial({ color: 0x099605 });
        const ground = new this.THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2; // Rotate the ground to be flat
        ground.position.y = -10;
        this.scene.add(ground);

        return ground;
    }

    addRoadAndGroundInstances(road, ground) {
        for (let i = -10; i <= 600; i++) { // Nombre d'instances du terrain
            const roadInstance = road.clone(); // Clonage du terrain
            roadInstance.position.z = i * 10000; // Espacement des instances le long de l'axe z
            const groundInstance = ground.clone(); // Clonage
            groundInstance.position.z = i * 10000; // Espacement des instances le long de l'axe z
            this.scene.add(groundInstance); // Ajout de l'instance au scène
            this.scene.add(roadInstance); // Ajout de l'instance au scène
        }
    }*/

    // Ajout de lumières à la scène
    addLights() {
        const ambientLight = new this.THREE.AmbientLight(0xffffff,3); // Lumière ambiante
        const directionalLight = new this.THREE.DirectionalLight(0xffffff,5); // Lumière directionnelle
        directionalLight.position.set(1, 1, 1);
        this.scene.add(ambientLight, directionalLight);

       
        
    }

    onWindowResize() {
        if (this.camera && this.renderer) {
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        }
    }

    init() {
        this.setupScene();
        this.addStart();
        this.addRoad();
        this.addLights();
    }

    loadCar() {
        const loader = new this.GLTFLoader();
        loader.load(this.car.model, (gltf) => {
            this.carModel = gltf.scene;
            this.carModel.position.set(0, 1, 0); // Positionnement
            this.carModel.rotateY(Math.PI);
            this.carModel.scale.set(0.8, 0.8, 0.8);

            this.scene.add(this.carModel);
            
        }, undefined, (error) => {
            console.error(error);
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
        const speed = this.car.currentSpeed; // Obtenez la vitesse actuelle de la voiture
        const angle = this.carModel.rotation.y; // Obtenez l'angle de rotation de la voiture
        
        // Calculez les composantes x et z de la direction de déplacement en fonction de l'angle
        const dx = Math.sin(angle) * speed;
        const dz = -Math.cos(angle) * speed;
    
        // Déplacez la voiture en fonction des composantes de direction calculées
        this.carModel.position.x += dx;
        this.carModel.position.z += dz;

        // Réinitialisez la position z de la voiture lorsqu'elle sort de l'écran

        //console.log(this.carModel.position.z);

        let nextRoadSpawnTrigger = this.nextRoadPositionCounter * -10000

        if (Math.abs(this.carModel.position.z - nextRoadSpawnTrigger) <=10) {
            this.addRoad();
        }
        else{
            console.log(nextRoadSpawnTrigger);
        }
        
    }

    /*resetCarRotationSmooth() {
        // Création d'une nouvelle animation Tween pour la rotation de la voiture
        new this.TWEEN.Tween(this.car.rotation)
            .to({ y: 0 }, 100) // Animation sur 500 millisecondes jusqu'à la rotation de base
            .easing(TWEEN.Easing.Quadratic.InOut) // Type d'animation fluide
            .start();
        }*/


    cameraFollowCar(){
        const cameraOffset = new this.THREE.Vector3(this.car.cameraRotationX, this.car.cameraRotationY, this.car.cameraDistance);
        const cameraPosition = new this.THREE.Vector3();
            cameraPosition.copy(this.carModel.position).add(cameraOffset);
            this.camera.position.copy(cameraPosition);

            // Look at the car
            this.camera.lookAt(this.carModel.position);
            this.camera.rotation.x -= -0.2;
    }    
    animate() {
        
        requestAnimationFrame(() => this.animate());
        
        this.TWEEN.update();
        this.cameraFollowCar();
        this.moveCarForward();
        this.renderer.render(this.scene, this.camera);
    }

    startAnimation() {
        this.animate();
       
    }
}