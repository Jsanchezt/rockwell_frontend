import axios from "../../api/client";


// initial state
export default  {
    namespaced: true,
    state: () => ({
        count: 0
    }),
    mutations: {
        increment (state) {
            // `state` is the local module state
            state.count++
        }
    },
    actions:{
        getUsers({commit}, query){
            return new Promise((resolve, reject) => {
                axios.get('user', {params:query})
                    .then(response=>{
                        resolve(response.data);
                    })
                    .catch(error =>{
                        reject(error.response)
                    })
            });
        },
    },
    getters: {
        doubleCount (state) {
            return state.count * 2
        }
    }
}
