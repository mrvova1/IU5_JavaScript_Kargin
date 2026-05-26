# Домашнее задание

**Каргин В.В. ИУ5-44Б**

## Содержание <!-- omit in toc -->

- [Цель работы](#цель-данной-лабораторной-работы)
- [Тема](#тема)
- [Сайт для вдохновения](#сайт-для-вдохновения)
- [Дополнительные задания](#дополнительные-задания)
- [Порядок показа](#порядок-показа)

## Цель домашнего задания
Работа с коллекциями, функциями, классами.

## Тема
Сайт медосмотров

## Сайт для вдохновения
[Медосмотр](https://medosmotri.ru/)
[Медосмотр](https://www.goldenmed.ru/)

## Дополнительные задания
1. Дана квадратная матрица matrix, верните сумму основной и побочной диагоналей матрицы.

Ввод: matrix = [[1,2,3], [4,5,6], [7,8,9]] Выход: 25
```js
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8'); 
const mas = JSON.parse(input);

let dia = 0;
for (let i = 0; i < mas.length; i++) {
    if (i < mas[i].length) {
        dia += mas[i][i];
    }
}

let altdia = 0;
for (let i = mas.length-1; i > -1; i--) {
    if ((i < mas[i].length) & (i > -1)) {
        altdia += mas[i][i];
    }
}
[README.md](README.md)
console.log(dia);
console.log(altdia);
```
2. Напишите функцию isEqualArrays, которая сравнивает два массива и возвращает true, если они идентичны.
3. Напишите функцию isEqualObj, которая сравнивает два объекта и возвращает true, если они идентичны.
```js
function isEqualObj(a, b){
    if (a === b){
        return true;
    }
    else return false;
}

function isEqualArrays(a, b){
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; i++){
        if (!isEqualObj(a[i], b[i])) return false;
    }
    return true
}

console.log(isEqualObj(1, "1.0"))
console.log(isEqualObj(1, 1.0))

console.log(isEqualArrays([1, "1.0"], [1, 1.0]))
console.log(isEqualArrays([1, 1.0], [1.0, 1]))
console.log(isEqualArrays([1, 1.0], [1, 1.0]))
```
4. Необходимо на странице Подробнее выводить 3D модель.

## Порядок показа 
Объяснить реализацию требуемых функций, объяснить использование three.js
