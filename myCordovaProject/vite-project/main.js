import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.background=new THREE.Color(0xbfe3dd);

const geometry = new THREE.BoxGeometry( 2, 3, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
let voiture;

const loader = new GLTFLoader();

loader.load( 'public/Sports.glb', ( gltf )=> {
	voiture=gltf.scene
	scene.add( voiture );

}, undefined, function ( error ) {

	console.error( error );

} );

function resizeModel(scale) {
    if (voiture) {
        voiture.scale.set(scale, scale, scale);
    }
}
resizeModel()

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.002;

	renderer.render( scene, camera );
}

animate();