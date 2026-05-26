import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { data } from "../../public/static/js/data.js";

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
        const Card = e.target.closest('.card');
        if (!Card) return;

        const cardId = item.id;
        const CardImg = item.src;
        const card_info = item.detail
        const productPage = new ProductPage(this.parent, cardId, CardImg, card_info)
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
