import axios from "../../api/client";


// initial state
export default  {
    namespaced: true,
    state: () => ({
        categories: [],
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
        getCategories({commit}, query){
            commit('setLoading',  true);
            return new Promise((resolve, reject) => {
                axios.get('/categories', {params:query})
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
        getCategory({commit}, id){
            commit('setLoading',  true);
            return new Promise((resolve, reject) => {
                axios.get('/categories/'+id)
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
        delCategory({commit}, id){
            commit('setLoading',  true);
            return new Promise((resolve, reject) => {
                axios.delete('/categories/'+id)
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
