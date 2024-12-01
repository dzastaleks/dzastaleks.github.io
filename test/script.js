// Basic Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#portfolioCanvas")
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(light);

// Geometry (3D Cards)
const geometry = new THREE.BoxGeometry(2, 3, 0.2);
const material = new THREE.MeshStandardMaterial({
  color: 0x0077ff,
  wireframe: false
});

// Create Multiple Cards
const cards = [];
for (let i = 0; i < 5; i++) {
  const card = new THREE.Mesh(geometry, material);
  card.position.set(i * 3 - 6, 0, -10);
  scene.add(card);
  cards.push(card);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate each card
  cards.forEach((card, index) => {
    card.rotation.y += 0.01 * (index + 1);
    card.rotation.x += 0.005 * (index + 1);
  });

  renderer.render(scene, camera);
}

animate();

// Handle Resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
