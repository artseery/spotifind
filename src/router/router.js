import routes from '@/router/routes'
import VueRouter from 'vue-router'
import { setUserData } from "@/utils";

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => { // TODO Всё это переписать
    let access_data = {}
    if (to.hash) {
        let splitHash = to.hash.split(/[# & =]/gm).slice(1)
        splitHash.forEach((item, key) => {
            if (key < 5 && !(key % 2)) {
                access_data[item] = splitHash[key + 1]
            }
        })
        window.localStorage.setItem('access_data', JSON.stringify(access_data))
    }
    if(!(window.localStorage.user_data) && window.localStorage.access_data ) {
        setUserData()
    }
    next()
})

export default router