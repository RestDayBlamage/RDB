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

// Zwiększamy oświetlenie hemisferyczne
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.5); // ostatni parametr to intensywność
scene.add(hemiLight);

// Dodajemy mocne światło kierunkowe
const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(5, 10, 5); // ustawienie pozycji światła
dirLight.castShadow = true; // opcjonalnie jeśli chcesz cienie
scene.add(dirLight);

// Możesz też dodać miękkie wypełniające światło z tyłu
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-5, -5, 5);
scene.add(fillLight);

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

scene.background = new THREE.Color(0xf0f0f0);

// 📌 zmienne dla pozycji myszy
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener("mousemove", (event) => {
  targetX = (event.clientX / window.innerWidth) * 2 - 1;
  targetY = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  requestAnimationFrame(animate);

  // 📌 płynne przejście pozycji i rotacji
  const lerpFactor = 0.05; // im mniejsze, tym wolniej reaguje model
  currentX += (targetX - currentX) * lerpFactor;
  currentY += (targetY - currentY) * lerpFactor;

if (astronaut) {
  astronaut.rotation.y = currentX * 0.5 + performance.now() * 0.0001; // + obrót wokół osi Y
  astronaut.rotation.x = currentY * 0.3;
  astronaut.position.x = currentX * 1.5;
  astronaut.position.y = currentY * 1.0;
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

