import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.background=new THREE.Color(0xbfe3dd);



camera.position.set(0,200,700);

// Création de la sphère pour le sol du jeu
var groundGeometry = new THREE.SphereGeometry(500, 32, 32); // Rayon, segments en X et segments en Y
var groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }); // Couleur verte avec fil de fer
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(ground);


// Ajout de lumières à la scène
var ambientLight = new THREE.AmbientLight(0xffffff, 1); // Lumière ambiante
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Lumière directionnelle
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}


let voiture;

const loader = new GLTFLoader();

loader.load( 'public/Sports.glb', ( gltf )=> {
	voiture=gltf.scene
	voiture.position.x =0;
	resizeModel(0.8)
	voiture.rotation.y=3.1 ;
	camera.lookAt(voiture.position);
	scene.add( voiture );
	renderer.render( scene, camera );
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

	voiture.rotation.x += 0.01;
	//voiture.rotation.y += 0.01;
	
	
}

animate();