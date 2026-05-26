import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function renderPreviewToCanvas(canvas, modelPath) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setClearColor(0xe6ebf5, 1);
  renderer.setSize(canvas.width, canvas.height, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 0.1, 1000);
  camera.position.set(0, 0.7, 2);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(2, 6, 4);
  scene.add(dirLight);

  const loader = new GLTFLoader();

  function normalizeModel(obj) {
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    obj.position.x -= box.getCenter(new THREE.Vector3()).x;
    obj.position.z -= box.getCenter(new THREE.Vector3()).z;
    obj.position.y -= box.min.y;
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) obj.scale.multiplyScalar(1.1 / maxDim);
  }

  loader.load(modelPath, (gltf) => {
    const model = gltf.scene;
    normalizeModel(model);
    scene.add(model);
    renderer.render(scene, camera);
  }, undefined, (err) => {
    console.error("Ошибка загрузки модели:", err);
    drawFallback(canvas);
  });

  function drawFallback(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#dde6f2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "56px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#666";
    ctx.fillText("🧩", canvas.width / 2, canvas.height / 2);
  }
}