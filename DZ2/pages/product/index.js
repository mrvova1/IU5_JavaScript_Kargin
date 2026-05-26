import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main page/index.js";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class ProductPage {
  constructor(parent, id, src, data, modelPath) {
    this.parent = parent;
    this.id = id;
    this.src = src;
    this.data = data;
    this.modelPath = modelPath;
  }

  get pageRoot() {
    return document.getElementById('product-page');
  }

  getHTML() {
    return `
      <div id="product-page">
        <canvas id="viewer-canvas" style="width:100vw; height:70vh; display:block; background:#e6ebf5;"></canvas>
        <div id="viewer-controls" style="display:flex; gap:12px; margin:20px;">
          <button id="zoom-in">+</button>
          <button id="zoom-out">−</button>
          <button id="view-front">Вид спереди</button>
          <button id="view-back">Сзади</button>
          <button id="view-left">Слева</button>
          <button id="view-right">Справа</button>
        </div>
        <div style="text-align:center; margin-top:1rem;">
          <h3>${this.data.title || '3D модель'}</h3>
          <p>${this.data.detail || ''}</p>
        </div>
      </div>
    `;
  }

  init3DViewer() {
    const canvas = document.getElementById('viewer-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe6ebf5);

    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.target.set(0, 1, 0);

    // Освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(4, 10, 8);
    scene.add(dirLight);

    const loader = new GLTFLoader();
    loader.load(this.modelPath, (gltf) => {
      const model = gltf.scene;
      // Центрирование модели
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      model.position.y += (box.max.y - box.min.y) / 2;
      scene.add(model);
    }, undefined, (err) => console.error("Ошибка загрузки модели:", err));

    // Кнопки управления
    document.getElementById('zoom-in').onclick = () => {
      camera.position.sub(camera.position.clone().sub(controls.target).normalize().multiplyScalar(0.5));
      controls.update();
    };
    document.getElementById('zoom-out').onclick = () => {
      camera.position.add(camera.position.clone().sub(controls.target).normalize().multiplyScalar(0.5));
      controls.update();
    };
    const setView = (x, z) => {
      const dist = camera.position.distanceTo(controls.target);
      camera.position.set(x, 2, z);
      controls.target.set(0, 1, 0);
      controls.update();
    };
    document.getElementById('view-front').onclick = () => setView(0, dist());
    document.getElementById('view-back').onclick = () => setView(0, -dist());
    document.getElementById('view-left').onclick = () => setView(-dist(), 0);
    document.getElementById('view-right').onclick = () => setView(dist(), 0);

    function dist() { return camera.position.distanceTo(controls.target); }

    function resize() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    }
    window.addEventListener('resize', resize);
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
    resize();
  }

  clickBack() {
    const mainPage = new MainPage(this.parent);
    mainPage.render();
  }

  render() {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('beforeend', this.getHTML());
    if (this.modelPath) {
      this.init3DViewer();
    }
    const backButton = new BackButtonComponent(this.pageRoot);
    backButton.render(this.clickBack.bind(this));
  }
}