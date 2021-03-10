
import {client_id} from "@/authorizationToken";

let spotify_url = 'https://accounts.spotify.com/'

const SpotifyAuth = {
    namespaced: true,
    state: {
        auth_code: null
    },
    mutations: {
        getAuthorizationCode() {
            window.open(spotify_url + `authorize?client_id=${client_id}&response_type=token&redirect_uri=http://localhost:8080`)
        }
    },
    actions: {
        authorize({commit}) {
            commit('getAuthorizationCode')
        }
    }
}

export default SpotifyAuth