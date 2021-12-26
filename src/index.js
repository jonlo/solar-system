import { WebGLRenderer, Scene, PerspectiveCamera, Matrix4, Math } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Planet } from './planet.js';

var container,
	camera,
	scene,
	renderer,
	controls;
let planets = [];
main();

function main() {
	// dom
	container = document.createElement('div');
	window.addEventListener('resize', onWindowResize, false);
	document.body.appendChild(container);

	// renderer
	renderer = new WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	// scene
	scene = new Scene();
	// camera
	camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(10, 10, 15);

	//controls
	controls = new OrbitControls(camera, renderer.domElement);
	//controls.update() must be called after any manual changes to the camera's transform
	controls.update();
	createPlanets();


};

function createPlanets() {

	planets.push(new Planet(0xffff00, 15, 0, 0, 'sun'));
	planets.push(new Planet(0xffffff, 0.1, 20, 0.1, 'mercury'));
	planets.push(new Planet(0xffffff, 1, 30, 0.1, 'venus'));
	planets.push(new Planet(0xffffff, 1, 40, 0.1, 'earth'));
	planets.push(new Planet(0xffffff, 1, 50, 0.1, 'mars'));
	planets.push(new Planet(0xffffff, 1, 65, 0.1, 'jupiter'));
	planets.push(new Planet(0xffffff, 1, 80, 0.1, 'saturn'));
	planets.push(new Planet(0xffffff, 1, 95, 0.1, 'uranus'));
	planets.push(new Planet(0xffffff, 1, 100, 0.1, 'neptune'));
	planets.push(new Planet(0xffffff, 1, 125, 0.1, 'pluto'));

	for (const planet of planets) {
		scene.add(planet.mesh);
		// rotateAboutPoint(planet.mesh, new Vector3(0, 0, 0), new Vector3(1, 0, 0), Math.PI / 2, true);
	}



}

function rotateElem3dOnAxisY(object3d, degrees, pivotMatrix) {
	if (!pivotMatrix) {
		pivotMatrix = object3d.matrixWorld.clone();
	}
	var radians = Math.degToRad(degrees);
	var pivot_inv = new Matrix4().invert(pivotMatrix, false);
	object3d.applyMatrix4(pivot_inv);
	var desiredTransform = new Matrix4().makeRotationY(radians);
	object3d.applyMatrix4(desiredTransform);
	object3d.applyMatrix4(pivotMatrix);

};


function render() {
	renderer.render(scene, camera);
}

// animate            
(function animate() {
	for (const planet of planets) {
		if (planet.name !== 'sun') {
			rotateElem3dOnAxisY(planet.mesh, planet.speed, planets[0].mesh.matrixWorld);
		}
	}
	requestAnimationFrame(animate);
	controls.update();
	render();



}());

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}