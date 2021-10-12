Vue.component('cart', {
    data() {
        return {
            invisibleCart: false,
            cartUrl: '/getBasket.json',
            cartGoods: [],
            imgCart: "https://via.placeholder.com/500x200",
        }
    },
    methods: {
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
    },
    mounted() {
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartGoods.push(el);
                }
            });
    }

});

