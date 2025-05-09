const modelsArray = ["Assembly1.glb", "Assembly1.glb", "share.glb"];
const parts = [
  ["Solid1", "Solid1_10"], // Ram
  ["Solid1_22", "Solid1_23", "Solid1_28", "Solid1_29"], // Hjul
  ["Solid1_20", "Solid1_21"], // Hjulhus
  ["Solid1_15"], // Sittyta
  ["Solid1_1"], // Ryggstöd
  ["Solid1_30", "Solid1_31"], // Handtag
  [
    "Solid1_2",
    "Solid1_3",
    "Solid1_4",
    "Solid1_5",
    "Solid1_6",
    "Solid1_7",
    "Solid1_8",
    "Solid1_9",
    "Solid1_11",
    "Solid1_12",
    "Solid1_13",
    "Solid1_14",
    "Solid1_16",
    "Solid1_17",
    "Solid1_18",
    "Solid1_19",
  ], // Gångjärn
  ["Solid1_24", "Solid1_25", "Solid1_26", "Solid1_27"], //Hjulbult
];
const configurations = [
  ["red", "blue", "green", "yellow", "orange", "black", "white"],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];
const loader = new GLTFLoader();
let activeComponentIndex = 0; // default to first component (Ram)

/*
modelsArray.forEach((modelPath) => {
  loader.load(
    modelPath,
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);
      model.scale.set(5, 5, 5);
      model.rotation.set(Math.PI / 1, 0, Math.PI / 2);
    },
    undefined,
    (error) => {
      console.error("Error loading model:", error);
    }
  );
});
*/
// Get all the color boxes
const appliedColors = new Array(parts.length).fill("#aaaaaa"); // default color

function applyColorToPartGroup(index, colorHex) {
  const group = parts[index];
  if (!group || !model) return;

  appliedColors[index] = colorHex; // Save the selected color

  model.traverse((child) => {
    if (child.isMesh && group.includes(child.name)) {
      child.material = child.material.clone(); // avoid shared state
      child.material.color.set(colorHex);
    }
  });
}

document.querySelectorAll(".color-circle").forEach((circle) => {
  circle.style.backgroundColor = circle.dataset.color;

  circle.addEventListener("click", () => {
    const selectedColor = circle.dataset.color;
    applyColorToPartGroup(activeComponentIndex, selectedColor);
  });
});

const colors = [
  "#ff0000", // Red
  "#ff69b4", // Pink
  "#ffa500", // Orange
  "#ffff00", // Yellow
  "#808000", // Olive
  "#00ff00", // Green
  "#00ffff", // Cyan
  "#0000ff", // Blue
  "#800080", // Purple
  "#a52a2a", // Brown
  "#000000", // Black
  "#ffffff", // White
  "#aaaaaa", // Default/Gray
  "#c71585", // Medium Violet Red
  "#d3d3d3", // Light Gray
  "#ffd700", // Gold
  "#8b4513", // Saddle Brown
  "#32cd32", // Lime Green
  "#ff6347", // Tomato
  "#9932cc", // Dark Orchid
  "#ff4500", // Orange Red
  "#adff2f", // Green Yellow
  "#7fff00", // Chartreuse
  "#4682b4", // Steel Blue
];

document.querySelectorAll(".color-box").forEach((box, i) => {
  box.addEventListener("click", () => {
    // Remove active state
    document
      .querySelectorAll(".color-box")
      .forEach((b) => b.classList.remove("active"));
    box.classList.add("active");

    // Apply color to currently active component
    const selectedColor = configurationColors[i] || "#aaaaaa";
    applyColorToPartGroup(activeComponentIndex, selectedColor);
  });
});

document.querySelectorAll(".component").forEach((component) => {
  component.addEventListener("click", () => {
    document
      .querySelectorAll(".component")
      .forEach((c) => (c.dataset.active = "false"));
    component.dataset.active = "true";

    activeComponentIndex = index; // <--- Set current index
    document.getElementById("menu-header").textContent =
      component.textContent.trim();

    highlightPartGroup(index); // optional, to highlight when selected
    // Här kan du lägga till logik för att uppdatera 3D-modellen
  });
});

document.querySelectorAll(".component").forEach((component) => {
  component.addEventListener("click", () => {
    // Reset all components
    document.querySelectorAll(".component").forEach((c) => {
      c.dataset.active = "false";
    });

    // Activate the clicked one
    component.dataset.active = "true";

    // Update the header text
    const header = document.getElementById("menu-header");
    header.textContent = component.textContent.trim();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const klarButton = document.getElementById("klar");
  klarButton.addEventListener("click", () => {
    window.location.href = "done.html"; // Replace with your desired page
  });
});

document.querySelectorAll(".component").forEach((component) => {
  component.addEventListener("click", () => {
    document
      .querySelectorAll(".component")
      .forEach((c) => (c.dataset.active = "false"));
    component.dataset.active = "true";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const klarButton = document.getElementById("klar");
  klarButton.addEventListener("click", () => {
    window.location.href = "done.html"; // Redirect when "Klar" is clicked
  });
});

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js"; // Import Three.js module
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.176.0/examples/jsm/loaders/GLTFLoader.js"; // Import the GLTFLoader

let scene, camera, renderer, model;
let isDragging = false;
let prevX = 0;
let prevY = 0;
let isAutoRotating = true;

let pivotPoint;

function init3D() {
  // Get canvas and its actual size
  const canvas = document.getElementById("product-viewer");
  const rect = canvas.getBoundingClientRect();

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  // Camera
  camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000);
  camera.position.z = 5;

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(rect.width, rect.height);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  // Load the 3D model (use the path to your GLTF/GLB file)
  const loader = new GLTFLoader();
  loader.load(
    modelsArray[0],
    (gltf) => {
      model = gltf.scene;

      // Center the model by calculating the bounding box
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());

      // Reposition the model so its center is at the origin
      model.position.sub(center);

      scene.add(model);
      model.scale.set(3, 3, 3); // Change this value to scale differently

      model.rotation.set(0, Math.PI / 1, 0); // Example: Rotate 45 degrees along the Y-axis
      model.rotation.set((1.2 * Math.PI) / 1, 3.6, Math.PI / 1); // Rotate 45 degrees along the X-axis
      /* Style all parts*/
      // Set default and highlight colors
      const defaultColor = new THREE.Color(0xaaaaaa);
      const highlightColor = new THREE.Color(0xffffff); // Light color for selection

      // Utility to reset all parts to default color
      function resetModelColors() {
        model.traverse((child) => {
          if (child.isMesh) {
            child.material = child.material.clone(); // Clone to prevent sharing
            child.material.color.copy(defaultColor);
          }
        });
      }

      // Utility to highlight a part group by index
      function highlightPartGroup(index) {
        if (!model) return;

        model.traverse((child) => {
          if (!child.isMesh) return;

          // Find which group this mesh belongs to
          let foundIndex = parts.findIndex((group) =>
            group.includes(child.name)
          );
          if (foundIndex !== -1) {
            const savedColor = appliedColors[foundIndex] || "#aaaaaa";
            child.material = child.material.clone();
            child.material.color.set(savedColor);
          }
        });
      }

      // Hook component buttons to color logic
      document.querySelectorAll(".component").forEach((component, index) => {
        component.addEventListener("click", () => {
          activeComponentIndex = index; // now it's correctly scoped
          document
            .querySelectorAll(".component")
            .forEach((c) => (c.dataset.active = "false"));
          component.dataset.active = "true";

          document.getElementById("menu-header").textContent =
            component.textContent.trim();

          highlightPartGroup(index); // highlight selected part group
        });
      });
      // Create a small red sphere at the pivot point
      const geometry = new THREE.SphereGeometry(0.1, 32, 32); // Small sphere
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
      pivotPoint = new THREE.Mesh(geometry, material);

      // Add the pivot point to the scene at the center
      scene.add(pivotPoint);

      animate();
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

  // Add drag events
  canvas.addEventListener("pointerdown", onPointerDown, false);
  canvas.addEventListener("pointermove", onPointerMove, false);
  canvas.addEventListener("pointerup", onPointerUp, false);
}

function animate() {
  requestAnimationFrame(animate);

  if (model) {
    // Rotate the model if it's loaded
    if (!isAutoRotating) {
      // Rotate the model automatically when auto-rotation is enabled
      model.rotation.y += 0.003;
    }
  }

  // Ensure the pivot point remains at the center of the model
  if (pivotPoint) {
    pivotPoint.position.set(
      model.position.x,
      model.position.y,
      model.position.z
    );
  }

  renderer.render(scene, camera);
}

function onPointerDown(event) {
  isDragging = true;
  prevX = event.clientX;
  prevY = event.clientY;
}

function onPointerMove(event) {
  if (isDragging && model) {
    const deltaX = event.clientX - prevX;
    const deltaY = event.clientY - prevY;

    // Rotate the model based on the mouse movement
    model.rotation.y -= deltaX * 0.005;
    model.rotation.x += deltaY * 0.005;

    prevX = event.clientX;
    prevY = event.clientY;
  }
}

function onPointerUp() {
  isDragging = false;
}

window.addEventListener("resize", () => {
  const canvas = document.getElementById("product-viewer");
  const rect = canvas.getBoundingClientRect();
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
  renderer.setSize(rect.width, rect.height);
});

init3D();

// Add event listener to the "Rotera" button to toggle auto-rotation
document.getElementById("rotate-btn").addEventListener("click", () => {
  isAutoRotating = !isAutoRotating; // Toggle the rotation state
  const buttonText = isAutoRotating ? "Start Rotation" : "Stopp Rotation";
  document.getElementById("rotate-btn").textContent = buttonText; // Change button text
});
