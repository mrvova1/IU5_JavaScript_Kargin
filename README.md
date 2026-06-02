# ЛР 4. Бэкенд на Express.js

**Каргин В.В. ИУ5-44Б**

## Содержание
- [Цель работы](#цель-работы)
- [Тема](#тема)
- [Сайт для вдохновения](#сайт-для-вдохновения)
- [Главное о проекте (теория)](#главное-о-проекте-теория)
- [Структура проекта](#структура-проекта)
- [Дополнительные задания](#дополнительные-задания)
- [Порядок показа](#порядок-показа)

## Цель работы
Сделать собственный REST API на Node.js и Express, хранить данные в JSON-файле и проверить основные CRUD-операции через Postman или Insomnia.

## Тема
Сайт медосмотров

## Сайт для вдохновения
[Медосмотр](https://medosmotri.ru/)
[Медосмотр](https://www.goldenmed.ru/)

## Главное о проекте (теория)
В этой лабораторной работе клиентская часть подключается к серверу через HTTP-запросы, а сервер отвечает JSON-данными.

Основные идеи:
- `express` используется для создания API и маршрутов;
- `cors` нужен для разрешения запросов с другого адреса;
- `fileService` читает и записывает данные в JSON;
- `stocksService` хранит бизнес-логику работы с карточками;
- `stocksController` проверяет входные данные и формирует ответы со статусами.

## Структура проекта
- `example-express/src/index.js` — точка входа сервера;
- `example-express/src/routes/stocks.js` — маршруты API;
- `example-express/src/controllers/stocksController.js` — обработчики запросов;
- `example-express/src/services/stocksService.js` — логика работы с данными;
- `example-express/src/services/fileService.js` — чтение и запись JSON;
- `example-express/src/data/stocks.json` — файл с данными;
- `example-express/package.json` — зависимости и запуск.


## Дополнительные задания

1. Изменить набор отдаваемых, принимаемых и удаляемых данных карточек.

Реализация этого:
```js
// example-express/src/services/fileService.js
const fs = require('fs');

const readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Ошибка чтения файла:', err);
        return [];
    }
};

const writeData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Ошибка записи файла:', err);
    }
};

module.exports = {
    readData,
    writeData
};
```
```js
// example-express/src/services/stocksService.js
const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (title) => {
    const stocks = fileService.readData(dataFilePath);
    if (title) {
        return stocks.filter(stock =>
            stock.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    return stocks;
};

const findOne = (id) => {
    const stocks = fileService.readData(dataFilePath);
    return stocks.find(stock => stock.id === id);
};

const create = (stockData) => {
    const stocks = fileService.readData(dataFilePath);

    const newId = stocks.length > 0
        ? Math.max(...stocks.map(s => s.id)) + 1
        : 1;

    const newStock = { id: newId, ...stockData };
    stocks.push(newStock);
    fileService.writeData(dataFilePath, stocks);

    return newStock;
};

const update = (id, stockData) => {
    const stocks = fileService.readData(dataFilePath);
    const index = stocks.findIndex(s => s.id === id);

    if (index === -1) return null;

    stocks[index] = { ...stocks[index], ...stockData };
    fileService.writeData(dataFilePath, stocks);

    return stocks[index];
};

const remove = (id) => {
    const stocks = fileService.readData(dataFilePath);
    const filteredStocks = stocks.filter(s => s.id !== id);

    if (filteredStocks.length === stocks.length) {
        return false;
    }

    fileService.writeData(dataFilePath, filteredStocks);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
```

2. Разобраться в остальных методах API.
3. Разобраться в кодах статуса HTTP.

## Порядок показа
Показать запуск сервера, затем коллекцию запросов в Postman: список, поиск, получение по id, добавление, редактирование и удаление записи.
