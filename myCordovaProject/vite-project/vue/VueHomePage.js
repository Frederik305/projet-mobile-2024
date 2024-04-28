class VueHomePage{
    constructor(){
        this.html = document.getElementById('html-vue-home-page').innerHTML;
        this.carList = null;
        this.player = null;
        this.selectedCar = 0;
        this.carPositions = [];

        this.onWindowResize = this.onWindowResize.bind(this);

        window.addEventListener('resize', this.onWindowResize, false);
    }

    initializeHomePage(carList,player){
        this.carList = carList
        this.player = player;
    }

    afficher() {
        document.getElementsByTagName("body")[0].innerHTML = this.html;

        document.getElementById("name").innerText = "Name: " + this.carList[this.selectedCar].name;
        document.getElementById("acceleration").innerText = "Acceleration: " + this.carList[this.selectedCar].acceleration;
        document.getElementById("maneuverability").innerText = "Maniability: " + this.carList[this.selectedCar].maneuverability;
        document.getElementById("brakePower").innerText = "Brake: " + this.carList[this.selectedCar].brakePower;

        // Modifiez l'attribut href en remplaçant {Car.id} par la valeur de carId
        document.getElementById("btn-start").href = `#Game/${this.selectedCar}`
        document.getElementById("username-player-home-page").innerHTML = this.player.username;
        document.getElementById('photo-player-home-page').src=this.player.picture;
        document.getElementById("high-score-player").innerHTML += this.player.highscore;
    }

    async setup() {
        try {
            const [THREE, { GLTFLoader }, { default: TWEEN }, ZingTouch] = await Promise.all([
                import('three'),
                import('three/examples/jsm/loaders/GLTFLoader.js'),
                import('@tweenjs/tween.js'),
                import('zingtouch'),
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

    async loader() {
        const loader = new this.GLTFLoader();
        
        for (let i = 0; i < this.carList.length; i++) {
            try {
                const gltf = await new Promise((resolve, reject) => {
                    loader.load(this.carList[i].model, resolve, undefined, reject);
                });

                const gltf2 = await new Promise((resolve, reject) => {
                    loader.load("Parking.glb", resolve, undefined, reject);
                });
                const carModel = gltf.scene;
                carModel.position.set(i * -400, 0, 0); // Positioning
                carModel.rotateY(Math.PI);
    
                this.carPositions.push(carModel.position); // Store position of loaded car model

                const parkingModel = gltf2.scene;

                parkingModel.position.set(i * -400, 0, 0); // Positioning
                parkingModel.rotateY(Math.PI);
                
                // Add the car model to the scene
                this.scene.add(carModel);
                this.scene.add(parkingModel);
            } catch (error) {
                console.error(error);
            }
        }
    }

    setLinkSelectedCar(){
        this.updateLinkSelectedCar();
    }

    updateLinkSelectedCar() {
        document.getElementById("name").innerText = "Name: " + this.carList[this.selectedCar].name;
        document.getElementById("acceleration").innerText = "Acceleration: " + this.carList[this.selectedCar].acceleration;
        document.getElementById("maneuverability").innerText = "Maniability: " + this.carList[this.selectedCar].maneuverability;
        document.getElementById("brakePower").innerText = "Brake: " + this.carList[this.selectedCar].brakePower;

        // Modifiez l'attribut href en remplaçant {Car.id} par la valeur de carId
        document.getElementById("btn-start").href = `#Game/${this.selectedCar}`
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
        var touchArea = document.getElementById('swipeCatcher');
        var myRegion = new this.ZingTouch.Region(touchArea);
    
        myRegion.bind(touchArea, 'swipe', (e) => {
            
            
            // check for left swipes
            if (e.detail.data[0].currentDirection <= 225 && e.detail.data[0].currentDirection >= 135) {
                if(this.selectedCar+1<this.carList.length){
                this.selectedCar++
                this.updateLinkSelectedCar();
                //this.setCameraPosition();
                this.moveCameraPositionRight()
                }
            }
    
            if (e.detail.data[0].currentDirection >= 315 || e.detail.data[0].currentDirection <= 45) {
                if (this.selectedCar <= 0){
                    return
                }
                else{
                    this.selectedCar--
                    this.updateLinkSelectedCar();
                    //this.setCameraPosition();
                    this.moveCameraPositionLeft()
                }
            }
        });
    }   

    setCameraPosition() {
        this.camera.position.set(this.carPositions[this.selectedCar].x + 500, 400, -800);
        console.log(this.carPositions[this.selectedCar].x);
        this.camera.lookAt(this.carPositions[this.selectedCar]);
    }

    moveCameraPositionLeft() {
        this.camera.position.x += 2;
        let cameraPos = this.camera.position.x;
        let carPos = this.carPositions[this.selectedCar].x;
        setTimeout(() => {
            if (cameraPos <= carPos + 400) {
                console.log(cameraPos);
                this.moveCameraPositionLeft();
            }
        }, 1);
    }

    moveCameraPositionRight() {
        this.camera.position.x -= 2;
        let cameraPos = this.camera.position.x;
        let carPos = this.carPositions[this.selectedCar].x;
        setTimeout(() => {
            if (cameraPos >= carPos + 400) {
                console.log(cameraPos);
                this.moveCameraPositionRight();
            }
        }, 1);
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

    async init() {
        this.startAnimation();
        this.setLinkSelectedCar();

        await this.loader();
        this.setCameraPosition();
        this.appendSceneToDiv();
        this.catchSwipeEvent();
    }
}
export default VueHomePage;