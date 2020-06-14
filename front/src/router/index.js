import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/category/:slug/:id?',
    name: 'Category',
    component: () => import('../views/Category.vue')
  },

  {
    path: '/product/:slug/:sel?', // sel is the selected product variation sku
    name: 'Product',
    component: () => import('../views/Product.vue')
  },

  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },


]

const router = new VueRouter({
  routes
})

export default router
