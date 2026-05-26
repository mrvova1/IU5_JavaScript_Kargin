export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card-info mb-3" ">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="static/img/${data.src}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-info-body">
                                <h5 class="card-titles">${data.title}</h5>
                                <p class="card-text">${data.text}</p>
                                <p class="card-text">Здесь могла бы быть информация о враче и больнице но мне лень ее добавлять</p>
                                <p class="card-text">Здесь мог бы быть подробный чек но мне лень ее добавлять</p>
                                <p class="card-text">Здесь могла бы быть карта но мне лень ее добавлять</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
