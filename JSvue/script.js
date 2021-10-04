const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        goods: [],
        searchLine: '',
        imgCatalog: "https://via.placeholder.com/500x200",
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())

                .catch(error => {
                    console.log(error);
                })
        },

        addProduct(good) {
            console.dir(good);
        }
    },


    beforCreate() {

    },
    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                this.goods = data;
            });
        console.dir(this.goods.id);
    },
});
