import routes from '@/router/routes'
import VueRouter from 'vue-router'
import store from '../store/store'

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => { // TODO Всё это переписать
    let access_data = {}
    let local_access_data = window.localStorage.getItem('access_data')
    if (to.hash) {
        console.log('1')
        let splitHash = to.hash.split(/[# & =]/gm).slice(1)
        splitHash.forEach((item, key) => {
            if (key < 5 && !(key % 2)) {
                access_data[item] = splitHash[key + 1]
            }
        })
        if (Object.keys(store.state.spotifyAuth.access_data).length === 0 && (!local_access_data || !local_access_data.access_token)) {
            window.localStorage.setItem('access_data', JSON.stringify(access_data))
            store.dispatch('spotifyAuth/authorize', access_data)
            next()
            return false
        }
    } // Разбить по частям, внести исправления
    else if (local_access_data && Object.keys(store.state.spotifyAuth.access_data).length === 0) {
        console.log('2')
        store.dispatch('spotifyAuth/authorize', JSON.parse(local_access_data))
    }
    else if(local_access_data) {
        console.log('3')
        if (local_access_data.access_token !== access_data.access_token) {
            store.dispatch('spotifyAuth/authorize', access_data)
            window.localStorage.setItem('access_data', JSON.stringify(access_data))
        }
    }
    next()
})

export default router