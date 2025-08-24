import * as THREE from "three";
import getLayer from "./getLayer.js";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const ctrls = new OrbitControls(camera, renderer.domElement);
ctrls.enableDamping = true;
ctrls.enableZoom = false; //  blokujemy scroll
ctrls.enableRotate = false; //  blokujemy obrót (tylko myszka steruje modelem)

const gltfloader = new GLTFLoader();
let astronaut = null;

gltfloader.load("models/Astronaut.glb", (gltf) => {
  astronaut = gltf.scene;
  astronaut.traverse((child) => {
    if (child.isMesh) {
      child.geometry.center();
    }
  });
  scene.add(astronaut);
});

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

// Sprites BG
const gradientBackground = getLayer({
  hue: 0.5,
  numSprites: 8,
  opacity: 0.2,
  radius: 10,
  size: 24,
  z: -15.5,
});
scene.add(gradientBackground);

// 📌 zmienne dla pozycji myszy
let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  requestAnimationFrame(animate);

  // 📌 poruszamy astronautą w zależności od myszy
  if (astronaut) {
    astronaut.rotation.y = mouseX * 0.5; // obrót lewo/prawo
    astronaut.rotation.x = mouseY * 0.3; // obrót góra/dół
    astronaut.position.x = mouseX * 1.5; // przesunięcie w osi X
    astronaut.position.y = mouseY * 1.0; // przesunięcie w osi Y
  }

  renderer.render(scene, camera);
  ctrls.update();
}

animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
