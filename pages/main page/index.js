import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = []; // Внутреннее хранилище данных
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getData() {
        ajax.get(stockUrls.getStocks(), (data) => {
            this.data = data; // Сохраняем пришедший массив
            this.renderData(this.data);
        });
    }

    renderData(data) {
        const root = this.pageRoot;
        if (!root) return;

        root.innerHTML = ''; // Очищаем контейнер перед рендером

        data.forEach((item) => {
            const productCard = new ProductCardComponent(root);
            productCard.render(item, (e) => this.clickCard(e, item));
        });
    }

    getHTML() {
        return (
            `
                <button class="btn btn-primary" id="click-plus">Добавить</button>
                <button class="btn btn-primary" id="click-minus">Убрать</button>
                <div id="main-page" class="d-flex ">

                </div>
            `
        );
    }

    clickCard(e, item) {
        const card = e.target.closest('.card');
        if (!card) return;

        const cardId = item.id;
        const cardImg = item.src;
        const cardInfo = item.detail;
        const productPage = new ProductPage(this.parent, cardId, cardImg, cardInfo);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Загружаем данные с сервера
        this.getData();

        const minusBtn = document.getElementById('click-minus');
        const plusBtn = document.getElementById('click-plus');

        // КНОПКА «УБРАТЬ» (DELETE)
        minusBtn.addEventListener('click', () => {
            if (!this.data || this.data.length === 0) return;

            // Находим последний элемент массива
            const lastItem = this.data[this.data.length - 1];

            // Вызываем исправленный метод removeStockById, передавая туда ID
            ajax.delete(stockUrls.removeStockById(lastItem.id), () => {
                this.data.pop(); // Удаляем локально только после успешного ответа сервера
                this.renderData(this.data); // Обновляем карточки на экране
            });
        });

        // КНОПКА «ДОБАВИТЬ» (POST)
        plusBtn.addEventListener('click', () => {
            if (!this.data || this.data.length === 0) return;

            // Берем последний элемент для копирования структуры полей
            const templateItem = this.data[this.data.length - 1];

            const newItem = {
                title: `${templateItem.title} (Новый)`,
                src: templateItem.src,
                name: templateItem.name,
                time: templateItem.time,
                adres: templateItem.adres,
                price: templateItem.price,
                detail: templateItem.detail
            };

            // Используем метод createStock() для получения URL под POST запрос
            ajax.post(stockUrls.createStock(), newItem, (createdItem) => {
                this.data.push(createdItem); // Добавляем созданный сервером элемент с его новым ID
                this.renderData(this.data); // Перерисовываем интерфейс
            });
        });

        // ПОИСК
        const searchInput = document.getElementById('site-search');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const filter = searchInput.value.toLowerCase();
                const cards = this.pageRoot.querySelectorAll('.card');

                cards.forEach(card => {
                    const titleElement = card.querySelector('.card-title');
                    if (!titleElement) return;

                    const title = titleElement.textContent.toLowerCase();
                    if (title.startsWith(filter)) {
                        card.style.display = "";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        }
    }
}
