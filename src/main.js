import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'

import './assets/scss/main.scss'

import router from './routes'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
