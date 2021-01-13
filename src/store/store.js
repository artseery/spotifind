import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        foundResults: null,
        filters: {
            acousticness: null, // Акустическая ли композиция (от 0.0 до 1.0)
            danceability: null, // Танцевальная ли композиция (от 0.0 до 1.0)
            duration_ms: null, // Продолжительность (миллисекунды)
            energy: null, // Энергичность трека (от 0.0 до 1.0)
            instrumentalness: null, // Инструментальная ли музыка (от 0.0 до 1.0 (0.5 и выше точно инструменталы))
            liveness: null, // Является ли запись "лайвом" (от 0.0 до 1.0 (0.8 и выше значит, что это лайв))
            speechiness: null, // Как много речи в композациях (от 0.0 до 1.0 (менее 0.33 - композиция без слов, от 0.33 до 0.66 - и речетатив и музыка, 0.66 и более - речетатив))
            tempo: null, // Темп копозиции (BPM)
            valence: null, // Валентность трека (от 0.0 до 1.0 (Означает "музыкальный позитивизм" композиции, чем выше, тем композиция более позитивная))
            popularity: null, // Популярность трека (от 0 до 100 (100 - наиболее популярный))

            // No access by user
            key: null, // Ноты, используемые в композиции (таблицу смотреть)
            time_signature: null, // Количество битов в каждом такте (любое целое)
            mode: null, // Мажорность/минорность (1 - мажор, 2 - минор)
            loudness: null, // Громкость композиции (в децибеллах от -60 до 0)

            // Добавить target на return-е
        }
    },
    mutations: {
        updateResults(state, data) {
            state.foundResults = data
        },
        setDefaultMainFilterValues(state, defaultValues) {
            state.filters = defaultValues
        },
        setFilterValuesByKey(state, {key, value}) {
            state.filters[key] = value
        }
    },
    actions: {
        updateResults({ commit }, data) {
            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, reject) => {
                commit('updateResults', data)
                resolve()
            })
        },
        setDefaultMainFilterValues({ commit }, defaultValues) {
            commit('setDefaultMainFilterValues', defaultValues)
        },
        setFilterValuesByKey({ commit }, [key, value]) {
            commit('setFilterValuesByKey', {key, value})
        }
    }
})

export default store
