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
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cards = [];

for (let i = 0; i < 5; i++) {
  const card = new THREE.Mesh(geometry, material.clone());
  card.position.set(i * 3 - 6, 0, -10);
  scene.add(card);
  cards.push(card);
}

// Raycaster for click detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let selectedCard = null;
let expanding = false;

function onDocumentMouseDown(event) {
  if (expanding) return;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cards);

  if (intersects.length > 0) {
    selectedCard = intersects[0].object;
    expanding = true;

    // Animate the card to expand
    gsap.to(selectedCard.scale, { x: 3, y: 4, z: 0.2, duration: 1 });
    gsap.to(selectedCard.position, {
      z: -5,
      duration: 1,
      onComplete: showProjectInfo
    });
  }
}

function showProjectInfo() {
  // Show project info in an overlay
  const overlay = document.createElement("div");
  overlay.className = "project-info";
  overlay.innerHTML = `
    <h2>Project Title</h2>
    <p>Details about the project go here. You can add descriptions, tools used, and links.</p>
    <button onclick="closeProject()">Close</button>
  `;
  document.body.appendChild(overlay);
}

// Close project and reset the card
function closeProject() {
  gsap.to(selectedCard.scale, { x: 1, y: 1, z: 0.2, duration: 1 });
  gsap.to(selectedCard.position, {
    z: -10,
    duration: 1,
    onComplete: () => {
      document.querySelector(".project-info").remove();
      expanding = false;
      selectedCard = null;
    }
  });
}

document.addEventListener("mousedown", onDocumentMouseDown);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  cards.forEach((card, index) => {
    if (!expanding) {
      card.rotation.y += 0.01 * (index + 1);
      card.rotation.x += 0.005 * (index + 1);
    }
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
