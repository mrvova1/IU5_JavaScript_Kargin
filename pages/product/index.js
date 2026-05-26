import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main page/index.js";

export class ProductPage {
    constructor(parent, id, src, data) {
        this.parent = parent;
        this.id = id;
        this.src = src;
        this.data = data;
    }

    getData() {
        return {
            id: 1,
            src: this.src,
            title: `Акция ${this.id}`,
            text: `${this.data}`
        }
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        const product = new ProductComponent(this.pageRoot);
        product.render(data);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));
    }
}
