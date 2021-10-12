const API = 'localhost:3333';
// const cartAPI = 'this.$root.$refs.cart';

const app = new Vue({
    el: '#app',
    data: {
        searchInput: '',
        invisibleCart: false,
        invisibleSignIn: false,
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
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        deleteJson(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },

        addProduct(product) {
            let find = this.cartGoods.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartGoods.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartGoods.splice(this.cartGoods.indexOf(item), 1);
                        }
                    });
            }
        },
        search() {
            let regexp = new RegExp(this.searchInput, 'i');
            this.found = this.goods.filter(el => regexp.test(el.product_name));
        },
    },
    mounted() {
        this.getJson('api/products')
            .then(data => {
                for (let el of data) {
                    this.goods.push(el);
                    this.found.push(el);
                }
            });
        this.getJson('api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartGoods.push(el);
                }
            });
    },
});
