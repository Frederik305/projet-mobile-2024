class VueGame {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.THREE = null;
        this.GLTFLoader = null;
        this.TWEEN = null;

        this.car;

        this.carPosition;

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
        const loader = new this.GLTFLoader();
        loader.load("public/Road.glb", (gltf) => {
            const road = gltf.scene;

            this.scene.add(road);

        }, undefined, (error) => {
            console.error(error);
        });
    }

    addGround() {
        const groundGeometry = new this.THREE.PlaneGeometry(10000, 10000); // Adjust the size as needed
        const groundMaterial = new this.THREE.MeshStandardMaterial({ color: 0x099605 });
        const ground = new this.THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2; // Rotate the ground to be flat
        ground.position.y = -7;
        this.scene.add(ground);

        return ground;
    }

    addRoadAndGroundInstances() {

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
        this.addRoad();
        this.addLights();
    }

    loadCar() {
        const cameraOffset = new this.THREE.Vector3(this.car.cameraRotationX, this.car.cameraRotationY, this.car.cameraDistance);
        const loader = new this.GLTFLoader();
        loader.load(this.car.model, (gltf) => {
            const car = gltf.scene;
            car.position.set(0, 1, 0); // Positionnement
            car.rotateY(Math.PI);
            //resizeModel(0.8);

            this.scene.add(car);

            const cameraPosition = new this.THREE.Vector3();
            cameraPosition.copy(car.position).add(cameraOffset);
            this.camera.position.copy(cameraPosition);

            // Look at the car
            this.camera.lookAt(car.position);
            this.camera.rotation.x -= -0.2;
        }, undefined, (error) => {
            console.error(error);
        });
    }
    
    mouvements() {
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
                this.resetCarRotationSmooth();
            } else if (event.code === 'ArrowRight') {
                isRightArrowPressed = false;
                this.resetCarRotationSmooth();
            }
        });

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
    }

    resetCarRotationSmooth() {
        // Création d'une nouvelle animation Tween pour la rotation de la voiture
        new this.TWEEN.Tween(this.voiture.rotation)
            .to({ y: 0 }, 100) // Animation sur 500 millisecondes jusqu'à la rotation de base
            .easing(TWEEN.Easing.Quadratic.InOut) // Type d'animation fluide
            .start();
        }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.TWEEN.update();
        this.renderer.render(this.scene, this.camera);
    }

    startAnimation() {
        this.animate();
    }
}
