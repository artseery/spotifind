import axios from "axios";
import store from "@/store/store";
import {recommendationsKeeper} from '@/pageStateKeeper'
import { redirectToSpotifyAuth } from "@/utils";

let spotifyUrl = 'https://api.spotify.com/v1/'

let api = axios.create({
    baseURL: spotifyUrl,
    timeout: 1000
})

function setupInterceptors() {
    console.log('Interceptors set')
    api.interceptors.response.use((response) => {
        console.log('api:', response)
        return response
    }, async (error) => {
        if (error.response.status === 401) {
            recommendationsKeeper(store)
            await redirectToSpotifyAuth()

        }
    }, () => {
        console.log('always happen')
    })
}

export {api, setupInterceptors, spotifyUrl}