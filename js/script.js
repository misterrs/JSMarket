const items = [
    { id: 1, title: 'left mirror', price: 350 },
    { id: 2, title: 'brake disc', price: 100 },
    { id: 3, title: 'Oil 4l', price: 50 },
    { id: 4, title: 'oil filter', price: 10 },
];

const ProductCard = (title, price) => {
    return `<div class="product-list"><h3>${title}</h3><p>${price}$</p><button class="btn">Добавить</button></div>`;
};


const GenerateCatalog = list => {
    let productList = list.map(item => ProductCard(item.title, item.price)).join(' ');
    console.log(productList);
    document.querySelector('.catalog').innerHTML = productList;
}

GenerateCatalog(items);