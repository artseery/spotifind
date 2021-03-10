import routes from '@/router/routes'
import VueRouter from 'vue-router'

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router