import {client_id} from "@/authorizationToken";
import {api} from "../api";
import {spotifyUrl} from "@/api";
import store from "@/store/store";
import {recommendationsKeeper} from "@/pageStateKeeper";

let spotify_accounts_url = 'https://accounts.spotify.com/'

const spotifyAuth = {
    namespaced: true,
    state: {
        access_data: {},
        user_data: {}
    },
    mutations: {
        setAccessToken(state, access_data) {
            state.access_data = access_data
        },
        setUserData(state) {
            api({
                method: 'GET',
                url: spotifyUrl + 'me',
                headers: {
                    'Authorization': state.access_data.token_type + ' ' + state.access_data.access_token
                }
            }).then(response => {
                    state.user_data = response.data
                }, error => { //Пока добавлено как костыль, требует исправления
                    if (error.response.status === 401) {
                        if (this.$route.name === 'recommendations') {
                            recommendationsKeeper(this.$store)
                        }
                        store.dispatch('spotifyAuth/redirectToSpotifyAuth') // не 401 ошибка, а именно no token
                    }
                }
            )
        }
    },
    actions: {
        authorize({commit}, access_data) {
            commit('setAccessToken', access_data)
            commit('setUserData')
        },
        redirectToSpotifyAuth() {
            let scopes = 'user-read-currently-playing user-read-playback-state playlist-modify-public playlist-modify-private'
            let encodedScopes = encodeURIComponent(scopes)
            // Добавить If для случая пересылки именно с компонента рекомендаций
            recommendationsKeeper(store)
            window.location = spotify_accounts_url +
                `authorize?client_id=${client_id}&response_type=token&scope=${encodedScopes}&redirect_uri=${window.location.protocol}//${window.location.host}`
        }
    }
}

export default spotifyAuth

