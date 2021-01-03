import axios from "axios";

let loginMixin = {
    methods: {
        login: async function () {
            let token = window.localStorage.getItem('token')
            if (token === 'undefined') {
                axios({
                    method: 'POST',
                    url: 'https://accounts.spotify.com/api/token',
                    headers: {
                        'Authorization': 'Basic ZjRhYmMyN2VjY2Q4NDEyNDllYTZhZDA0ZmJjNzI0MjU6MDY5YmE5YjQ3ZGU0NGU3NjliNjM4MDgzMGM3YzIwZGM=',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 'grant_type=client_credentials'
                }).then(response => {
                    window.localStorage.setItem('token', response.data.access_token)
                })
            }
            return token
        }
    }
}

export default loginMixin