import * as THREE from "three";
import getLayer from "./getLayer.js";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";

/** ---------- Podstawy sceny ---------- */
const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(0, 1.2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const ctrls = new OrbitControls(camera, renderer.domElement);
ctrls.enableDamping = true;

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

/** ---------- Podłoga do cieni ---------- */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.ShadowMaterial({ opacity: 0.18 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2.5;
floor.receiveShadow = true;
scene.add(floor);

/** ---------- Ładowanie modeli ---------- */
const gltfloader = new GLTFLoader();

const objects = [];
const velocities = [];
const radii = [];
const isAstronaut = []; // flaga: true = astronauta, false = otu

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function computeBoundingSphere(object3D) {
  const box = new THREE.Box3().setFromObject(object3D, true);
  const sphere = new THREE.Sphere();
  box.getBoundingSphere(sphere);
  return sphere;
}

// Astronauta w centrum (statyczny)
gltfloader.load("models/Astronaut.glb", (gltf) => {
  const model = gltf.scene;
  model.scale.set(0.8, 0.8, 0.8);
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.geometry.center();
    }
  });
  model.position.set(0, 1, 0);
  scene.add(model);

  const v = new THREE.Vector3(0, 0, 0);
  const sphere = computeBoundingSphere(model);
  const r = Math.max(0.3, sphere.radius * 0.55);

  objects.push(model);
  velocities.push(v);
  radii.push(r);
  isAstronaut.push(true); // astronaut
});

// Dodajemy kilka Otu
const OBJECT_COUNT = 20;
for (let i = 0; i < OBJECT_COUNT; i++) {
  gltfloader.load("models/otu.glb", (gltf) => {
    const model = gltf.scene;
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const s = randomInRange(0.3, 0.5);
    model.scale.setScalar(s);
    model.position.set(
      randomInRange(-3, 3),
      randomInRange(-2, 2),
      randomInRange(-2.5, 2.5)
    );

    // 📌 losowa rotacja startowa
    model.rotation.set(
      randomInRange(0, Math.PI * 2),
      randomInRange(0, Math.PI * 2),
      randomInRange(0, Math.PI * 2)
    );

    scene.add(model);

    const v = new THREE.Vector3(
      randomInRange(-0.5, 0.5),
      randomInRange(-0.5, 0.5),
      randomInRange(-0.5, 0.5)
    );

    const sphere = computeBoundingSphere(model);
    const r = Math.max(0.2, sphere.radius * 0.55);

    objects.push(model);
    velocities.push(v);
    radii.push(r);
    isAstronaut.push(false); // otu
  });
}

/** ---------- Interakcja myszką ---------- */
const raycaster = new THREE.Raycaster();
const mouseNDC = new THREE.Vector2();
let dragging = null;
let dragOffset = new THREE.Vector3();
let dragPlane = new THREE.Plane();
const tmpVec3 = new THREE.Vector3();
let lastDragPos = new THREE.Vector3(); // 📌 zapamiętuje poprzednią pozycję

function getIntersections() {
  raycaster.setFromCamera(mouseNDC, camera);
  const hits = raycaster.intersectObjects(objects, true);
  if (hits.length === 0) return null;
  let root = hits[0].object;
  while (root.parent && !objects.includes(root)) root = root.parent;
  return { root, point: hits[0].point };
}

function onPointerMove(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  if (dragging) {
    raycaster.setFromCamera(mouseNDC, camera);
    const hitPoint = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(dragPlane, hitPoint)) {
      const target = hitPoint.sub(dragOffset);
      dragging.position.lerp(target, 0.35);

      // 📌 aktualizacja velocity przeciąganego obiektu
      const idx = objects.indexOf(dragging);
      if (idx !== -1) {
        velocities[idx].copy(dragging.position).sub(lastDragPos);
        lastDragPos.copy(dragging.position);
      }
    }
  }
}

function onPointerDown(e) {
  onPointerMove(e);
  const hit = getIntersections();
  if (hit) {
    dragging = hit.root;
    ctrls.enabled = false;
    const camDir = camera.getWorldDirection(tmpVec3).clone().normalize();
    dragPlane.setFromNormalAndCoplanarPoint(camDir, hit.point);
    dragOffset.copy(hit.point).sub(dragging.position);

    lastDragPos.copy(dragging.position); // 📌 zapamiętaj startową pozycję
  }
}
function onPointerUp() {
  dragging = null;
  ctrls.enabled = true;
}

renderer.domElement.addEventListener("pointermove", onPointerMove);
renderer.domElement.addEventListener("pointerdown", onPointerDown);
renderer.domElement.addEventListener("pointerup", onPointerUp);
renderer.domElement.addEventListener("pointerleave", onPointerUp);

/** ---------- Fizyka i kolizje ---------- */
const clock = new THREE.Clock();
const CENTER = new THREE.Vector3(0, 0, 0);
const SPRING = 0.9;
const DAMPING = 0.92;

function handleCollisions() {
  for (let i = 0; i < objects.length; i++) {
    for (let j = i + 1; j < objects.length; j++) {
      const A = objects[i], B = objects[j];
      if (!A || !B) continue;

      const n = tmpVec3.subVectors(A.position, B.position);
      const dist = n.length();
      const minDist = radii[i] + radii[j];
      if (dist > 0 && dist < minDist) {
        n.divideScalar(dist);
        const penetration = (minDist - dist);
        const correction = n.clone().multiplyScalar(penetration * 0.5);
        A.position.add(correction);
        B.position.sub(correction);

        const va = velocities[i];
        const vb = velocities[j];
        const relVel = va.clone().sub(vb);
        const sepSpeed = relVel.dot(n);
        if (sepSpeed < 0) {
          const impulse = n.clone().multiplyScalar(-(1.5) * sepSpeed);
          va.add(impulse.clone().multiplyScalar(0.5));
          vb.sub(impulse.clone().multiplyScalar(0.5));
        }
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(0.033, clock.getDelta());

  if (objects.length > 1) handleCollisions();

  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];
    const vel = velocities[i];

    // Astronauta stoi w miejscu → bez unoszenia i obrotu
    if (isAstronaut[i]) continue;

    // Otu się ruszają
    const toCenter = CENTER.clone().sub(obj.position);
    vel.add(toCenter.multiplyScalar(SPRING * dt));

    // 📌 jeśli przeciągam — pozycja jest już ustawiana w onPointerMove,
    // ale velocity nadal się liczy i bierze udział w kolizjach
    if (dragging !== obj) {
      obj.position.addScaledVector(vel, dt);
    }

    vel.multiplyScalar(Math.pow(DAMPING, dt * 60));

    // obrót otu
    obj.rotation.y += 0.4 * dt;
    obj.rotation.x += 0.18 * dt;
  }

  ctrls.update();
  renderer.render(scene, camera);
}
animate();

/** ---------- Resize ---------- */
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
