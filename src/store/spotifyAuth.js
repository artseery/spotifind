import {client_id} from "@/authorizationToken";
import {api} from "@/api";
import {spotifyUrl} from "@/api";

let spotify_url = 'https://accounts.spotify.com/'

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
            })
        }
    },
    actions: {
        async authorize({commit}, access_data) {
            await commit('setAccessToken', access_data)
            await commit('setUserData')
        },
        redirectToSpotifyAuth() {
            let scopes = 'user-read-currently-playing user-read-playback-state playlist-modify-public playlist-modify-private'
            let encodedScopes = encodeURIComponent(scopes)
            window.location = spotify_url +
                `authorize?client_id=${client_id}&response_type=token&scope=${encodedScopes}&redirect_uri=http://localhost:8080`
        }
    }
}

export default spotifyAuth

