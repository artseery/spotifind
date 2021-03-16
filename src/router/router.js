import routes from '@/router/routes'
import VueRouter from 'vue-router'
import store from '../store/store'

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    let access_data = {}
    let local_access_data = window.localStorage.getItem('access_data')
    if (to.hash) {
        let splitHash = to.hash.split(/[# & =]/gm).slice(1)
        splitHash.forEach((item, key) => {
            if (key < 5 && !(key % 2)) {
                access_data[item] = splitHash[key + 1]
            }
        })

        if (Object.keys(store.state.SpotifyAuth.access_data).length === 0 && !local_access_data) {
            window.localStorage.setItem('access_data', JSON.stringify(access_data))
            store.dispatch('SpotifyAuth/authorize', access_data)
            next()
            return false
        }
        if (local_access_data && Object.keys(store.state.SpotifyAuth.access_data).length === 0) {
            store.dispatch('SpotifyAuth/authorize', JSON.parse(local_access_data))
        }
        if (local_access_data.access_token !== access_data.access_token) {
            store.dispatch('SpotifyAuth/authorize', access_data)
            window.localStorage.setItem('access_data', JSON.stringify(access_data))
        }
    } // Разбить по частям, внести исправления
    next()
})

export default router