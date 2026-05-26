export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card" id=${data.id}>
                <img class="card-img-top glasses-img" src="static/img/${data.src}" alt="картинка">
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
        if (listener) {
            const button = document.getElementById(`click-card-${data.id}`);
            if (button) {
                button.addEventListener("click", listener);
            }
        }
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}