import {recommendationsKeeper} from "@/pageStateKeeper";
import store from "@/store/store";
import {client_id} from "@/authorizationToken";
import {api, spotifyUrl} from "@/api";

let spotify_accounts_url = 'https://accounts.spotify.com/'
let setUserDataEvent = new Event('setUserData')

function redirectToSpotifyAuth() {
    let scopes = 'user-read-currently-playing user-read-playback-state playlist-modify-public playlist-modify-private'
    let encodedScopes = encodeURIComponent(scopes)
    recommendationsKeeper(store)
    window.location = spotify_accounts_url +
        `authorize?client_id=${client_id}&response_type=token&scope=${encodedScopes}&redirect_uri=${window.location.protocol}//${window.location.host}`
}

function setUserData() {
    let access_data = JSON.parse(window.localStorage.access_data)
    api({
        method: 'GET',
        url: spotifyUrl + 'me',
        headers: {
            'Authorization': access_data.token_type + ' ' + access_data.access_token
        }
    }).then(
        response => {
            let user_data = JSON.stringify(response.data)
            window.localStorage.setItem('user_data', user_data)
            window.dispatchEvent(setUserDataEvent)
        },
        error => {
            console.log(error)
        }
    )
}

export { redirectToSpotifyAuth, setUserData }