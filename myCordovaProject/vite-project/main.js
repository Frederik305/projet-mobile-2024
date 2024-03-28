import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.background=new THREE.Color(0xbfe3dd);






const groundGeometry = new THREE.PlaneGeometry(100, 100); // Adjust the size as needed
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate the ground to be flat
scene.add(ground);

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

const loader = new GLTFLoader();

loader.load( 'public/Muscle 2.glb', ( gltf )=> {
	voiture=gltf.scene;

	voiture.position.set(0, 1, 0); // Positionnement sur la sphère
    
	voiture.rotateY(Math.PI); //
	//resizeModel(0.8);
	

	scene.add( voiture );
    
	const cameraOffset = new THREE.Vector3(0, 400, cameraDistance);
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(voiture.position).add(cameraOffset);
    
    camera.position.copy(cameraPosition);
    
    // Look at the car
    camera.lookAt(voiture.position);
    camera.rotation.x -= -0.2;
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

	//voiture.rotation.x += 0.01;
	//voiture.rotation.y += 0.01;

	renderer.render( scene, camera );
	
}




animate();