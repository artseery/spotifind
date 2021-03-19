import axios from "axios";
import store from "@/store/store";
import { recommendationsKeeper } from '@/pageStateKeeper'

let spotifyUrl = 'https://api.spotify.com/v1/'

let api = axios.create({
    baseURL: spotifyUrl,
    timeout: 1000
})

function setupInterceptors(vm) {
    api.interceptors.response.use((response) => {
        console.log('api:', response)
        return response
    }, (error) => {
        if (error.response.status === 401) {
            if(vm.$route.name === 'recommendations') {
                recommendationsKeeper(vm.$store)
            }
            store.dispatch('spotifyAuth/redirectToSpotifyAuth') // не 401 ошибка, а именно no token
        }
    })
}

export { api, setupInterceptors, spotifyUrl }