// import Vue from 'vue'
// import App from './App.vue'
// import './registerServiceWorker'
// import router from './router'
// import store from './store'
// import { createProvider } from './vue-apollo'
// import vuetify from './plugins/vuetify';
//
// Vue.config.productionTip = false
//
// new Vue({
//   router,
//   store,
//   apolloProvider: createProvider(),
//   vuetify,
//   render: h => h(App)
// }).$mount('#app')


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apolloProvider from './vue-apollo-provider'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import './plugins/vue-world-map'
import vuetify from './plugins/vuetify'
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
