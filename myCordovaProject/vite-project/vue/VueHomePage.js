class VueHomePage{
    constructor(){
        this.html = document.getElementById('html-vue-home-page').innerHTML;
        this.displayHomePage = null;

        this.onWindowResize = this.onWindowResize.bind(this);

        window.addEventListener('resize', this.onWindowResize, false);
    }

    initializeHomePage(displayHomePage){
        this.displayHomePage = displayHomePage
    }

    clear() {
        // Remove all existing elements from the body
        document.body.innerHTML = '';

    }

    afficher() {
        document.getElementsByTagName("body")[0].innerHTML = this.html;

        let listeCar = document.getElementById("liste-item");
        const listeItemItemHTML = listeCar.innerHTML;
        let listeCarHTMLRemplacement = "";

        for (let numeroCar in this.displayHomePage) {
            let listeItemCarHTMLRemplacement = listeItemItemHTML;
            listeItemCarHTMLRemplacement = listeItemCarHTMLRemplacement.replace("{Car.id}", this.displayHomePage[numeroCar].id);
            listeItemCarHTMLRemplacement = listeItemCarHTMLRemplacement.replace("{Car.name}", this.displayHomePage[numeroCar].name);
            listeCarHTMLRemplacement += listeItemCarHTMLRemplacement;
        }

        listeCar.innerHTML = listeCarHTMLRemplacement;
    }

    /*afficher() {
        document.getElementsByTagName("body")[0].innerHTML = this.html;

        let listeCar = document.getElementById("liste-item");
        const listeItemItemHTML = listeCar.innerHTML;
        let listeCarHTMLRemplacement = "";

        for (let numeroCar in this.displayHomePage) {
            let listeItemCarHTMLRemplacement = listeItemItemHTML;
            listeItemCarHTMLRemplacement = listeItemCarHTMLRemplacement.replace("{Car.id}", this.displayHomePage[numeroCar].id);
            listeItemCarHTMLRemplacement = listeItemCarHTMLRemplacement.replace("{Car.id}", this.displayHomePage[numeroCar].id);
            listeItemCarHTMLRemplacement = listeItemCarHTMLRemplacement.replace("{Car.name}", this.displayHomePage[numeroCar].name);
            listeCarHTMLRemplacement += listeItemCarHTMLRemplacement;

            this.loadCar(this.displayHomePage[numeroCar].model, `threejs-container-${numeroCar}`);
        }

        listeCar.innerHTML = listeCarHTMLRemplacement;
    }*/

    /*loadCar(modelPath, containerId) {
        const loader = new this.GLTFLoader();
    
        loader.load(modelPath, (gltf) => {
            const carModel = gltf.scene;
            carModel.position.set(0, 1, 0); // Positionnement
            carModel.rotateY(Math.PI);
    
            // Create a new scene if it's not already initialized
            if (!this.scene) {
                this.scene = new this.THREE.Scene();
            }
    
            // Create a new camera if it's not already initialized
            if (!this.camera) {
                this.camera = new this.THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100000);
            }
    
            // Create a new renderer if it's not already initialized
            if (!this.renderer) {
                this.renderer = new this.THREE.WebGLRenderer();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                document.body.appendChild(this.renderer.domElement);
            }
    
            // Add the car model to the scene
            this.scene.add(carModel);
    
            // Append the renderer's canvas element to the specified container
            let container = document.getElementById(containerId);
            if (container) {
                container.appendChild(this.renderer.domElement);
            } else {
                console.error(`Container with ID ${containerId} not found`);
            }
    
            // Render the scene
            this.renderer.render(this.scene, this.camera);
        }, undefined, (error) => {
            console.error(error);
        });
    }*/

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

    /*setupScene(){
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.scene.background = new this.THREE.Color(0xbfe3dd);


        const loader = new this.GLTFLoader();
    
        loader.load("public/Muscle.glb", (gltf) => {
            const carModel = gltf.scene;
            carModel.position.set(0, 0, 0); // Positionnement
            carModel.rotateY(Math.PI);
    
            // Create a new scene if it's not already initialized
            if (!this.scene) {
                this.scene = new this.THREE.Scene();
            }
    
            // Create a new camera if it's not already initialized
            if (!this.camera) {
                this.camera = new this.THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100000);
            }
    
            // Create a new renderer if it's not already initialized
            if (!this.renderer) {
                this.renderer = new this.THREE.WebGLRenderer();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                document.body.appendChild(this.renderer.domElement);
            }
    
            // Add the car model to the scene
            this.scene.add(carModel);
    
            // Append the renderer's canvas element to the specified container
            let container = document.getElementById("threejs-container");
            if (container) {
                container.appendChild(this.renderer.domElement);
            } else {
                console.error('Container not found');
            }
    
            // Render the scene
            this.renderer.render(this.scene, this.camera);
        }, undefined, (error) => {
            console.error(error);
        });
    }*/

    setupScene() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.scene.background = new this.THREE.Color(0xbfe3dd);
    }
    
    loader() {
        const loader = new this.GLTFLoader();
    
        loader.load("public/Muscle.glb", (gltf) => {
            const carModel = gltf.scene;
            carModel.position.set(0, 0, 0); // Positioning
            carModel.rotateY(Math.PI);
    
            // Add the car model to the scene
            this.scene.add(carModel);
    
            // Render the scene
            this.renderer.render(this.scene, this.camera);
        }, undefined, (error) => {
            console.error(error);
        });
    }

    onWindowResize() {
        if (this.camera && this.renderer) {
            const widthPercentage = 50;
            const width = window.innerWidth * (widthPercentage / 100);

            const heightPercentage = 50;
            const height = window.innerHeight * (heightPercentage / 100);
            
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        }
    }
    
    addLights() {
        const ambientLight = new this.THREE.AmbientLight(0xffffff, 5); // Lumière ambiante
        const directionalLight = new this.THREE.DirectionalLight(0xffffff, 5); // Lumière directionnelle
        directionalLight.position.set(1, 1, 1);
        this.scene.add(ambientLight, directionalLight);
    }

    appendSceneToDiv(){
        let container = document.getElementById("threejs-container");
        if (container) {
            container.appendChild(this.renderer.domElement);
        } else {
            console.error('Container not found');
        }   
    }

    init() {
        this.setupScene();
        this.addLights();
    }
}