import axios from "axios";
import {client_secret} from "@/authorizationToken";
import {api} from "@/api";
import {lastDirectiveKeeper} from "@/pageStateKeeper";

let spotifyUrl = 'https://api.spotify.com/v1/'
let token = JSON.parse(window.localStorage.getItem('token'))


let spotifyApiMixin = {
    methods: {
        access_data: function () {
            return JSON.parse(window.localStorage.access_data)
        },
        authorization_token: async function () {
            if (!token) {
                await this.getToken()
            }
            return token.token_type + ' ' + token.access_token
        },
        getToken: async function () {
            await axios({
                method: 'POST',
                url: 'https://accounts.spotify.com/api/token',
                headers: {
                    'Authorization': client_secret,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'grant_type=client_credentials'
            }).then(response => {
                window.localStorage.setItem('token', JSON.stringify(response.data))
                token = JSON.parse(window.localStorage.getItem('token'))
            })
        },
        writeToken: async function () {
            if (token === 'undefined' || token === null || token === undefined) {
                await this.getToken()
            }
        },
        getSearchData: async function (query, type) {
            axios({
                method: 'GET',
                url: spotifyUrl + 'search',
                params: {
                    q: query,
                    type: type
                },
                headers: {
                    'Authorization': await this.authorization_token()
                }
            }).then(response => {
                    this.writeSearchResultToStorage(response.data)
                },
            ).catch(async error => { // Сделать общий обработчик ошибок на все функции работы с API
                console.log(error.response.status)
                if (error.response.status === 401) {
                    window.localStorage.removeItem('token')
                    await this.getToken()
                    await this.getSearchData(query, type)
                }
            })
        },
        writeSearchResultToStorage: function (data) {
            this.$store.dispatch('updateResults', data).then(() => {
                console.log(data)
            })
        },

        getRecommendationsData: async function (seed_tracks, newFilters = null) { // В дальнейшем кол-во фильтров расширится
            let recommendations
            let filtersUrl = ''
            for (const [key, item] of Object.entries(newFilters)) {
                if (item.enabled)
                    filtersUrl += '&target_' + key + '=' + item.value
            }
            let genres = this.$store.state.selected_genres
            let genres_url = ''
            if (genres) {
                genres_url = `&seed_genres=${genres.join(',')}`
            }
            this.$store.dispatch('changeLoadingState', {component: 'recs', isLoading: true})
            await this.writeToken()
            await axios({
                method: 'GET',
                url: spotifyUrl + 'recommendations?seed_tracks=' + seed_tracks + filtersUrl + '&limit=50' + genres_url,
                headers: {
                    'Authorization': await this.authorization_token()
                }
            }).then(response => {
                    console.log(response)
                    recommendations = response.data
                },
            ).catch(async error => { // Сделать общий обработчик ошибок на все функции работы с API
                console.log(error.response.status)
                if (error.response.status === 401) {
                    window.localStorage.removeItem('token')
                    await this.getToken()
                    await this.getRecommendationsData(seed_tracks)
                }
            }).then(() => {
                this.$store.dispatch('changeLoadingState', {component: 'recs', isLoading: false})
            })
            return recommendations
        },

        getAudioFeatures: async function (seed_tracks) {
            let features = null
            await this.writeToken()
            return await axios({
                method: 'GET',
                url: spotifyUrl + 'audio-features/' + seed_tracks,
                headers: {
                    'Authorization': await this.authorization_token()
                }
            }).then(response => {
                    features = response.data
                    return features
                },
            ).catch(async error => { // Сделать общий обработчик ошибок на все функции работы с API
                console.log(error.response.status)
                if (error.response.status === 401) {
                    window.localStorage.removeItem('token')
                    await this.getToken()
                    await this.getAudioFeatures(seed_tracks)
                }
            })
        },
        getCurrentPlayback: function () {
            api({
                method: 'GET',
                url: spotifyUrl + 'me/player/',
                headers: {
                    'Authorization': this.access_data.token_type + ' ' + this.access_data.access_token
                }
            }).then(
                response => console.log(response)
            )
        },
        createNewPlaylist: function () {
            let user_data = JSON.parse(window.localStorage.user_data)
            return api({
                method: 'POST',
                url: spotifyUrl + `users/${user_data.id}/playlists`,
                headers: {
                    'Authorization': this.access_data().token_type + ' ' + this.access_data().access_token,
                    'Content-Type': 'application/json'
                },
                data: {
                    name: `${this.$store.state.activeTrack.name} playlist by Spotifind`,
                    public: true
                }
            })
        },
        addRecommendedTracksToPlaylist: function (playlist_id) {
            let uris = this.$store.state.recommendations.tracks.map(item => {
                return item.uri
            })
            return api({
                method: 'POST',
                url: spotifyUrl + `playlists/${playlist_id}/tracks`,
                headers: {
                    'Authorization': this.access_data().token_type + ' ' + this.access_data().access_token,
                    'Content-Type': 'application/json'
                },
                data: {
                    uris: uris
                }
            })
        },
        createRecsPlaylist: async function () {
            if (!this.loading) {
                lastDirectiveKeeper('createRecsPlaylist')
                this.loading = true
                let newPlaylistData = await this.createNewPlaylist()
                let result = await this.addRecommendedTracksToPlaylist(newPlaylistData.data.id)
                if (result.status === 201) {
                    this.message = 'Saved to Your library'
                    lastDirectiveKeeper(null)
                }
                this.loading = false
            }
        },
        getAvailableGenres: async function () {
            axios({
                method: 'GET',
                url: spotifyUrl + `recommendations/available-genre-seeds`,
                headers: {
                    'Authorization': await this.authorization_token()
                }
            }).then(response => {
                this.$store.dispatch('setGenres', response.data.genres)
            }).catch(async error => { // Сделать общий обработчик ошибок на все функции работы с API
                console.log(error.response.status)
                if (error.response.status === 401) {
                    window.localStorage.removeItem('token')
                    await this.getToken()
                    await this.getAvailableGenres()
                }
            })
        }
    }
}

export default spotifyApiMixin