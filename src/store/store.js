import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        foundResults: null
    },
    mutations: {
        updateResults(state, data) {
            state.foundResults = data
        }
    },
    actions: {
        updateResults({ commit }, data) {
            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, reject) => {
                commit('updateResults', data)
                resolve()
            })
        }
    }
})

export default store
