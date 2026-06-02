# Домашнее задание: DZ1 + DZ2

**Каргин В.В. ИУ5-44Б**

## Содержание
- [Цель работы](#цель-работы)
- [Тема](#тема)
- [Сайт для вдохновения](#сайт-для-вдохновения)
- [Главное о проекте (теория)](#главное-о-проекте-теория)
- [Структура проекта](#структура-проекта)
- [Дополнительные задания](#дополнительные-задания)
- [Порядок показа](#порядок-показа)

## Цель работы
Закрепить работу с коллекциями, функциями, классами и клиентской частью веб-приложения, а также реализовать просмотр 3D-модели и компоненты интерфейса.

## Тема
Сайт медосмотров

## Сайт для вдохновения
[Медосмотр](https://medosmotri.ru/)
[Медосмотр](https://www.goldenmed.ru/)

## Главное о проекте (теория)
Домашнее задание состоит из двух частей.

### DZ1
В первой части используются базовые возможности JavaScript:
- чтение данных из стандартного ввода;
- разбор JSON;
- обход массива по индексам;
- сравнение значений, массивов и объектов через отдельные функции.

### DZ2
Во второй части реализовано веб-приложение на JavaScript:
- карточки собираются как отдельные компоненты;
- данные карточек хранятся в отдельном файле;
- переход на страницу товара происходит по клику по карточке;
- 3D-модель отображается через `three.js`;
- для работы с моделью используются `OrbitControls` и `GLTFLoader`.

## Структура проекта
### DZ1
- `DZ1/DZ1.cpp` — решения заданий на матрицу и сравнение;

### DZ2
- `DZ2/components/back-button/index.js` — кнопка возврата;
- `DZ2/components/button/index.js` — тестовая кнопка;
- `DZ2/components/product/index.js` — карточка с описанием;
- `DZ2/components/product-card/index.js` — карточка товара с 3D-превью;
- `DZ2/pages/main page/index.js` — главная страница со списком карточек;
- `DZ2/pages/product/index.js` — страница просмотра модели;
- `DZ2/public/static/js/3dUtils.js` — предпросмотр модели в canvas;
- `DZ2/public/static/js/data.js` — данные для карточек;
- `DZ2/public/static/js/main_page.js` — точка входа;
- `DZ2/public/static/css/Main.css` и `DZ2/public/static/css/navigation.css` — стили;
- `DZ2/public/main_page.html` и `DZ2/public/navigation.html` — HTML-страницы;
- `DZ2/public/static/models/` — 3D-модели `.glb`.

## Дополнительные задания

### DZ1

#### 1. Дана квадратная матрица. Верните сумму основной и побочной диагоналей.
Код из лабораторной, который решает это задание:

```js
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8'); 
const mas = JSON.parse(input);

let dia = 0;
for (let i = 0; i < mas.length; i++) {
    if (i < mas[i].length) {
        dia += mas[i][i];
    }
}

let altdia = 0;
for (let i = mas.length-1; i > -1; i--) {
    if ((i < mas[i].length) & (i > -1)) {
        altdia += mas[i][i];
    }
}

console.log(dia);
console.log(altdia);
```

#### 2. Напишите функцию `isEqualObj`, которая сравнивает два объекта и возвращает `true`, если они идентичны.
Код из лабораторной, который решает это задание:

```js
function isEqualObj(a, b){
    if (a === b){
        return true;
    }
    else return false;
}
```

#### 3. Напишите функцию `isEqualArrays`, которая сравнивает два массива и возвращает `true`, если они идентичны.
Код из лабораторной, который решает это задание:

```js
function isEqualArrays(a, b){
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; i++){
        if (!isEqualObj(a[i], b[i])) return false;
    }
    return true
}
```

### DZ2

#### 1. Отображение карточки товара и предпросмотр 3D-модели.
Код из проекта, который отвечает за это:

```js
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

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(4, 10, 8);
    scene.add(dirLight);

    const loader = new GLTFLoader();
    loader.load(this.modelPath, (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      model.position.y += (box.max.y - box.min.y) / 2;
      scene.add(model);
    }, undefined, (err) => console.error("Ошибка загрузки модели:", err));

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
```

## Порядок показа
Сначала рассказать про DZ1: матрица, сравнение объектов и массивов. Затем показать DZ2: карточки, предпросмотр модели, страницу просмотра и управление камерой.
