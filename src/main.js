import Vue from 'vue'
import App from './App.vue'
import store from '@/store/store'
import VueRouter from 'vue-router'
import router from "@/router/router";

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
