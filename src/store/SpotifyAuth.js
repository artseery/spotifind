
import {client_id} from "@/authorizationToken";

let spotify_url = 'https://accounts.spotify.com/'

const SpotifyAuth = {
    namespaced: true,
    state: {
        access_data: {}
    },
    mutations: {
        setAccessToken(state, access_data) {
            state.access_data = access_data
        }
    },
    actions: {
        authorize({ commit }, access_data) {
            commit('setAccessToken', access_data)
        },
        redirectToSpotifyAuth() {
            window.location = spotify_url + `authorize?client_id=${client_id}&response_type=token&redirect_uri=http://localhost:8080`
        }
    }
}

export default SpotifyAuth