# ЛР №5. Добавление AJAX-запросов к API

**Каргин В.В. ИУ5-44Б**

## Содержание
- [Цель работы](#цель-работы)
- [Тема](#тема)
- [Сайт для вдохновения](#сайт-для-вдохновения)
- [Главное о проекте (теория)](#главное-о-проекте-теория)
- [Структура проекта](#структура-проекта)
- [Дополнительные задания](#дополнительные-задания)
- [Задание](#задание)
- [Порядок показа](#порядок-показа)

## Цель работы
Научиться получать и отправлять данные через XMLHttpRequest, подключить клиент к API и вывести ответ сервера в интерфейсе.

## Тема
Сайт медосмотров

## Сайт для вдохновения
[Медосмотр](https://medosmotri.ru/)
[Медосмотр](https://www.goldenmed.ru/)

## Главное о проекте (теория)
В этой лабораторной работе клиентская часть начинает работать с настоящим API. Запросы отправляются через `XMLHttpRequest`, а ответы обрабатываются по статусу и передаются в компоненты интерфейса.

Что важно в проекте:
- отдельный модуль для AJAX-запросов;
- отдельный модуль с URL-адресами API;
- загрузка списка карточек с сервера;
- открытие страницы карточки по `id`;
- добавление и удаление карточек через сервер.

## Структура проекта
- `components/` — карточки, кнопки и кнопка возврата;
- `modules/ajax.js` — обёртка для XMLHttpRequest;
- `modules/stockUrls.js` — генерация адресов API;
- `pages/main page/` — главная страница со списком карточек;
- `pages/product/` — страница с подробной карточкой;
- `public/static/` — стили, изображения и стартовые данные;
- `public/main_page.html` и `public/navigation.html` — HTML-страницы.


## Дополнительные задания

1. Добавить кнопки "Добавить" и "Убрать" для работы с карточками на странице.

Реализация этого:
```js
import { ProductCardComponent } from "././components/product-card/index.js";
import { ProductPage } from "./product/index.js";
import { data } from "././public/static/js/data.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
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
      const productPage = new ProductPage(
        this.parent,
        item.id,
        item.src,
        item,
        item.modelPath
      );
      productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, (e) => this.clickCard(e, item));
        })

        const minusBtn = document.getElementById('click-minus');
        const plusBtn = document.getElementById('click-plus');

        minusBtn.addEventListener('click', () => {
            const cards = document.querySelectorAll('.card');
            if (cards.length > 0) {
                const lastCard = cards[cards.length - 1];
                lastCard.remove()
            }
        })

        plusBtn.addEventListener('click', () => {
            let item = data.pop();
            data.push(item);
            item.id += 1;
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, (e) => this.clickCard(e, item));
            data.push(item);
        })

        const searchInput = document.getElementById('site-search');
        const cards = document.querySelectorAll('.card');

        searchInput.addEventListener('input', function () {
            const filter = searchInput.value.toLowerCase();

            cards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();

                if (title.startsWith(filter)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
}
```
2. Сделать поиск по карточкам.
```html
<div class="input-group">
  <input type="text" class="form-control" id="site-search" placeholder="Поиск по сайту" aria-label="Поиск">
  <button class="btn btn-primary" type="button">Поиск</button>
</div>
```
```js
const searchInput = document.getElementById('site-search');
const cards = document.querySelectorAll('.card');

searchInput.addEventListener('input', function () {
    const filter = searchInput.value.toLowerCase();

    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();

        if (title.startsWith(filter)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});
```
3. Сделать загрузку данных с сервера через AJAX-запросы.
```js
// modules/stockUrls.js
class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/stocks`;
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }
}

export const stockUrls = new StockUrls();
```
## Задание
Продолжить ЛР 3: добавить страницу добавления и редактирования, подключить запросы к API и реализовать работу через XMLHttpRequest.

## Порядок показа
Показать загрузку списка карточек с сервера, открытие страницы товара, затем добавление и удаление записи через интерфейс.
