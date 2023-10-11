import { createStore } from 'vuex'
import user from './modules/user'
import categories from './modules/category'



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
        categories:categories
    }
})
