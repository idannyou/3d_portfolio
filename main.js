import './style.css';

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  // 75 is the view based of off 360
  75,
  // second arg is the aspect ratio
  window.innerWidth / window.innerHeight,
  0.1, // view frustum; to control what is visible from the camera
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
}); // which DOM to render

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); //make it full screen
camera.position.setZ(30); //initally in the middle, move it to 30

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
