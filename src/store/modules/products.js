import axios from "../../api/client";


// initial state
export default  {
    namespaced: true,
    state: () => ({
        products: [],
        loading: true
    }),
    mutations: {
        setCategories (state, categories) {
            state.categories = categories
        },
        setLoading (state, data) {
            state.loading = data
        }
    },
    actions:{
        storeProducts({commit}, payload){
            commit('setLoading',  true);
            return new Promise((resolve, reject) => {
                axios.post('/products', payload)
                    .then(response=>{
                        resolve(response.data);
                    })
                    .catch(error =>{
                        reject(error.response)
                    }).finally(()=>{
                        commit('setLoading',  false);
                    })
            });
        },
        updateProducts({commit}, payload){
            commit('setLoading',  true);
            return new Promise((resolve, reject) => {
                axios.put('/products/'+payload.id, payload)
                    .then(response=>{
                        resolve(response.data);
                    })
                    .catch(error =>{
                        reject(error.response)
                    }).finally(()=>{
                        commit('setLoading',  false);
                    })
            });
        },
        getProducts({commit}, query){
            commit('setLoading',  true);
            return new Promise((resolve, reject) => {
                axios.get('/products', {params:query})
                    .then(response=>{
                        resolve(response.data);
                        commit('setCategories',response.data);
                    })
                    .catch(error =>{
                        reject(error.response)
                    }).finally(()=>{
                        commit('setLoading',  false);
                    })
            });
        },
        getProduct({commit}, id){
            commit('setLoading',  true);
            return new Promise((resolve, reject) => {
                axios.get('/products/'+id)
                    .then(response=>{
                        resolve(response.data);
                    })
                    .catch(error =>{
                        reject(error.response)
                    }).finally(()=>{
                        commit('setLoading',  false);
                    })
            });
        },
        delProduct({commit}, id){
            commit('setLoading',  true);
            return new Promise((resolve, reject) => {
                axios.delete('/products/'+id)
                    .then(response=>{
                        resolve(response.data);
                    })
                    .catch(error =>{
                        reject(error.response)
                    }).finally(()=>{
                        commit('setLoading',  false);
                    })
            });
        },
    },
    getters: {

    }
}
