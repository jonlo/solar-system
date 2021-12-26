import { SphereGeometry, MeshBasicMaterial, Mesh } from 'three';

export class Planet {

	constructor (color, radius, distance, speed, name) {
		this.color = color;
		this.radius = radius;
		this.distance = distance;
		this.speed = speed;
		this.name = name;
		this.mesh = this.createMesh();
	}

	createMesh(){
		var geometry = new SphereGeometry(this.radius, 32, 16);
		var material = new MeshBasicMaterial( { color: this.color } );
		var mesh = new Mesh(geometry, material);
		mesh.position.set(this.distance, 0, 0);
		return mesh;
	}
}