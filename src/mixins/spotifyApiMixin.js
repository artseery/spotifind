import axios from "axios";
import authToken from "@/authorizationToken";

let spotifyUrl = 'https://api.spotify.com/v1/'

let spotifyApiMixin = {
    methods: {
        login: async function () {
            let token = window.localStorage.getItem('token')
            if (token === 'undefined' || token === null) {
                axios({
                    method: 'POST',
                    url: 'https://accounts.spotify.com/api/token',
                    headers: {
                        'Authorization': authToken,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 'grant_type=client_credentials'
                }).then(response => {
                    window.localStorage.setItem('token', JSON.stringify(response.data))
                    token = window.localStorage.getItem('token')
                })
            }
            return JSON.parse(token)
        }, // Разделить на 2 функции (получение токена и запись)
        getSearchData: async function (query, type) {
            let token = await this.login()
            axios({
                method: 'GET',
                url: spotifyUrl + 'search?q=' + query + '&type=' + type,
                headers: {
                    'Authorization': token.token_type + ' ' + token.access_token
                }
            }).then(response => {
                    this.writeSearchResultToStorage(response.data)
                },
            ).catch(error => { // Сделать общий обработчик ошибок на все функции работы с API
                console.log(error.response.status)
                if (error.response.status === 401) {
                    window.localStorage.clear()
                    this.getSearchData(query, type)
                }
            })
        },
        writeSearchResultToStorage: function (data) {
            this.$store.dispatch('updateResults', data).then(() => {
                console.log(data)
            })
        },

        getRecommendationsData: async function (seed_tracks) { // В дальнейшем кол-во фильтров расширится
            let token = await this.login()
            axios({
                method: 'GET',
                url: spotifyUrl + 'recommendations?seed_tracks=' + seed_tracks,
                headers: {
                    'Authorization': token.token_type + ' ' + token.access_token
                }
            }).then(response => {
                console.log('recommendations:')
                    console.log(response)
                },
            ).catch(error => { // Сделать общий обработчик ошибок на все функции работы с API
                console.log(error.response.status)
                if (error.response.status === 401) {
                    window.localStorage.clear()
                    this.getRecommendationsData(seed_tracks)
                }
            })
        }
    }
}

export default spotifyApiMixin