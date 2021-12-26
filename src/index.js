import { WebGLRenderer, Scene, PerspectiveCamera, Matrix4, Math, EllipseCurve, LineBasicMaterial, Line, BufferGeometry } from 'three';
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
	camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
	camera.position.set(10, 10, 15);

	//controls
	controls = new OrbitControls(camera, renderer.domElement);
	//controls.update() must be called after any manual changes to the camera's transform
	controls.update();
	createPlanets();


};

function createPlanets() {
	const curve = new EllipseCurve(
		0,  0,            // ax, aY
		100, 100,           // xRadius, yRadius
		0,  2 * Math.PI,  // aStartAngle, aEndAngle
		false,            // aClockwise
		0                 // aRotation
	);
	
	const points = curve.getPoints( 50 );
	const geometry = new BufferGeometry().setFromPoints( points );
	const material = new LineBasicMaterial( { color : 0xff0000 } );
	// Create the final object to add to the scene
	const ellipse = new Line( geometry, material );
	scene.add(ellipse);
	planets.push(new Planet(0xffff00, 100, 0, 0, 'sun'));
	planets.push(new Planet(0xffffff, 4, 500, 1 / 88, 'mercury'));
	planets.push(new Planet(0xffffff, 7, 800, 1 / 225, 'venus'));
	planets.push(new Planet(0x0000ff, 7, 1400, 1 / 365, 'earth'));
	planets.push(new Planet(0xff0000, 7, 2000, 1 / 730, 'mars'));
	planets.push(new Planet(0xff5500, 20, 5000, 1 / 4328, 'jupiter'));
	planets.push(new Planet(0xffffff, 15, 10000, 1 / 10752, 'saturn'));
	planets.push(new Planet(0xffffff, 11, 12000, 1 / 30660, 'uranus'));
	planets.push(new Planet(0xffffff, 9, 13000, 1 / 60225, 'neptune'));
	planets.push(new Planet(0xffffff, 1, 15000, 1 / 60225, 'pluto'));

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