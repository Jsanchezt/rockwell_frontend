import { createStore } from 'vuex'
import user from './modules/user'
import categories from './modules/category'
import products from './modules/products'



export default createStore({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        user:user,
        categories:categories,
        products:products
    }
})
