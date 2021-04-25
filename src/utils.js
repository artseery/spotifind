import {recommendationsKeeper} from "@/pageStateKeeper";
import store from "@/store/store";
import {client_id} from "@/authorizationToken";
import {api, spotifyUrl} from "@/api";

let spotify_accounts_url = 'https://accounts.spotify.com/'
let setUserDataEvent = new Event('setUserData')

async function redirectToSpotifyAuth() {
    let scopes = 'user-read-currently-playing user-read-playback-state playlist-modify-public playlist-modify-private'
    let encodedScopes = encodeURIComponent(scopes)
    await recommendationsKeeper(store)
    //window.location = spotify_accounts_url +
        //`authorize?client_id=${client_id}&response_type=token&scope=${encodedScopes}&redirect_uri=${window.location.protocol}//${window.location.host}${require('../vue.config.js').publicPath}`
    window.open(spotify_accounts_url +
        `authorize?client_id=${client_id}&response_type=token&scope=${encodedScopes}&redirect_uri=${window.location.protocol}//${window.location.host}${require('../vue.config.js').publicPath}`, 'spoty_auth', 'width=600,height=400')
}

async function setUserData() {
    let access_data = JSON.parse(window.localStorage.access_data)
    await api({
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

async function getTokenFromUrl(to) {
    let access_data = {}
    if (to.path) {
        let splitHash = to.path.split(/[/ & =]/gm).slice(1)
        if (splitHash[0] === 'access_token') {
            splitHash.forEach((item, key) => {
                if (key < 5 && !(key % 2)) {
                    access_data[item] = splitHash[key + 1]
                }
            })
            window.localStorage.setItem('access_data', JSON.stringify(access_data))
            await setUserData()
            window.close()
        }
    }
    if(!(window.localStorage.user_data) && window.localStorage.access_data ) {
        await setUserData()
    }
}

export { redirectToSpotifyAuth, setUserData, getTokenFromUrl }