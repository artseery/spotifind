import routes from '@/router/routes'
import VueRouter from 'vue-router'
import {getTokenFromUrl} from "@/utils";

const router = new VueRouter({
    routes,
    mode: 'hash',
    base: require('../../vue.config.js').publicPath
})

router.beforeEach(async (to, from, next) => {
    await getTokenFromUrl(to)
    next()
})

export default router