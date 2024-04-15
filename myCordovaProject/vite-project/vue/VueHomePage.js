class VueHomePage{
    constructor(){
        this.html = document.getElementById('html-vue-home-page').innerHTML;
        this.displayHomePage = null;

        this.selectedCar = 0;

        this.onWindowResize = this.onWindowResize.bind(this);

        window.addEventListener('resize', this.onWindowResize, false);
    }

    initializeHomePage(displayHomePage){
        this.displayHomePage = displayHomePage
    }

    afficher() {
        document.getElementsByTagName("body")[0].innerHTML = this.html;

        document.getElementById("name").innerText = "Name: " + this.displayHomePage[this.selectedCar].name;
        document.getElementById("acceleration").innerText = "Acceleration: " + this.displayHomePage[this.selectedCar].acceleration;
        document.getElementById("maneuverability").innerText = "Maneuverability: " + this.displayHomePage[this.selectedCar].maneuverability;
        document.getElementById("brakePower").innerText = "Brake: " + this.displayHomePage[this.selectedCar].brakePower;

        // Modifiez l'attribut href en remplaçant {Car.id} par la valeur de carId
        document.getElementById("btn-start").href = `#Game/${this.selectedCar}`
    }

    async setup() {
        try {
            const [THREE, { GLTFLoader }, { default: TWEEN }, ZingTouch] = await Promise.all([
                import('three'),
                import('three/examples/jsm/loaders/GLTFLoader.js'),
                import('@tweenjs/tween.js'),
                import('zingtouch')
            ]);
    
            this.THREE = THREE;
            this.GLTFLoader = GLTFLoader;
            this.TWEEN = TWEEN;
            this.ZingTouch = ZingTouch;
    
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
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera.aspect = width / height;
        
        this.renderer.setSize(width, height);
        document.body.appendChild(this.renderer.domElement);
        const gradientTexture = this.createGradientBackground();
        this.scene.background = gradientTexture;

        this.addLights()
    }  
    createGradientBackground() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, 0, window.innerHeight);
       
    
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
    
        const texture = new this.THREE.CanvasTexture(canvas);
        return texture;
    }

    addLights() {
        const ambientLight = new this.THREE.AmbientLight(0xffffff, 2); // Lumière ambiante
        const directionalLight = new this.THREE.DirectionalLight(0xffffff, 7); // Lumière directionnelle
        directionalLight.position.set(10, 20, -10);
        this.scene.add(ambientLight, directionalLight);
    }

    loader() {
        const loader = new this.GLTFLoader();
    
        loader.load("HomeView.glb", (gltf) => {
            const carModel = gltf.scene;
            carModel.position.set(0, 0, 0); // Positioning
            carModel.rotateY(Math.PI);
    
            // Add the car model to the scene
            this.scene.add(carModel);
    
        }, undefined, (error) => {
            console.error(error);
        });
    }

    setLinkSelectedCar(){
        const selectedCar = this.selectedCar;

        this.updateLinkSelectedCar(selectedCar);
    }

    updateLinkSelectedCar(selectedCar) {
        document.getElementById("name").innerText = "Name: "+this.displayHomePage[selectedCar].name;
        document.getElementById("acceleration").innerText = "Acceleration: " + this.displayHomePage[selectedCar].acceleration;
        document.getElementById("maneuverability").innerText = "Maneuverability: " + this.displayHomePage[selectedCar].maneuverability;
        document.getElementById("brakePower").innerText = "Brake: " + this.displayHomePage[selectedCar].brakePower;

        // Modifiez l'attribut href en remplaçant {Car.id} par la valeur de carId
        document.getElementById("btn-start").href = `#Game/${selectedCar}`
    }

    appendSceneToDiv(){
        let container = document.getElementById("threejs-container");
        if (container) {
            container.appendChild(this.renderer.domElement);
        } else {
            console.error('Container not found');
        }   
    }

    catchSwipeEvent() {
        var touchArea = document.getElementById('threejs-container');
        var myRegion = new this.ZingTouch.Region(touchArea);
    
        let selectedCar = this.selectedCar;
    
        myRegion.bind(touchArea, 'swipe', (e) => {
            console.log(e.detail);
            console.log(e.detail.data[0].currentDirection);
    
            // check for left swipes
            if (e.detail.data[0].currentDirection <= 225 && e.detail.data[0].currentDirection >= 135) {
                console.log("left")
    
                if (selectedCar <= 0){
                    console.log("premiere voiture")
                    return
                }
                else{
                    selectedCar--;
                    console.log(selectedCar);

                    this.updateLinkSelectedCar(selectedCar);
                }
            }
    
            else if (e.detail.data[0].currentDirection >= 315 || e.detail.data[0].currentDirection <= 45) {
                console.log("right")
    
                selectedCar++;
                console.log(selectedCar);
    
                this.updateLinkSelectedCar(selectedCar);
            }
        });
    }

    setCameraPosition() {
        this.camera.position.set(400, 400, -800);
        this.camera.lookAt(0, 0, 0);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.TWEEN.update();
        this.renderer.render(this.scene, this.camera);
    }

    startAnimation() {
        this.animate();
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
        
        this.startAnimation();
        this.setLinkSelectedCar()
        this.setCameraPosition()

        this.loader();
        this.appendSceneToDiv();
        this.catchSwipeEvent();
    }
}