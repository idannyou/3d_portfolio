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
const material = new THREE.MeshBasicMaterial({
  color: 0xff6347,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus); //need to add scene

function animate() {
  // The window.requestAnimationFrame() method tells the browser
  // that you wish to perform an animation and requests
  // that the browser calls a specified function
  // to update an animation before the next repaint.
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}

// game loop aka while loop to keep rendering via animate function
animate();
