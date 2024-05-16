class VueHomePage{
    constructor(){
        this.html = document.getElementById('html-vue-home-page').innerHTML;
        this.carList = null;
        this.player = null;
        this.selectedCar = 0;
        this.carPositions = [];
        this.isAnimating = false;
        this.onWindowResize = this.onWindowResize.bind(this);
        this.backgroundMusic= new Audio('music/HomePageMusic.mp3');;
        window.addEventListener('resize', this.onWindowResize, false);
        this.fastestCarSpeed=0
        this.fastestCarAcceleration = 0
        this.BestCarManiability = 0

        this.leftSwipes = 0;
        this.rightSwipes = 0;
    }

    initializeHomePage(carList,player){
        this.carList = carList
        this.player = player;
    }

    afficher() {
        document.getElementsByTagName("body")[0].innerHTML = this.html;

        // Modifiez l'attribut href en remplaçant {Car.id} par la valeur de carId
        document.getElementById("btn-start").href = `#Game/${this.selectedCar}`
        document.getElementById("username-player-home-page").innerHTML = this.player.username;
        document.getElementById('photo-player-home-page').src=this.player.picture;
        document.getElementById("high-score-player").innerHTML += this.player.highscore;
    }

    checkCarsOwned(){
        /*if(this.player.carsUnlocked.includes(this.selectedCar)){
            console.log("car already owned", this.selectedCar);
        }
        else{
            console.log("car not owned", this.selectedCar);
        }*/
    }

    addMusic(){
        // Créez un élément audio
        

        // Configurez les propriétés de l'élément audio
        this.backgroundMusic.loop = true; // Pour répéter la musique en boucle
        //this.backgroundMusic.volume = 0.05; // Réglez le volume de la musique (0.0 à 1.0)
        // Chargez et jouez la musique
        this.backgroundMusic.load();
        this.backgroundMusic.play();
    }

    setVolume(hasMusic, volume){
        if(hasMusic){
            this.backgroundMusic.volume = volume;
        }
        else{
            this.backgroundMusic.volume = 0;
        }

    }
    removeMusic(){
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
    }

    loadTexture(){
        if(this.player.carsUnlocked.includes(this.selectedCar)){
            console.log(this.carModel);
            const textureLoader = new this.THREE.TextureLoader();
            textureLoader.load('NotOwned.png', loadedTexture => {
                this.carModel.traverse(child => {
                    if (child.isMesh) {
                        child.material.map = loadedTexture;
                        child.material.side = this.THREE.FrontSide;
                        
                        child.material.transparent = true;
                        child.material.opacity = 0.5;
                        
                        child.material.alphaTest = 0.5;
                        child.material.needsUpdate = true;
                    }
                });
            });
        }
    }

    async setup() {
        try {
            const [THREE, { GLTFLoader }, { default: TWEEN }, ZingTouch, CANNON] = await Promise.all([
                import('three'),
                import('three/examples/jsm/loaders/GLTFLoader.js'),
                import('@tweenjs/tween.js'),
                import('zingtouch'),
                import('cannon-es/dist/cannon-es.js'),
            ]);
    
            this.THREE = THREE;
            this.GLTFLoader = GLTFLoader;
            this.TWEEN = TWEEN;
            this.ZingTouch = ZingTouch;
            this.CANNON = CANNON;
    
            
        } catch (error) {
            console.error('Error setting up Three.js:', error);
            throw error;
        }
    }

    setupScene() {
        this.scene = new this.THREE.Scene();
        this.camera = new this.THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100000);
        this.renderer = new this.THREE.WebGLRenderer();
        //this.renderer.setPixelRatio(window.devicePixelRatio / 2);

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
        const ambientLight = new this.THREE.AmbientLight(0xbbb5eb,7); // Lumière ambiante
        const directionalLight = new this.THREE.DirectionalLight(0xbbb5eb,15); // Lumière directionnelle
        directionalLight.position.set(10, 20, -10);
        this.scene.add(ambientLight, directionalLight);
    }

    async loader() {
        const loader = new this.GLTFLoader();
        
        for (let i = 0; i < this.carList.length; i++) {
            try {
                if (this.carList[i].baseMaxSpeed>this.fastestCarSpeed){
                    this.fastestCarSpeed=this.carList[i].baseMaxSpeed;
                }
                if (this.carList[i].acceleration>this.fastestCarAcceleration){
                    this.fastestCarAcceleration=this.carList[i].acceleration;
                }
                if (this.carList[i].rotation>this.BestCarManiability){
                    this.BestCarManiability=this.carList[i].rotation;
                }
                const gltf = await new Promise((resolve, reject) => {
                    loader.load(this.carList[i].model, resolve, undefined, reject);
                    
                });

                const gltf2 = await new Promise((resolve, reject) => {
                    loader.load("3dModels/Parking.glb", resolve, undefined, reject);
                });
                this.carModel = gltf.scene;
                this.carModel.position.set(i * -400, 0, 0); // Positioning
                this.carModel.rotateY(Math.PI);
                
                this.carPositions.push(this.carModel.position); // Store position of loaded car model

                const parkingModel = gltf2.scene;

                parkingModel.position.set(i * -400, 0, 0); // Positioning
                parkingModel.rotateY(Math.PI);
                
                // Add the car model to the scene
                this.scene.add(this.carModel);
                this.scene.add(parkingModel);
                //this.loadTexture();
            } catch (error) {
                console.error(error);
            }
        }
    }

    setLinkSelectedCar(){
        this.updateLinkSelectedCar();
    }

    updateLinkSelectedCar() {
        let displayBaseSpeed = document.getElementById("displayBaseSpeed");
        let displayAcceleration = document.getElementById("displayAcceleration");
        let displayManeuverability = document.getElementById("displayManeuverability");
        
        
        displayBaseSpeed.style.width = this.carList[this.selectedCar].baseMaxSpeed/this.fastestCarSpeed*100 + "px";
        displayBaseSpeed.style.background='linear-gradient(90deg, rgb(255, 103, 1) 0%, rgb(255,196,0)'+ (((this.fastestCarSpeed-this.carList[this.selectedCar].baseMaxSpeed+this.fastestCarSpeed)/this.fastestCarSpeed)*100).toString() +'%)';
        

        displayAcceleration.style.width = this.carList[this.selectedCar].acceleration/this.fastestCarAcceleration * 100 + "px";
        displayAcceleration.style.background= 'linear-gradient(90deg, rgb(132,0,255) 0%,rgb(188,67,255)'+ (((this.fastestCarAcceleration-this.carList[this.selectedCar].acceleration+this.fastestCarAcceleration)/this.fastestCarAcceleration)*100).toString()+'%)'; 
        
        displayManeuverability.style.width = this.carList[this.selectedCar].rotation/this.BestCarManiability * 100  + "px";
        displayManeuverability.style.background = 'linear-gradient(90deg, rgb(0,110,255) 0%, rgb(0,162,255)'+(((this.BestCarManiability-this.carList[this.selectedCar].rotation+this.BestCarManiability)/this.BestCarManiability)*100).toString()+'%)'
        
        console.log((((this.BestCarManiability-this.carList[this.selectedCar].maneuverability+this.BestCarManiability)/this.BestCarManiability)*100).toString()+'%')
        //displayBaseSpeed.style.width = this.carList[this.selectedCar].baseMaxSpeed;
        document.getElementById("name").innerText = this.carList[this.selectedCar].name;
        document.getElementById("name").fontSize='35px';
        document.getElementById("baseSpeed").innerText = "Car Speed: " ;
        document.getElementById("acceleration").innerText = "Acceleration: ";
        document.getElementById("maneuverability").innerText = "Maniability: ";

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
    const touchArea = document.getElementById('swipeCatcher');
    const myRegion = new this.ZingTouch.Region(touchArea);

    myRegion.bind(touchArea, 'swipe', (e) => {
        if (e.detail.data[0].currentDirection <= 90 || e.detail.data[0].currentDirection >= 270) {
            if (this.selectedCar > 0) {
                this.selectedCar--;
                this.moveCameraPositionLeft();
                this.updateLinkSelectedCar();
                this.checkCarsOwned();
            }
        }

        if (e.detail.data[0].currentDirection >= 90 && e.detail.data[0].currentDirection <= 270) {
            if (this.selectedCar + 1 < this.carList.length) {
                this.selectedCar++;
                this.moveCameraPositionRight();
                this.updateLinkSelectedCar();
                this.checkCarsOwned();
            }
        }
    });
}

    setCameraPosition() {
        this.camera.position.set(this.carPositions[this.selectedCar].x + 400, 300, -800);
        console.log(this.carPositions[this.selectedCar].x);
        this.camera.lookAt(this.carPositions[this.selectedCar].clone().add(new this.THREE.Vector3(0, 0, -100)));
    }
    moveCameraPositionLeft() {
        let cameraPos = { x: this.camera.position.x };
        let carPos = this.carPositions[this.selectedCar].x + 400;
        
        new this.TWEEN.Tween(cameraPos)
            .to({ x: carPos }, 500) // Durée de l'animation en millisecondes
            .easing(this.TWEEN.Easing.Quadratic.Out) // Style d'interpolation pour une transition fluide
            .onUpdate(() => {
                this.camera.position.x = cameraPos.x;
            })
            .start();
    }
    
    moveCameraPositionRight() {
        let cameraPos = { x: this.camera.position.x };
        let carPos = this.carPositions[this.selectedCar].x + 400;
    
        new this.TWEEN.Tween(cameraPos)
            .to({ x: carPos }, 500) // Durée de l'animation en millisecondes
            .easing(this.TWEEN.Easing.Quadratic.Out) // Style d'interpolation pour une transition fluide
            .onUpdate(() => {
                this.camera.position.x = cameraPos.x;
            })
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

        
    
        this.setupScene();
        this.startAnimation();
        
        
        await this.loader();
        this.setLinkSelectedCar();
        this.setCameraPosition();
        
        this.catchSwipeEvent();
        
        this.checkCarsOwned();
        this.appendSceneToDiv();
    }
}
export default VueHomePage;