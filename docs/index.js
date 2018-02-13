import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import {routes} from './routes'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: debug ? 'hash' : 'history',
  routes: routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  render: mount => mount(App),
  router
})
