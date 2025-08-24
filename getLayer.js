import * as THREE from "three";

function getLayer({
  width = 100,
  height = 50,
  z = -10,
} = {}) {
  // Tworzymy białą płaszczyznę
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshBasicMaterial({ color: 0xf0f0f0, side: THREE.DoubleSide });
  const plane = new THREE.Mesh(geometry, material);

  plane.position.z = z;

  return plane;
}

export default getLayer;