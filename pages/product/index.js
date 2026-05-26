import { ProductComponent } from "../../components/product/index.js"; // Исправлен импорт компонента карточки
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main page/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, id, src, data) {
        this.parent = parent;
        this.id = id;
        this.src = src;
        this.data = data;
    }

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            this.renderData(data);
        });
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        );
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    // Добавлен недостающий метод clickCard, чтобы не падало на bind(this)
    clickCard(e, item) {
        const card = e.target.closest('.card');
        if (!card) return;

        // Открываем новую карточку при клике (если внутри страницы товара выводится список других товаров)
        const productPage = new ProductPage(this.parent, item.id, item.src, item.detail);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.getData();
    }

    renderData(item) {
            const productCard = new ProductComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
    }
}
