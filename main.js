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
  color: 0xff6347,
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

const gridHelper = new THREE.GridHelper(200, 50);

// ambientlight is like a flood light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight, gridHelper);

// OrbitControls allows interaction 3D
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  // The window.requestAnimationFrame() method tells the browser
  // that you wish to perform an animation and requests
  // that the browser calls a specified function
  // to update an animation before the next repaint.
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

// game loop aka while loop to keep rendering via animate function
animate();
