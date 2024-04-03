class VueGame {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.THREE = null;
        this.GLTFLoader = null;
        this.TWEEN = null;

        this.car;
        this.carModel;
        this.setup = this.setup.bind(this); // Bind the setup method to the current instance


        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    afficher() {
        // Remove all existing elements from the body
        document.body.innerHTML = '';

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
        this.scene.background = new this.THREE.Color(0xbfe3dd);
    }

    addRoad() {
        const textureLoader = new this.THREE.TextureLoader();
        const roadTexture = textureLoader.load('public/test2.jpg');

        const roadGeometry = new this.THREE.PlaneGeometry(2000, 10000); // Adjust the size as needed
        const roadMaterial = new this.THREE.MeshStandardMaterial({ map: roadTexture });
        const road = new this.THREE.Mesh(roadGeometry, roadMaterial);
        road.rotation.x = -Math.PI / 2; // Rotate the ground to be flat
        this.scene.add(road);

        return road;
    }

    addGround() {
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
    }

    // Ajout de lumières à la scène
    addLights() {
        const ambientLight = new this.THREE.AmbientLight(0xffffff, 5); // Lumière ambiante
        const directionalLight = new this.THREE.DirectionalLight(0xffffff, 5); // Lumière directionnelle
        directionalLight.position.set(1, 1, 1);
        this.scene.add(ambientLight, directionalLight);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    init() {
        this.setupScene();
        const road = this.addRoad();
        const ground = this.addGround();
        this.addRoadAndGroundInstances(road, ground);
        this.addLights();
    }

    loadCar() {
        

                const loader = new this.GLTFLoader();
        loader.load(this.car.model, (gltf) => {
            this.carModel = gltf.scene;
            this.carModel.position.set(0, 1, 0); // Positionnement
            this.carModel.rotateY(Math.PI);
            //resizeModel(0.8);

            this.scene.add(this.carModel);

            
        }, undefined, (error) => {
            console.error(error);
        });
    }
    
    mouvements() {
        const rotationSpeed=this.car.rotation;
        const currentSpeed=this.car.currentSpeed;
        
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
                this.carModel.position.x -= currentSpeed / 1.1;
                if (this.carModel.rotation.y > -0.30) {
                    this.carModel.rotation.y -= rotationSpeed;
                }
            } else if (event.code === 'ArrowRight') {
                // Déplacer la voiture vers la droite et ajuster la rotation
                this.carModel.position.x += currentSpeed / 1.1;
                if (this.carModel.rotation.y < 0.30) {
                    this.carModel.rotation.y += rotationSpeed;
                }
            }
        });
        // Écouteurs d'événements pour les touches de direction
        document.addEventListener('keydown', function(event) {
        	Key.onKeyDown(event);
        });
        document.addEventListener('keyup', function(event) {
        	Key.onKeyUp(event);
        });
        // Variables pour stocker l'état des touches de rotation
        let isLeftArrowPressed = false;
        let isRightArrowPressed = false;
        
        // Gestionnaire d'événement pour la pression des touches
        document.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowLeft') {
                isLeftArrowPressed = true;
               
                

            } else if (event.code === 'ArrowRight') {
                isRightArrowPressed = true;
                
            }
        });
     
        // Gestionnaire d'événement pour le relâchement des touches
        document.addEventListener('keyup', (event) => {
            if (event.code === 'ArrowLeft') {
                isLeftArrowPressed = false;
                
                //this.resetCarRotationSmooth();
            } else if (event.code === 'ArrowRight') {
                isRightArrowPressed = false;
                //this.resetCarRotationSmooth();
            }
        });

        
    }
    moveCarForward() {
        // Déplacez la voiture dans la direction z en fonction de sa vitesse actuelle
        const speed = this.car.currentSpeed; // Vous pouvez ajuster la vitesse selon vos besoins
        this.carModel.position.z -= speed;
    
        // Réinitialisez la position z de la voiture lorsqu'elle sort de l'écran
        
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
