import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  // 75 is the view based of off 360
  75,
  // second arg is the aspect ratio
  window.innerWidth / window.innerHeight,
  0.1, // view frustum; to control what is visible from the camera
  1000
);

// which DOM to render
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
//make it full screen
renderer.setSize(window.innerWidth, window.innerHeight);
//initally in the middle, move it to 30
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//what material to wrap your shape
// MeshStandardMaterial reflects light
// MeshBasicMaterial is just a mesh
const material = new THREE.MeshStandardMaterial({
  color: 0xd9dbec,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus); //need to add scene

// pointlight creates a light bulb at a point
// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(20, 20, 20);
// scene.add(pointLight);

// // helper that shows where the light is
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

// ambientlight is like a flood light
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(ambientLight, pointLight);

// OrbitControls allows interaction 3D
// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

// Add 200 stars
Array(200).fill().forEach(addStar);

// adding background
const spaceTexture = new THREE.TextureLoader().load('stars.jpg');
scene.background = spaceTexture;

// avatar
const avatarTexture = new THREE.TextureLoader().load('danny.jpeg');

const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
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

function animate() {
  // The window.requestAnimationFrame() method tells the browser
  // that you wish to perform an animation and requests
  // that the browser calls a specified function
  // to update an animation before the next repaint.
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}

// game loop aka while loop to keep rendering via animate function
animate();
