# ЛР 3. Простое веб-приложение. Верстка

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
Научиться собирать простое веб-приложение на JavaScript, работать с модулями, карточками товаров и страницей подробного просмотра.

## Тема
Сайт медосмотров

## Сайт для вдохновения
[Медосмотр](https://medosmotri.ru/)
[Медосмотр](https://www.goldenmed.ru/)

## Главное о проекте (теория)
Проект построен как клиентское приложение без полноценного бэкенда. Данные подаются из массива объектов, а интерфейс собирается из отдельных компонентов.

Основные идеи:
- компонентный подход: каждая карточка и кнопка вынесены в отдельный класс;
- работа с DOM через `insertAdjacentHTML` и обработчики событий;
- переход между списком карточек и страницей товара;
- использование Bootstrap для базовой сетки и оформления;
- фильтрация карточек по поиску в заголовке.

## Структура проекта
- `components/` — переиспользуемые UI-компоненты;
- `pages/main page/` — страница со списком карточек;
- `pages/product/` — страница с подробной информацией;
- `public/static/js/data.js` — mock-данные для карточек;
- `public/static/css/` — стили;
- `public/main_page.html` и `public/navigation.html` — HTML-страницы проекта.


## Дополнительные задания

1. Доработать логику добавления и удаления карточек.

Реализация этого:
```js
<!-- pages/main page/index.js -->
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
```

2. Добавить рабочее поле поиска по карточкам.
```html
<!-- navigation.html -->
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

## Задание
Сверстать главную страницу с карточками, страницу подробного просмотра, добавить кнопки добавления и удаления карточек, а также кнопку возврата на главную страницу в хедере.

## Порядок показа
Показать структуру проекта, объяснить работу компонентов, затем продемонстрировать поиск, добавление/удаление карточек и переход на страницу товара.
