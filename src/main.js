import Vue from 'vue'
import App from './App.vue'
import store from '@/store/store'
import VueRouter from 'vue-router'
import router from "@/router/router";
import {setupInterceptors} from "@/api";


Vue.use(VueRouter)
Vue.config.productionTip = false

Vue.config.ignoredElements = [
    'a-scene',
    'a-camera',
    'a-box',
    'a-image',
    'a-assets',
    'a-asset-item',
    'a-entity',
    'a-marker',
    'a-video',
    'a-nft'
]

setupInterceptors()

let vm = new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')

export {vm}

