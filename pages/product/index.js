import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main page/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    async getData() {
        const { data, ok } = await ajax.get(stockUrls.getStockById(this.id));
        if (!ok) throw new Error('Не удалось загрузить данные товара');
        this.renderData(data);
    }

    renderData(item) {
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(() => this.clickBack());

        const product = new ProductComponent(this.pageRoot);
        product.render(item);
    }

    async render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        await this.getData();
    }
}