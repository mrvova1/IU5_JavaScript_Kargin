# ЛР 2. Calculator. JavaScript

**Каргин В.В. ИУ5-44Б**

## Содержание
- [Цель работы](#цель-работы)
- [Тема](#тема)
- [Сайт для вдохновения](#сайт-для-вдохновения)
- [Главное о проекте (теория)](#главное-о-проекте-теория)
- [Дополнительные задания](#дополнительные-задания)

## Цель работы
Продолжить разработку калькулятора и реализовать логику вычислений на JavaScript: ввод чисел, выбор операции, очистку поля и получение результата.

## Тема
Сайт медосмотров

## Сайт для вдохновения
[Медосмотр](https://medosmotri.ru/)
[Медосмотр](https://www.goldenmed.ru/)

## Главное о проекте (теория)
В этой лабораторной работе интерфейс уже подготовлен, а вся логика перенесена в JavaScript.

Что используется в проекте:
- обработчики событий для кнопок;
- хранение вводимых значений в переменных `a` и `b`;
- выбор операции через отдельную переменную;
- вычисление результата после нажатия кнопки `=`;
- чтение значения с клавиш по `id`, чтобы не дублировать код.

Логика калькулятора построена так, чтобы:
- вводить первое число;
- выбирать операцию;
- вводить второе число;
- получать результат и продолжать вычисления уже с ним.


## Дополнительные задания

1. Сделать ввод чисел так, чтобы при вводе точки в пустое поле автоматически добавлялся ноль слева.

Реализация этого:
```js
function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
        if (digit == '.' && a == '') {
            a += '0';
        }
        if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
            a += digit;
        }
        outputElement.innerHTML = a;
    }
    else {
        if (digit == '.' && b == '') {
            b += '0';
        }
        if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
            b += digit;
            outputElement.innerHTML = b;
        }
    }
}
```
2. Сделать кнопки операций так, чтобы операция выбиралась только после ввода первого числа, а экран очищался для ввода второго числа.
```html
<!-- Calculator.html -->
<div id="Calculatoror">
  <div id="result" class="result">
    0
  </div>

  <div>
    <div>
      <button id="btn_op_clear" class="my-btn secondary">C</button>
      <button id="btn_op_sign" class="my-btn secondary">+/-</button>
      <button id="btn_op_percent" class="my-btn secondary">%</button>
      <button id="btn_op_div" class="my-btn primary">/</button>
    </div>
    <div>
      <button id="btn_digit_7" class="my-btn">7</button>
      <button id="btn_digit_8" class="my-btn">8</button>
      <button id="btn_digit_9" class="my-btn">9</button>
      <button id="btn_op_mult" class="my-btn primary">x</button>
    </div>
    <div>
      <button id="btn_digit_4" class="my-btn">4</button>
      <button id="btn_digit_5" class="my-btn">5</button>
      <button id="btn_digit_6" class="my-btn">6</button>
      <button id="btn_op_minus" class="my-btn primary">-</button>
    </div>
    <div>
      <button id="btn_digit_1" class="my-btn">1</button>
      <button id="btn_digit_2" class="my-btn">2</button>
      <button id="btn_digit_3" class="my-btn">3</button>
      <button id="btn_op_plus" class="my-btn primary">+</button>
    </div>
    <div>
      <button id="btn_digit_0" class="my-btn">0</button>
      <button id="btn_digit_dot" class="my-btn">.</button>
      <button id="btn_op_equal" class="my-btn primary execute">=</button>
    </div>
  </div>
</div>
```
```js
document.getElementById("btn_op_mult").onclick = function() {
    if (a === '') return;
    selectedOperation = 'x';
    outputElement.innerHTML = 0;
}
document.getElementById("btn_op_plus").onclick = function() {
    if (a === '') return;
    selectedOperation = '+';
    outputElement.innerHTML = 0;
}
document.getElementById("btn_op_minus").onclick = function() {
    if (a === '') return;
    selectedOperation = '-';
    outputElement.innerHTML = 0;
}
document.getElementById("btn_op_div").onclick = function() {
    if (a === '') return;
    selectedOperation = '/';
    outputElement.innerHTML = 0;
}
document.getElementById("btn_op_percent").onclick = function() {
    if (a === '') return;
    selectedOperation = '%';
    outputElement.innerHTML = 0;
}
```

3. Сделать изменение знака текущего числа кнопкой +/-.
```js
document.getElementById("btn_op_sign").onclick = function() {
    if(!selectedOperation && a != '0' && a != '') {
        if(a[0] === '-') {
            a = a.slice(1);
            outputElement.innerHTML = a;
        }
        else {
            a = '-' + a;
            outputElement.innerHTML = a;
        }
    }
    else if(b != '0' && b != '') {
       if(b[0] === '-') {
            b = b.slice(1);
            outputElement.innerHTML = b;
        }
        else {
            b = '-' + b;
            outputElement.innerHTML = b;
        }
    }
}
```
