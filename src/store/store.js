import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
    state: {
        foundResults: null,
        activeTrack: {},
        loading: {
            search: false,
            recs: false
        },
        recommendations: null,
        searchInputFocused: false,
        genres: [],
        selected_genres: null,
        filters: null
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
        setGenres(state, genres) {
            state.genres = genres
        },
        selectGenres(state, genres) {
            state.selected_genres = genres
        },
        disableFilters(state) {
            // eslint-disable-next-line no-unused-vars
            for (let [key, filter] of Object.entries(state.filters)) {
                filter.enabled = false
            }
        },
        initFilters(state) {
            const filters = {}
            const filtersArray =
                [
                    'acousticness', 'danceability', 'energy',
                    'instrumentalness', 'liveness', 'speechiness',
                    'tempo', 'valence'
                ]
            for (const key of filtersArray) {
                filters[key] = {
                    value: null,
                    enabled: false
                }
            }
            state.filters = filters
        }
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
        changeFilterState({commit}, [key, value]) {
            commit('changeFilterState', [key, value])
        },
        chooseActiveTrack({commit}, track) {
            commit('disableFilters')
            commit('selectGenres', null)
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
        setRecommendationsDataFromStore({commit}, data) {
            commit('setFilterValues', data.filters)
            commit('chooseActiveTrack', data.active_track)
            commit('updateRecommendations', data.recommendations)
            commit('selectGenres', data.genres)
        },
        setGenres({commit}, genres) {
            commit('setGenres', genres)
        },
        selectGenres({commit}, genres) {
            commit('selectGenres', genres)
        },
        initFilters({commit}) { //init on APP create
            commit('initFilters')
        }
    }
})
// Разобъем на модули в будущем
export default store
