# ЛР 1. Calculator. HTML/CSS

**Каргин В.В. ИУ5-44Б**

## Содержание
- [Цель работы](#цель-работы)
- [Тема](#тема)
- [Сайт для вдохновения](#сайт-для-вдохновения)
- [Главное о проекте (теория)](#главное-о-проекте-теория)
- [Дополнительные задания](#дополнительные-задания)

## Цель работы
Познакомиться с базовой вёрсткой веб-страниц на HTML и CSS, собрать простой интерфейс калькулятора и оформить страницу с навигацией и фоном.

## Тема
Сайт медосмотров

## Сайт для вдохновения
[Медосмотр](https://medosmotri.ru/)
[Медосмотр](https://www.goldenmed.ru/)

## Главное о проекте (теория)
В этой лабораторной работе используется связка Flask + HTML + CSS + JavaScript. Сервер Flask отдаёт шаблон `index.html`, а вся интерактивность калькулятора реализована на стороне клиента.

Главные идеи проекта:
- HTML задаёт структуру страницы: навигацию, поле результата и кнопки калькулятора.
- CSS отвечает за внешний вид: размеры кнопок, цвета, фон, отступы и адаптацию навигации.
- JavaScript подключается в шаблоне и используется для дальнейшей логики калькулятора.
- Отдельный шаблон позволяет быстро подключать статические файлы через Flask.

## Дополнительные задания

1. Сделать задний фон страницы.

Реализация этого:
```css
body {
  padding: 0;
  margin: 0;
  background-color: #f5f5f5;
}
```
2. Сделать базовое навигационное окно в верхней части страницы.
```html
<iframe src="navigation.html" frameborder="0" width="100%" height="300px"></iframe>

<!-- navigation.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Калькулятор</title>
  <link rel="stylesheet" href="navigation.css">
</head>

<header>
  <div class="head">
    <div class="head_containet">
      <div class="header_top">
        <a href="C:\Users\79169\Downloads\PSP_lab2\main.html">
          <img class="head_image" src="C:\Users\79169\Downloads\PSP_lab2/Logo.PNG" alt>
        </a>
        <div class="org_number">
          <a style="font-size: 21px;">Связаться с нами</a>
          <a class="header__phone" href="tel:+79999999999">+7 (999) 999-99-99</a>
        </div>
      </div>
      <div class="header_bottom">
        <nav class="head_menu">
          <a href="https://google.ru/" class="head_item" id="main_page"> О нас </a>
          <a href="C:\Users\79169\Downloads\PSP_lab2\Calculator.html" class="head_item" id="main_page"> Калькулятор </a>
          <a href="https://google.ru/" class="head_item" id="main_page"> Услуги </a>
          <a href="https://google.ru/" class="head_item" id="main_page"> Врачи </a>
          <a href="https://google.ru/" class="head_item" id="main_page"> Медсправки </a>
          <a href="https://google.ru/" class="head_item" id="main_page"> Анализы </a>
          <a href="https://google.ru/" class="head_item" id="main_page"> Медкнижки </a>
          <a href="https://google.ru/" class="head_item" id="main_page"> Контакты </a>
        </nav>
      </div>
    </div>
  </div>
</header>
```
/* navigation.css */
```css
.head {
  box-sizing: border-box;
  display: block;
  position: relative;
  background-color: white;
  border-radius: 1.5rem;
  padding: 0.5rem 1rem 1rem;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border: 4px solid black;
}

.head_menu {
  flex-wrap: wrap;
  margin-left: auto;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.header_top {
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: #3b8aa0;
}

.head_item {
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  position: relative;
  border: 2px solid #3b8aa0;
  border-radius: 1.5rem;
  padding: 0.5rem 1rem 1rem;
  margin-top: 10px;
  color: #526576;
}

.head_item:hover {
  border: 2px solid rgb(60, 224, 74);
  color: white;
  background-color: rgb(60, 224, 74);
}

.head_image {
  width: 250px;
}

.header__phone {
  font-size: 20px;
  font-weight: 1000;
  color: #0ca4d4;
  margin-right: 5px;
}

.org_number {
  display: flex;
  width: auto;
  flex-direction: column;
  gap: 10px;
  font-weight: 600;
  color: #526576;
  margin-right: 5px;
  text-align: left;
}
```
```python
// main.py
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
```
