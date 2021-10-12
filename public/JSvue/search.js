Vue.component('user-search', {
    data() {
        return {
            searchInput: ''
        }
    },
    methods: {
        search() {
            let regexp = new RegExp(this.searchInput, 'i');
            this.found = this.goods.filter(el => regexp.test(el.product_name));
        }
    },
    template:
        `
        <form action="#" class="header__search_form" @submit.prevent="search" >
            <input type="text" class="header__search_field" v-model="searchInput">
                <button class="header__search_btn" type="submit">
                    Search
                </button>
            </form>
        `
});