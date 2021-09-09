import axios from "axios";
import {client_secret} from "@/authorizationToken";
import {api} from "@/api";
import {redirectToSpotifyAuth} from "@/utils";

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
        createNewPlaylist: async function () {
            let user_data = JSON.parse(window.localStorage.user_data)
            let vm = this
            let playlistData = null
            await axios({
                method: 'POST',
                url: spotifyUrl + `users/${user_data.id}/playlists`,
                headers: {
                    'Authorization': vm.access_data().token_type + ' ' + vm.access_data().access_token,
                    'Content-Type': 'application/json'
                },
                data: {
                    name: `${vm.$store.state.activeTrack.name} playlist by Spotifind`,
                    public: true
                }
            }).then(response => {
                playlistData = response
            }, (error) => {
                if (error.response.status === 401) {
                    redirectToSpotifyAuth()
                }
            })
            return playlistData
        },
        getUserPlaylists: async function () {
            return axios({
                method: 'GET',
                url: spotifyUrl + 'me/playlists',
                headers: {
                    'Authorization': this.access_data().token_type + ' ' + this.access_data().access_token
                }
            })
        },
        getTracksFromPlaylist: async function (id) {
            return api({
                method: 'GET',
                url: spotifyUrl + `playlists/${id}/tracks?fields=items(track.uri)`,
                headers: {
                    'Authorization': this.access_data().token_type + ' ' + this.access_data().access_token
                }
            })
        },
        deleteTracksFromPlaylist: async function (id, tracks) {
            await api({
                method: 'DELETE',
                url: spotifyUrl + `playlists/${id}/tracks`,
                headers: {
                    'Authorization': this.access_data().token_type + ' ' + this.access_data().access_token,
                    'Content-Type': 'application/json'
                },
                data: {
                    tracks: tracks
                }
            })
            console.log('deleted')
        },
        createDefaultPlaylist: async function () {
            let user_data = JSON.parse(window.localStorage.user_data)
            let vm = this
            let playlistData = null
            let defaultPlaylist
            let userPlaylists
            try {
                userPlaylists = await this.getUserPlaylists()
            } catch (error) {
                if (error.response.status === 401) {
                    await redirectToSpotifyAuth()
                    console.log('error logon on create default playlist')
                    return
                }
            }
            defaultPlaylist = userPlaylists.data.items.filter(obj => {
                return obj.name === 'Playlist by Spotifind'
            })
            if (defaultPlaylist.length !== 0) {
                let tracks = await this.getTracksFromPlaylist(defaultPlaylist[0].id)
                let proceedTracks = []
                for (let track of tracks.data.items) {
                    proceedTracks.push(track.track)
                }
                console.log(proceedTracks)
                await this.deleteTracksFromPlaylist(defaultPlaylist[0].id, proceedTracks)
                return {data: defaultPlaylist[0]}
            } else {
                await axios({
                    method: 'POST',
                    url: spotifyUrl + `users/${user_data.id}/playlists`,
                    headers: {
                        'Authorization': vm.access_data().token_type + ' ' + vm.access_data().access_token,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        name: `Playlist by Spotifind`,
                        public: true
                    }
                }).then(response => {
                    playlistData = response
                }, (error) => {
                    if (error.response.status === 401) {
                        redirectToSpotifyAuth()
                    }
                })
                return playlistData
            }
        },
        addRecommendedTracksToPlaylist: function (playlist_id) {
            console.log('adding')
            let uris = this.$store.state.recommendations.tracks.map(item => {
                return item.uri
            })
            uris.unshift(this.$store.state.activeTrack.uri)
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
            this.loading = true
            let newPlaylistData
            if (this.$store.state.isDefaultPlaylist) {
                newPlaylistData = await this.createDefaultPlaylist()
            } else {
                newPlaylistData = await this.createNewPlaylist()
            }
            if (!newPlaylistData) {
                window.addEventListener('storage', e => {
                    if (e.key === 'access_data') {
                        this.createRecsPlaylist()
                    }
                }, {once: true})
            } else {
                let result = await this.addRecommendedTracksToPlaylist(newPlaylistData.data.id)
                if (result.status === 201) {
                    this.message = 'Saved to Your library'
                }
                this.loading = false
            }
        },
        getTrackById: async function (trackId) {
            return await api({
                method: 'GET',
                url: spotifyUrl + `tracks/${trackId}`,
                headers: {
                    'Authorization': await this.authorization_token()
                }
            }).then(response => {
                return response
            }).catch(error => {
                console.error(error)
            })
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
