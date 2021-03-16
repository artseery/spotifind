import axios from "axios";
import store from "@/store/store";

let spotifyUrl = 'https://api.spotify.com/v1/'

let api = axios.create({
    baseURL: spotifyUrl,
    timeout: 1000
})

function setupInterceptors() {
    api.interceptors.response.use((response) => response, (error) => {
        if (error.response.status === 401) {
            store.dispatch('SpotifyAuth/redirectToSpotifyAuth') // не 401 ошибка, а именно no token
        }
    })
}

export { api, setupInterceptors, spotifyUrl }