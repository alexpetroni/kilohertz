import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartItems: [],  // [{product: , qty: }, ...]
    currencySymbol: process.env.VUE_APP_CURRENCY_SYMBOL || 'CHF',
  },

  mutations: {
    addToCart (state, payload) {
      let existsIndex = state.cartItems.findIndex(e => e.product.sku == payload.product.sku)
      if(existsIndex >= 0){
        payload.qty ? state.cartItems.splice(existsIndex, 1, payload) : state.cartItems.splice(existsIndex, 1) // remove if no qty
      }else{
        if(payload.qty){
          state.cartItems.push(payload)
        }
      }
    },

    removeFromCart (state, sku) {
      let existsIndex = state.cartItems.findIndex(e => e.product.sku == sku)
      if(existsIndex >= 0){
        state.cartItems.splice(existsIndex, 1)
      }
    },


  },
  actions: {
  },

  modules: {
  }
})
