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
        this.UnrealBloomPass=null;
        this.EffectComposer=null;
        this.RenderPass=null;

        this.car;
        this.carModel;
        this.setup = this.setup.bind(this); // Bind the setup method to the current instance
        this.bloomPass =null;
        this.gotoleft=false;
        this.gotoright=false;
        this.isLeft=false;
        this.isRight=false;

        this.tickInterval = 1000 / 120; // Tick interval (60 ticks per second)
        this.lastTick = 0; // Timestamp of the last tick
        
        this.frameCount = 0;

        this.isPaused = false;
        this.lastFpsUpdate = Date.now();

        this.totalLength = 0;
    }

    initialiserCar(car){
        this.car = car;
    }
    getGameScore(){
        let realScore = (Math.abs(this.carModel.position.z) * this.score) / 10000;
        return realScore.toFixed(0);
    }

    afficher() {
        document.getElementsByTagName("body")[0].innerHTML = this.html;
        
        document.getElementById('Score').style.display = 'flex';
        document.getElementById('Pause').style.display = 'block';
        
        this.score = 0;
        this.carInstances = [];
        this.roadInstances = [];
        this.maxRoadInstances = 8;
        this.nextRoadPositionCounter = 0;
        this.distanceAhead = -1000;

        this.data=null
        this.speed = this.car.baseMaxSpeed;
    }

    async setup() {
        try {
            const [THREE, { GLTFLoader }, { default: TWEEN }, nipplejs, { UnrealBloomPass },{ EffectComposer },{ RenderPass}] = await Promise.all([
                import('three'),
                import('three/examples/jsm/loaders/GLTFLoader.js'),
                import('@tweenjs/tween.js'),
                import('nipplejs/dist/nipplejs.js'),
                import('three/examples/jsm/postprocessing/UnrealBloomPass.js'),
                import('three/examples/jsm/postprocessing/EffectComposer.js'),
                import('three/examples/jsm/postprocessing/RenderPass.js'),
                
            ]);
    
          
            this.THREE = THREE;
            this.GLTFLoader = GLTFLoader;
            this.TWEEN = TWEEN;
            this.nipplejs = nipplejs;
            this.UnrealBloomPass = UnrealBloomPass;
            this.EffectComposer = EffectComposer;
            this.RenderPass = RenderPass;
            this.scene = new this.THREE.Scene();
            this.camera = new this.THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100000);
            this.renderer = new this.THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio * 2);
    
            this.setupScene();
        } catch (error) {
            console.error('Error setting up Three.js:', error);
            throw error;
        }
    }

    addMusic(){
        // Créez un élément audio
        this.backgroundMusic = new Audio('music/GameMusic.mp3');
        

        // Configurez les propriétés de l'élément audio
        this.backgroundMusic.loop = true; // Pour répéter la musique en boucle
        //this.backgroundMusic.volume = 0.05;

        
        

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
    pauseMusic(){
       {this.backgroundMusic.pause();}
        
    }
    playMusic(){this.backgroundMusic.play()}

    setupScene() {
        document.body.appendChild(this.renderer.domElement);
/*
        

// Chemin d'accès à l'image panoramique de la skybox
        const gradientTexture = this.createGradientBackground();
        this.scene.background = gradientTexture;

        //this.scene.background = new this.THREE.Color(0xb88cff);*/
        const textureLoader = new this.THREE.TextureLoader();

// Chemin d'accès à l'image panoramique de la skybox
        const texturePath = 'img/Sky.png';

        // Chargez la texture
        const texture = textureLoader.load(texturePath);

        // Configurez le filtrage pour améliorer la qualité de la texture
        texture.magFilter = this.THREE.LinearFilter;
        texture.minFilter = this.THREE.LinearFilter;

        // Utilisez la texture comme skybox
        this.scene.background = texture;

        //this.bloomPass = new this.UnrealBloomPass(new this.THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.4, 0.85);
        //this.bloomPass.renderToScreen = true; // Définissez ceci à true si vous voulez que le rendu final passe par cet effet

        // Ajoutez le pass UnrealBloom à votre pipeline de rendu
        //this.composer = new this.EffectComposer(this.renderer);
        //this.composer.addPass(new this.RenderPass(this.scene, this.camera));
        //this.composer.addPass(this.bloomPass);


        this.scene.fog = new this.THREE.FogExp2(0xd8c2ff, 0.00005);
    }
    createGradientBackground() {
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth; // Définissez la largeur du canvas sur la largeur de la fenêtre
        canvas.height = window.innerHeight; // Définissez la hauteur du canvas sur la hauteur de la fenêtre
        const context = canvas.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, 0, window.innerHeight);
       
    
        gradient.addColorStop(0, '#983275'); // Couleur du dégradé au début
        gradient.addColorStop(0.1, '#983275'); // Couleur du dégradé à la fin
        gradient.addColorStop(0.5, '#FED800');
        gradient.addColorStop(1, '#FED800');

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        const texture = new this.THREE.CanvasTexture(canvas);
        return texture;
    }
    removeBloomPass(){
        this.bloomPass.dispose();
    }

    addStart(){
        const loader = new this.GLTFLoader();
        loader.load("Road+Night.glb", (gltf) => {
            const road = gltf.scene;
            this.scene.add(road);
        }, undefined, (error) => {
            console.error(error);
        });
    }
    async loadRoad() {
        return new Promise((resolve, reject) => {
            const loader = new this.GLTFLoader();
            loader.load("Road+Night.glb", (gltf) => {
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
        // Iterate over each roadInstance
        for (const roadInstance of this.roadInstances) {
            // Create a bounding box for the current roadInstance
            const bbox = new this.THREE.Box3().setFromObject(roadInstance);
            
            // Get the size of the bounding box
            const size = bbox.getSize(new this.THREE.Vector3());
    
            // Sum up the length component of the size (assuming the road extends along the z-axis)
            this.totalLength += size.z;
        }
    }

  

    moveRoadBehind(carModel, roadInstances, carInstances){
        if (roadInstances.length > 0 && carModel) {
            if (carModel.position.z + 7000 < roadInstances[0].position.z) {

                const totalRoadLength = this.totalLength
                roadInstances[0].position.z -= totalRoadLength;
                roadInstances.push(roadInstances.shift());

                this.carsGeneration(roadInstances, carInstances);
            }
        }
    }

    async loadCars() {
        
        const modelFiles = [
            { file: 'Sedan.glb', weight: 4 },     
            { file: 'Police Muscle.glb', weight: 2 },       
            { file: 'Muscle 2.glb', weight: 3 },     
            { file: 'Limousine.glb', weight: 1 },  
            { file: 'Bus.glb', weight: 2 }, 
            { file: 'Muscle.glb', weight: 3 }, 
            { file: 'Firetruck.glb', weight: 1 }, 
            { file: 'Hatchback.glb', weight: 4 }, 
            { file: 'Ambulance.glb', weight: 2 }, 
            { file: 'Sports.glb', weight: 2 }, 
        ];
    
        const maxCars = 12; // Nombre maximum de voitures à charger
    
        while (this.carInstances.length < maxCars) {
            let totalWeight = 0;
            for (let i = 0; i < modelFiles.length; i++) {
                totalWeight += modelFiles[i].weight;
            }
    
            const randomNum = Math.random() * totalWeight;
            let selectedModel;
            let weightSum = 0;
    
            for (let i = 0; i < modelFiles.length; i++) {
                weightSum += modelFiles[i].weight;
                if (randomNum <= weightSum) {
                    selectedModel = modelFiles[i].file;
                    break;
                }
            }
    
            const gltf = await this.loadModel(selectedModel);
            let model = gltf.scene;
            model.scale.set(1.5, 1.5, 1.5);
            model.position.z = 10000;
            this.scene.add(model);
            this.carInstances.push(model);
        }

        
    }
    
    loadModel(url) {
        return new Promise((resolve, reject) => {
            const loader = new this.GLTFLoader();
            loader.load(url, resolve, undefined, reject);
        });
    }

    carsGeneration(roadInstances, carInstances){
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
                    const randomOffsetX = Math.random() * 100 - 50; // Generates a random number between -50 and 50
                    positionX += randomOffsetX;
        
                    // Add randomness to positionZ
                    const randomOffsetZ = Math.random() * 2000 - 1000; // Generates a random number between -1000 and 1000
                    const positionZ = roadInstances[3].position.z + randomOffsetZ;

                    carInstances[0].position.x = positionX
                    carInstances[0].position.z = positionZ
                    

                    carInstances.push(carInstances.shift());
                }
            }
            
            
        }

        let path = generateRandomArray();
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
            const carModelURL = this.car.model;
            this.loadModel(carModelURL)
                .then(gltf => {
                    this.carModel = gltf.scene;
                    this.carModel.position.set(0, 1, 0); // Positioning
                    this.carModel.rotateY(Math.PI);
                    this.carModel.scale.set(1.2, 1.2, 1.2);
    
                    this.scene.add(this.carModel);
                    resolve(); // Resolve the promise once loading is complete
                })
                .catch(error => {
                    console.error(error);
                    reject(error); // Reject the promise if there's an error
                });
        });
    }
    
    mouvements() {
        
        let Distance=0;
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


                this.data = data;
                const directionX = data.direction.x;


                if (directionX === 'right') {               
                    this.isRight=true;
                    this.isLeft=false;
                    if (Distance && Distance>data.distance){
                        
                        /*
                        if (this.carModel.rotation.y>0){
                            this.carModel.rotation.y -= rotationSpeed;
                            */
                           
                           this.gotoright=false;
                           
                        
                    }else{
                        this.gotoright=true;
                        
                        /*
                        if (this.carModel.rotation.y < 0.30) {
                            this.carModel.rotation.y += rotationSpeed*(data.distance/50);    
                        }*/
                    }
                    
                }  
                  else if (directionX==='left') {
                    this.isRight=false;
                    this.isLeft=true;
                    // La voiture tourne à gauche
                    if (Distance && Distance>data.distance){
/*
                        if (this.carModel.rotation.y < 0) {
                                this.carModel.rotation.y += rotationSpeed;
                        }   */
                        this.gotoleft=false;
                    }       
                    else{
/*
                    if (this.carModel.rotation.y > -0.30) {
                            this.carModel.rotation.y -= rotationSpeed*(data.distance/50);
                            

                    
                        }*/
                        this.gotoleft=true;  
                    }             
                } 
                Distance=data.distance;
            
            } 
        });
        joystick.on('end', () => {
            // Arrêtez l'animation de rotation de la voiture lorsque le joystick est relâché
            
        
            // Réinitialisez la rotation de la voiture à 0
            const resetRotation = () => {
                this.gotoleft=false;
                this.gotoright=false
                this.isLeft=false;
                this.isRight=false;
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



    }

    moveCarForward(carModel) {
        // Déplacez la voiture dans la direction z en fonction de sa vitesse actuelle
        const angle = carModel.rotation.y; // Obtenez l'angle de rotation de la voiture
        
        // Calculez les composantes x et z de la direction de déplacement en fonction de l'angle
        const dx = Math.sin(angle) * this.speed;
        const dz = -Math.cos(angle) * this.speed;
    
        // Déplacez la voiture en fonction des composantes de direction calculées
        if(carModel.position.x <= 800 && carModel.position.x >= -800){
            carModel.position.x += dx;
            if (carModel.position.x > 800) {
                carModel.position.x = 800;
            } else if (carModel.position.x < -800) {
                carModel.position.x = -800;
            }
        }
        carModel.position.z += dz;

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


    setCameraPosition(carModel,car,camera){
        const cameraOffset = new this.THREE.Vector3(car.cameraRotationX, car.cameraRotationY, car.cameraDistance);
        const cameraPosition = new this.THREE.Vector3();
        cameraPosition.copy(carModel.position).add(cameraOffset);
        camera.position.copy(cameraPosition);
        // Look at the car
        camera.lookAt(carModel.position);
        camera.rotation.x -= -0.2;
    }
    // Main loop to update the game state at each tick
    async update() {
        if(!this.isPaused) {
            this.frameCount++;
            const rotationSpeed=this.car.rotation;

            const now = Date.now();
            const deltaTime = now - this.lastTick;

            if (deltaTime >= this.tickInterval) {
                //console.time('update');
                let carModel = this.carModel;
                let car = this.car;
                let camera = this.camera;
                let roadInstances = this.roadInstances;
                let carInstances = this.carInstances;

                let scene = this.scene

                this.TWEEN.update();
                try {
                    this.moveRoadBehind(carModel, roadInstances, carInstances);
                    this.moveCarForward(carModel);
                    this.setCameraPosition(carModel,car,camera);
                    this.renderer.render(scene, camera);
                } catch (error) {
                    console.error("Error in game loop:", error);
                }

                //console.timeEnd('update');
                let frameCount = this.frameCount;
                if (frameCount % 5 === 0) {
                    this.updateScore();
                }
                if (frameCount % 100 === 0) {
                    this.speedIncrease(car);
                }

                let isCollision = this.detectCollision(carModel,carInstances)
                /*if(isCollision){
                    this.shakeCamera(camera);
                    this.renderer.render(scene, camera);
                    this.isPaused=true;
                    document.getElementById('joystick-container').style.display = 'none';
                    document.getElementById('Pause').style.display = 'none';
                    document.getElementById('Score').style.display = 'none';

                    window.location.hash='EndScreen';
                }*/

                let data = this.data;

                /*if(data){
                let gotoleft = this.gotoleft;
                let gotoright = this.gotoright;
                let isRight = this.isRight;
                let isLeft = this.isLeft;
                    if(isRight && !gotoright ){

                        if (carModel.rotation.y > rotationSpeed*(data.distance/50)){
                            carModel.rotation.y -= rotationSpeed//*(this.data.distance/50);

                        }

                    }else if(isRight && gotoright){

                        if (carModel.rotation.y < 0.30*(data.distance/50)) {
                            carModel.rotation.y += rotationSpeed//*(this.data.distance/50);    
                        }

                    }else if(isLeft && !gotoleft){
                        if (carModel.rotation.y < rotationSpeed*(data.distance/50 )) {
                            carModel.rotation.y += rotationSpeed//*(this.data.distance/50);
                        }   
                    
                    }else if(isLeft && gotoleft){
                        if (carModel.rotation.y > -0.30*(data.distance/50)) {
                            carModel.rotation.y -= rotationSpeed//*(this.data.distance/50);
                        }


                    }
                }*/
                this.lastTick = now - (deltaTime % this.tickInterval);
            }
        }
    } 
    updateScore(){
        //console.time('update');
        if(!this.isPaused) {
            this.score++
            let realScore = this.getGameScore();
            document.getElementById('Score').innerHTML='SCORE: ' + realScore;
        }
        //console.timeEnd('update');
    }

    speedIncrease(car){
        if(!this.isPaused) {
            this.speed += car.acceleration;
        }
    }
    
    animate() {
        requestAnimationFrame(() => {
            this.update(); // Call update inside requestAnimationFrame
            this.animate(); // Recursively call animate to keep the loop running
            this.composer.render();
            //window.setTimeout(() => this.animate(), 0);
        });
        
    }


    changePauseState() {
        this.isPaused = !this.isPaused;
        console.log(this.isPaused);
        const scoreContainer = document.getElementById('Score');
        const gamepause = document.getElementById('game-score-pause');

        if (this.isPaused) {
            this.pauseMusic();
            document.getElementById('joystick-container').style.display = 'none';
            document.getElementById('Pause').style.display = 'none';
            document.getElementById('game-pause').style.display = 'flex';
            gamepause.appendChild(scoreContainer);
            scoreContainer.style.backgroundColor = '#444444d3';
                
        } else {
            this.playMusic();
            document.getElementById('game-pause').style.display = 'none';
            document.getElementById('Pause').style.display= 'block';
            document.getElementById('joystick-container').style.display = 'block';
            document.getElementById('container-score-pause').appendChild(scoreContainer);
            scoreContainer.style.backgroundColor = '#49494977';
        }
    }
    
    checkButtonClick(){
        document.getElementById('Pause').addEventListener('pointerdown', () => {
            if (!this.isPaused) {
            this.changePauseState();}
        });
        document.getElementById('resume').addEventListener('pointerdown', () => {
            if(this.isPaused){
                this.changePauseState();}
                
        });
        document.getElementById('quit-btn').addEventListener('click', () => {
            if(!this.isPaused){
            this.changePauseState();}
            document.getElementById('game-pause').style.display = 'none';
            document.getElementById('Score').style.display = 'none';
            
            
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
        //this.setupScene();
        await this.loadCar();
        this.addStart();
        this.addLights();
        this.mouvements();
        this.checkButtonClick();
        await this.addRoad();
        this.getTotalRoadLength();
        await this.loadCars();
        this.startGameLoop();
        this.isPaused = false;
        
    }

    detectCollision(carModel, otherCars) {
        const carBox = new this.THREE.Box3().setFromObject(carModel);
        const scaleFactor = 0.6;
        const carBoxSize=carBox.getSize(new this.THREE.Vector3());
        carBoxSize.multiplyScalar(scaleFactor);

        for (let i = 0; i < otherCars.length; i++) {
            

             // Facteur d'échelle pour réduire la taille de la boîte
            const otherCarBox = new this.THREE.Box3().setFromObject(otherCars[i]);

            const size = otherCarBox.getSize(new this.THREE.Vector3());
            size.multiplyScalar(scaleFactor);

            otherCarBox.setFromCenterAndSize(otherCarBox.getCenter(new this.THREE.Vector3()), size);

            if (carBox.intersectsBox(otherCarBox)) {
                console.log('Collision detected!');
                
                // Handle collision here, such as removing the collided car
                return true; // Collision detected
            }
        }
    
        return false; // No collision detected
    }
    shakeCamera(camera) {
        const duration = 0.5; // Durée de l'animation en secondes
        const strength = 0.1; // Amplitude de la secousse
    
        const startPosition = camera.position.clone(); // Position initiale de la caméra
    
        // Créer l'animation de secousse avec Tween.js
        new this.TWEEN.Tween(camera.position)
            .to({
                x: startPosition.x + Math.random() * strength * 2 - strength,
                y: startPosition.y + Math.random() * strength * 2 - strength,
                z: startPosition.z + Math.random() * strength * 2 - strength,
            }, duration * 1000) // Convertir la durée en millisecondes
            .easing(this.TWEEN.Easing.Quadratic.InOut) // Type d'interpolation
            .onComplete(() => {
                // Réinitialiser la position de la caméra à sa position initiale à la fin de l'animation
                //this.camera.position.copy(startPosition);
                //this.renderer.render(this.camera);
            })
            .start(); // Démarrer l'animation
    }

    
}
export default VueGame