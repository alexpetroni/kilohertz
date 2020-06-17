import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import apolloProvider from './vue-apollo-provider'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/base'
import './plugins/dam-img'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
