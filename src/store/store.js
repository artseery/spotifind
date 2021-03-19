import Vue from 'vue'
import Vuex from 'vuex'
import spotifyAuth from "@/store/spotifyAuth";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        spotifyAuth: spotifyAuth
    },
    state: {
        foundResults: null,
        filters: {
            acousticness: {
                value: null,
                enabled: false
            }, // Акустическая ли композиция (от 0.0 до 1.0)
            danceability: {
                value: null,
                enabled: false
            }, // Танцевальная ли композиция (от 0.0 до 1.0)
            // duration_ms: null, // Продолжительность (миллисекунды)
            energy: {
                value: null,
                enabled: false
            }, // Энергичность трека (от 0.0 до 1.0)
            instrumentalness: {
                value: null,
                enabled: false
            }, // Инструментальная ли музыка (от 0.0 до 1.0 (0.5 и выше точно инструменталы))
            liveness: {
                value: null,
                enabled: false
            }, // Является ли запись "лайвом" (от 0.0 до 1.0 (0.8 и выше значит, что это лайв))
            speechiness: {
                value: null,
                enabled: false
            }, // Как много речи в композациях (от 0.0 до 1.0 (менее 0.33 - композиция без слов, от 0.33 до 0.66 - и речетатив и музыка, 0.66 и более - речетатив))
            tempo: {
                value: null,
                enabled: false
            }, // Темп копозиции (BPM)
            valence: {
                value: null,
                enabled: false
            }, // Валентность трека (от 0.0 до 1.0 (Означает "музыкальный позитивизм" композиции, чем выше, тем композиция более позитивная))
             // popularity: {
             //    value: null,
             //     enabled: false
             // }, // Популярность трека (от 0 до 100 (100 - наиболее популярный))

            // No access by user
            // key: null, // Ноты, используемые в композиции (таблицу смотреть)
            // time_signature: null, // Количество битов в каждом такте (любое целое)
            // mode: null, // Мажорность/минорность (1 - мажор, 2 - минор)
            // loudness: null, // Громкость композиции (в децибеллах от -60 до 0)

            // Добавить target на return-е
        },
        activeTrack: {
        },
        loading: {
            search: false,
            recs: false
        },
        recommendations: null,
        searchInputFocused: false
    },
    mutations: {
        updateResults(state, data) {
            state.foundResults = data
        },
        setFilterValuesByKey(state, {key, value}) {
            state.filters[key].value = parseFloat(value)
        },
        setFilterValues(state, filters) {
            state.filters = filters
        },
        changeFilterState(state, [key, status]) {
            state.filters[key].enabled = status
        },
        chooseActiveTrack(state, track) {
            state.activeTrack = track
        },
        changeLoadingState(state, {component, isLoading}) {
            state.loading[component] = isLoading
        },
        updateRecommendations(state, recommendations) {
            state.recommendations = recommendations
        },
        searchInputFocus(state, condition) {
            state.searchInputFocused = condition
        },
    },
    actions: {
        updateResults({commit}, data) {
            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, reject) => {
                commit('updateResults', data)
                resolve()
            })
        },
        setFilterValuesByKey({commit}, [key, value]) {
            commit('setFilterValuesByKey', {key, value})
        },
        changeFilterState({ commit }, [key, value]) {
            commit('changeFilterState', [key, value])
        },
        chooseActiveTrack({commit}, track) {
            commit('chooseActiveTrack', track)
        },
        changeLoadingState({commit}, payload) {
            commit('changeLoadingState', payload)
        },
        updateRecommendations({commit}, recommendations) {
            commit('updateRecommendations', recommendations)
        },
        searchInputFocus({commit}, condition) {
            commit('searchInputFocus', condition)
        },
        setRecommendationsDataFromStore({ commit }, data) {
            commit('setFilterValues', data.filters)
            commit('chooseActiveTrack', data.active_track)
            commit('updateRecommendations', data.recommendations)
        }
    }
})
// Разобъем на модули в будущем
export default store
