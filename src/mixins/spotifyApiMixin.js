import axios from "axios";

let spotifyApiMixin = {
    methods: {
        login: async function () {
            let token = window.localStorage.getItem('token')
            if (token === 'undefined' || token === null) {
                axios({
                    method: 'POST',
                    url: 'https://accounts.spotify.com/api/token',
                    headers: {
                        'Authorization': 'Basic ZjRhYmMyN2VjY2Q4NDEyNDllYTZhZDA0ZmJjNzI0MjU6MDY5YmE5YjQ3ZGU0NGU3NjliNjM4MDgzMGM3YzIwZGM=',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 'grant_type=client_credentials'
                }).then(response => {
                    window.localStorage.setItem('token', JSON.stringify(response.data))
                    token = window.localStorage.getItem('token')
                })
            }
            return JSON.parse(token)
        },
        getData: async function (url) {
            let token = await this.login()
            axios({
                method: 'GET',
                url: 'https://api.spotify.com/v1/' + url,
                headers: {
                    'Authorization': token.token_type + ' ' + token.access_token
                }
            }).then(response => {
                    console.log(response)
                },
            ).catch(error => {
                console.log(error.response.status)
                if (error.response.status === 401) {
                    window.localStorage.clear()
                    this.getData(url)
                }
            })

        }
    }
}

export default spotifyApiMixin