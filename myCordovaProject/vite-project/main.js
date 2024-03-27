import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.background=new THREE.Color(0xbfe3dd);



camera.position.set(0,1200,2000);

// Chargement de la texture
var textureLoader = new THREE.TextureLoader();
var groundTexture = textureLoader.load('public/test.jpg');

// Création de la sphère pour le sol du jeu
var groundGeometry = new THREE.SphereGeometry(2000, 32, 32); // Rayon, segments en X et segments en Y
var groundMaterial = new THREE.MeshBasicMaterial({ map:groundTexture }); // Couleur verte avec fil de fer
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(ground);


// Ajout de lumières à la scène
var ambientLight = new THREE.AmbientLight(0xffffff, 10); // Lumière ambiante
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 10); // Lumière directionnelle
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);


let voiture;

const loader = new GLTFLoader();

loader.load( 'public/Sports.glb', ( gltf )=> {
	voiture=gltf.scene
	voiture.position.set(sphericalCoords.x, sphericalCoords.y, sphericalCoords.z); // Positionnement sur la sphère
    
	voiture.rotation.y = Math.PI;
	voiture.rotation.x = 1;
	resizeModel(0.8);
	
	scene.add( voiture );
	camera.lookAt(voiture.position)
}, undefined, function ( error ) {

	console.error( error );

} );

function resizeModel(scale) {
    if (voiture) {
        voiture.scale.set(scale, scale, scale);
    }
}


function animate() {
	requestAnimationFrame( animate );
	
	ground.rotation.x += 0.001;
	//voiture.rotation.y += 0.01;
	renderer.render( scene, camera );
	
}
// Fonction pour calculer les coordonnées sphériques
function calculateSphericalCoordinates(radius, inclination, azimuth) {
    const x = radius * Math.sin(inclination) * Math.cos(azimuth);
    const y = radius * Math.cos(inclination);
    const z = radius * Math.sin(inclination) * Math.sin(azimuth);
    return { x, y, z };
}

// Calcul des coordonnées sphériques pour positionner la voiture sur la sphère
const sphereRadius = 2000; // Rayon de la sphère
const inclination = Math.PI / 4; // Angle d'inclinaison (45 degrés)
const azimuth = Math.PI / 2; // Angle en longitude (90 degrés)
const sphericalCoords = calculateSphericalCoordinates(sphereRadius, inclination, azimuth);

// Positionnement et rotation de la voiture sur la sphère
if (voiture) {
    voiture.position.set(sphericalCoords.x, sphericalCoords.y, sphericalCoords.z);
    // Vous pouvez ajuster la rotation de la voiture en fonction de la sphère
    voiture.rotation.x = azimuth; // Rotation autour de l'axe vertical (Y)
	
}

animate();