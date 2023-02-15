import * as THREE from 'three';

import './style.css';
import { addStar } from './addStar';
import { camera, scene, renderer } from './setupCamera';

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xd9dbec,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

// ambientlight is like a flood light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight, pointLight);

// Add 200 stars
Array(200).fill().forEach(addStar(scene));

// adding background
const spaceTexture = new THREE.TextureLoader().load('stars.jpg');
scene.background = spaceTexture;

// avatar
const avatarTexture = new THREE.TextureLoader().load('danny.jpeg');

const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: avatarTexture })
);
scene.add(avatar);

avatar.position.z = -5;

// planet
const planetTexture = new THREE.TextureLoader().load('earth.jpeg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: planetTexture,
    normalMap: normalTexture,
  })
);

planet.position.z = 30;
planet.position.setX(-10);

scene.add(planet);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  planet.rotation.x += 0.05;
  planet.rotation.y += 0.075;
  planet.rotation.z += 0.05;

  avatar.rotation.y += 0.01;
  avatar.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
