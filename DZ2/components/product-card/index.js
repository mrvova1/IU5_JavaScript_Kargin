import { renderPreviewToCanvas } from '../../public/static/js/3dUtils.js';

export class ProductCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    return `
      <div class="card" id=${data.id}>
        <canvas class="card-img-top preview-canvas" width="140" height="140" 
                style="width:100%; height:auto; background:#dde6f2; border-radius:12px;"></canvas>
        <div class="card-body">
          <h4 class="card-title card-titles">${data.title}</h4>
          <div class="card-description">
            <div class="card-text">Врач: ${data.name}</div>
            <div class="card-text">Длительность: ${data.time}</div>
            <div class="card-text">Адрес: ${data.adres}</div>
          </div>
          <div class="card-end">
            <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Записаться</button>
            <span class="money">${data.price}руб</span>
          </div>
        </div>
      </div>
    `;
  }

  addListeners(data, listener) {
    document
      .getElementById(`click-card-${data.id}`)
      .addEventListener("click", listener);
  }

  render(data, listener) {
    this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));

    const canvas = document.querySelector(`#card-${data.id} .preview-canvas`);
    if (canvas && data.modelPath) {
      renderPreviewToCanvas(canvas, data.modelPath);
    }
    
    this.addListeners(data, listener);
  }
}