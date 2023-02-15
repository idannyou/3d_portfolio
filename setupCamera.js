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

export { camera, scene, renderer };
