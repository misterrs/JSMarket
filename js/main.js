//Каталог продууктов
class ProductList {
    constructor(ItemData = '.wrapper') {
        this.ItemData = ItemData;
        this.Items = [];
        this.ItemsObj = [];
        this.recItems();
        this.render();
    }
    recItems() {
        this.Items = [
            { id: 1, title: 'left mirror', price: 350, img: 'img/empty.png' },
            { id: 2, title: 'brake disc', price: 100, img: 'img/empty.png' },
            { id: 3, title: 'Oil 4l', price: 50, img: 'img/empty.png' },
            { id: 4, title: 'oil filter', price: 10, img: 'img/empty.png' },
        ];
    }
    render() {
        const block = document.querySelector(this.ItemData);
        for (const product of this.Items) {
            const ItemObj = new ProductItem(product);
            this.ItemsObj.push(ItemObj);
            block.insertAdjacentHTML('beforeend', ItemObj.GetHtmlString());
        }
    }
}
class ProductItem {
    constructor(item, AddBtnTitle = 'Add to cart') {
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
        this.img = item.img;
        this.AddBtnTitle = AddBtnTitle;
    }
    GetHtmlString() {
        return `<div class="item__card" data-id="${this.id}">
                    <img src=${this.img} alt = "img">
                    <div class = "card__content">
                        <h3>${this.title}</h3>
                         <p>${this.price}$</p>
                        <button class="btn">${this.AddBtnTitle}</button>
                    </div>
                </div>`;
    }
}

const genCatalogList = new ProductList;