import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import TWEEN from '@tweenjs/tween.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.background=new THREE.Color(0xbfe3dd);



const textureLoader = new THREE.TextureLoader();
const roadTexture = textureLoader.load('public/test2.jpg');


const roadGeometry = new THREE.PlaneGeometry(2000, 10000); // Adjust the size as needed
const roadMaterial = new THREE.MeshStandardMaterial({ map: roadTexture});
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI / 2; // Rotate the ground to be flat
scene.add(road);

const groundGeometry = new THREE.PlaneGeometry(10000, 10000); // Adjust the size as needed
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x099605});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate the ground to be flat
ground.position.y=-7;
scene.add(ground);


for (let i = -10; i <= 600; i++) { // Nombre d'instances du terrain
    const roadInstance = road.clone(); // Clonage du terrain
    roadInstance.position.z = i * 10000; // Espacement des instances le long de l'axe z
    const groundInstance = ground.clone(); // Clonage
    groundInstance.position.z = i * 10000; // Espacement des instances le long de l'axe z
    scene.add(groundInstance); // Ajout de l'instance au scène
    scene.add(roadInstance); // Ajout de l'instance au scène
    console.log(i);
}


// Ajout de lumières à la scène

var ambientLight = new THREE.AmbientLight(0xffffff, 5); // Lumière ambiante
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 5); // Lumière directionnelle

directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function render() {
    renderer.render(scene, camera);
}

let voiture;
const cameraDistance = 700;
const cameraOffset = new THREE.Vector3(0, 400, cameraDistance);
const loader = new GLTFLoader();

loader.load( 'public/Muscle.glb', ( gltf )=> {
	voiture=gltf.scene;

	voiture.position.set(0, 1, 0); // Positionnement sur la sphère
    
	voiture.rotateY(Math.PI); //
	//resizeModel(0.8);
	

	scene.add( voiture );
    
	
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(voiture.position).add(cameraOffset);
    
    camera.position.copy(cameraPosition);
    
    // Look at the car
    camera.lookAt(voiture.position);
    camera.rotation.x -= -0.2;
}, undefined, function ( error ) {

	console.error( error );

} );

function updateCameraPosition() {
    if (voiture) {
        const cameraPosition = new THREE.Vector3();
        cameraPosition.copy(voiture.position).add(cameraOffset);
        camera.position.copy(cameraPosition);
        camera.lookAt(voiture.position);
        camera.rotation.x -= -0.2; // Ajustement de la rotation de la caméra si nécessaire
    }
}


function resizeModel(scale) {
    if (voiture) {
        voiture.scale.set(scale, scale, scale);
    }
}


/*function animate() {
	requestAnimationFrame( animate );

	//voiture.rotation.x += 0.01;
	//voiture.rotation.y += 0.01;

	renderer.render( scene, camera );
	
}*/
const vibrationAmplitude = 1; // Amplitude de la vibration (en unités de distance)
const vibrationFrequency = 0.02; // Fréquence de vibration (en radians par frame)

// Fonction pour animer la vibration de la voiture
function animateVibration() {
    // Calcule la position verticale basée sur le temps et la fréquence de vibration
    const verticalPosition = vibrationAmplitude * Math.sin(Date.now() * vibrationFrequency);

    // Applique la position verticale à la voiture
    voiture.position.y = verticalPosition;
}
// Variables pour le déplacement de la voiture
let speed = 20; // Vitesse de déplacement
let rotationSpeed = 0.05; // Vitesse de rotation

function animate() {
	requestAnimationFrame( animate );
    updateCameraPosition();
    animateVibration();
    voiture.position.z-=speed;
	// Mouvement de la voiture
	if (voiture) {
		// Exemple de contrôles basiques (à remplacer par votre logique de contrôles)
		if (Key.isDown(Key.LEFT_ARROW)) {
            if (voiture.rotation.y > -0.30)
            {voiture.rotation.y -= rotationSpeed;}
            voiture.position.x -= speed/1.1;
		}
		if (Key.isDown(Key.RIGHT_ARROW)) {
            if (voiture.rotation.y < 0.30) { 
                voiture.rotation.y += rotationSpeed;
            }voiture.position.x += speed/1.1;

		}
		if (Key.isDown(Key.UP_ARROW)) {
			// Déplacer la voiture vers l'avant en fonction de sa rotation
			
			voiture.position.z -=  speed*1.1;
		}
		if (Key.isDown(Key.DOWN_ARROW)) {
			// Déplacer la voiture vers l'arrière en fonction de sa rotation
			voiture.position.z += speed/1.1;
			
		}
        if(!isLeftArrowPressed&&!isRightArrowPressed){
            
        }
	}
    TWEEN.update();
	renderer.render( scene, camera );
}

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
        resetCarRotationSmooth();
    } else if (event.code === 'ArrowRight') {
        isRightArrowPressed = false;
        resetCarRotationSmooth();
    }
});

// Fonction pour réinitialiser la rotation de la voiture
function resetCarRotationSmooth() {
    // Création d'une nouvelle animation Tween pour la rotation de la voiture
    new TWEEN.Tween(voiture.rotation)
        .to({ y: 0 }, 100) // Animation sur 500 millisecondes jusqu'à la rotation de base
        .easing(TWEEN.Easing.Quadratic.InOut) // Type d'animation fluide
        .start(); // Démarrage de l'animation
}
// Fonctions utilitaires pour les touches de direction
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

animate();





