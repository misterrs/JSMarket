//Корзина товаров

class CartItemsList {
    constructor(ItemCartData = '.cart__wrapper') {
        this.ItemCartData = ItemCartData;
        this.CartItems = [];
        this.CartItemsObj = [];
        this.CartrecItems();
        this.Cartrender();
        this.total();
    }

    CartrecItems() {
        this.CartItems = [
            { id: 1, title: 'left mirror', price: 350, img: 'img/empty.png' },
            { id: 2, title: 'brake disc', price: 100, img: 'img/empty.png' },
        ];
    }
    Cartrender() {
        const block = document.querySelector(this.ItemCartData);
        for (const cartProduct of this.CartItems) {
            const CartItemObj = new CartItem(cartProduct);
            this.CartItemsObj.push(CartItemObj);
            block.insertAdjacentHTML('beforebegin', CartItemObj.GetHtmlString());
        }
    }
    total() {
        const totalItems = this.CartItemsObj;
        let sum = 0;
        for (let key in totalItems) {
            sum += totalItems[key].price;
        }
        console.log(sum);
        document.querySelector('.cart__total').innerHTML = sum;
    }
}
class CartItem {
    constructor(item, DelBtnTitle = 'Delete') {
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
        this.img = item.img;
        this.DelBtnTitle = DelBtnTitle;
    }
    GetHtmlString() {
        return `<div class="item__card cart_card" data - id="${this.id}">
            <img src=${this.img} alt="img">
                <div class="content">
                    <h3>${this.title}</h3>
                    <p>${this.price}$</p>
                    <button class="btn">${this.DelBtnTitle}</button>
                </div>
            </div>`;
    }
}

const GenCartList = new CartItemsList;

