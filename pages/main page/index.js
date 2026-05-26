import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [];
        this.filterValue = '';
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    async getData() {
        const { data, ok } = await ajax.get(stockUrls.getStocks());
        if (!ok) throw new Error('Не удалось загрузить данные');
        this.data = Array.isArray(data) ? data : [];
        this.renderData(this.data);
    }

    renderData(data) {
        const root = this.pageRoot;
        if (!root) return;
        root.innerHTML = '';
        data.forEach((item) => {
            const productCard = new ProductCardComponent(root);
            productCard.render(item, (e) => this.clickCard(e, item));
        });

        this.applyFilter();
    }

    getHTML() {
        return `
            <button class="btn btn-primary" id="click-plus">Добавить</button>
            <button class="btn btn-primary" id="click-minus">Убрать</button>
            <input type="text" id="site-search" class="form-control"
                   placeholder="Поиск по названию" style="margin-top: 15px; max-width: 320px;">
            <div id="main-page" class="d-flex"></div>
        `;
    }

    clickCard(e, item) {
        const card = e.target.closest('.card');
        if (!card) return;
        const productPage = new ProductPage(this.parent, item.id);
        productPage.render();
    }

    applyFilter() {
        const searchInput = document.getElementById('site-search');
        if (!searchInput) return;
        const filter = searchInput.value.toLowerCase();
        const cards = this.pageRoot?.querySelectorAll('.card') || [];
        cards.forEach(card => {
            const title = card.querySelector('.card-title')?.textContent?.toLowerCase() ?? '';
            card.style.display = title.startsWith(filter) ? '' : 'none';
        });
    }

    async render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const minusBtn = document.getElementById('click-minus');
        const plusBtn = document.getElementById('click-plus');
        const searchInput = document.getElementById('site-search');

        searchInput.addEventListener('input', () => {
            this.filterValue = searchInput.value.toLowerCase();
            this.applyFilter();
        });

        minusBtn.addEventListener('click', async () => {
            if (!this.data.length) return;
            const lastItem = this.data[this.data.length - 1];
            const { ok } = await ajax.delete(stockUrls.removeStockById(lastItem.id));
            if (ok) {
                this.data.pop();
                this.renderData(this.data);
            } else {
                console.error('Ошибка при удалении');
            }
        });

        plusBtn.addEventListener('click', async () => {
            if (!this.data.length) return;
            const template = this.data[this.data.length - 1];
            const newItem = {
                title: `${template.title} (Новый)`,
                src: template.src,
                name: template.name,
                time: template.time,
                adres: template.adres,
                price: template.price,
                detail: template.detail
            };
            const { data: created, ok } = await ajax.post(stockUrls.createStock(), newItem);
            if (ok && created) {
                this.data.push(created);
                this.renderData(this.data);
            } else {
                console.error('Ошибка при добавлении');
            }
        });

        try {
            await this.getData();
        } catch (error) {
            console.error(error);
        }
    }
}