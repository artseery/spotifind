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
            ).catch(error => {
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
        }
    }
}

export default spotifyApiMixin