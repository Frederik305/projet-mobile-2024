import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.background=new THREE.Color(0xbfe3dd);



camera.position.set(0,200,600);

let voiture;

const loader = new GLTFLoader();

loader.load( 'public/Sports.glb', ( gltf )=> {
	voiture=gltf.scene
	voiture.position.x =0;
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
	voiture.rotation.y += 0.01;

	
}

//animate();