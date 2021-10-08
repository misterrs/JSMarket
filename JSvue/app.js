const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        searchInput: '',
        invisibleCart: false,
        invisibleSignIn: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        goods: [],
        cartGoods: [],
        found: [],
        imgCatalog: "https://via.placeholder.com/500x200",
        imgCart: "https://via.placeholder.com/500x200",
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let increase = this.cartGoods.find(el => el.id_product === product.id_product);
                        if (increase) {
                            increase.quantity++;
                        } else {
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.cartGoods.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(product) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (product.quantity > 1) {
                            product.quantity--;
                        } else {
                            this.cartGoods.splice(this.cartGoods.indexOf(product), 1)
                        }
                    }
                })
        },
        search() {
            let regexp = new RegExp(this.searchInput, 'i');
            this.found = this.goods.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.goods.push(el);
                    this.found.push(el);
                }
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartGoods.push(el);
                }
            });
    },
});
