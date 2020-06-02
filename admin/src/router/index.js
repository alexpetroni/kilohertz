// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
//
// Vue.use(VueRouter)
//
//   const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]
//
// const router = new VueRouter({
//   routes
// })
//
// export default router


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/pages',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: 'Lock',
          path: 'lock',
          component: () => import('@/views/pages/Lock'),
        },
        {
          name: 'Login',
          path: 'login',
          component: () => import('@/views/pages/Login'),
        },
        {
          name: 'Pricing',
          path: 'pricing',
          component: () => import('@/views/pages/Pricing'),
        },
        {
          name: 'Register',
          path: 'register',
          component: () => import('@/views/pages/Register'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },

        // Editors
        {
          name: 'Brands',
          path: 'brands',
          component: () => import('@/views/BrandsList'),
        },

        {
          name: 'Brand',
          path: 'brand-edit/:id?',
          component: () => import('@/views/Brand'),
        },

        {
          name: 'Variable Features',
          path: 'variable-features',
          component: () => import('@/views/VariableFeaturesList'),
        },

        {
          name: 'Variable Feature',
          path: 'variable-feature-edit/:id?',
          component: () => import('@/views/VariableFeature'),
        },

        {
          name: 'Families',
          path: 'families',
          component: () => import('@/views/FamiliesList'),
        },

        {
          name: 'Family',
          path: 'family-edit/:id?',
          component: () => import('@/views/Family'),
        },

        {
          name: 'Categories',
          path: 'categories',
          component: () => import('@/views/CategoriesTree'),
        },

        {
          name: 'Category',
          path: 'category-edit/:id?',
          component: () => import('@/views/Category'),
        },

        {
          name: 'Category Meta',
          path: 'category-meta-edit/:id?',
          component: () => import('@/views/CategoryMeta'),
        },

        {
          name: 'Products',
          path: 'products',
          component: () => import('@/views/ProductsList'),
        },

        {
          name: 'Product',
          path: 'product-edit/:id?',
          component: () => import('@/views/Product'),
        },

        {
          name: 'Attachments',
          path: 'attachments',
          component: () => import('@/views/AttachmentsList'),
        },

        {
          name: 'Media',
          path: 'media-edit/:id?',
          component: () => import('@/views/AttachmentsList'),
        },



        // Pages
        {
          name: 'RTL',
          path: 'pages/rtl',
          component: () => import('@/views/dashboard/pages/Rtl'),
        },
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Timeline',
          path: 'pages/timeline',
          component: () => import('@/views/dashboard/pages/Timeline'),
        },
        // Components
        {
          name: 'Buttons',
          path: 'components/buttons',
          component: () => import('@/views/dashboard/component/Buttons'),
        },
        {
          name: 'Grid System',
          path: 'components/grid-system',
          component: () => import('@/views/dashboard/component/Grid'),
        },
        {
          name: 'Tabs',
          path: 'components/tabs',
          component: () => import('@/views/dashboard/component/Tabs'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Forms
        {
          name: 'Regular Forms',
          path: 'forms/regular',
          component: () => import('@/views/dashboard/forms/RegularForms'),
        },
        {
          name: 'Extended Forms',
          path: 'forms/extended',
          component: () => import('@/views/dashboard/forms/ExtendedForms'),
        },
        {
          name: 'Validation Forms',
          path: 'forms/validation',
          component: () => import('@/views/dashboard/forms/ValidationForms'),
        },
        {
          name: 'Wizard',
          path: 'forms/wizard',
          component: () => import('@/views/dashboard/forms/Wizard'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        {
          name: 'Extended Tables',
          path: 'tables/extended-tables',
          component: () => import('@/views/dashboard/tables/ExtendedTables'),
        },
        {
          name: 'Data Tabels',
          path: 'tables/data-tables',
          component: () => import('@/views/dashboard/tables/DataTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        {
          name: 'Full Screen Map',
          path: 'maps/full-screen-map',
          component: () => import('@/views/dashboard/maps/FullScreenMap'),
        },
        // Root level
        {
          name: 'Widgets',
          path: 'widgets',
          component: () => import('@/views/dashboard/Widgets'),
        },
        {
          name: 'Charts',
          path: 'charts',
          component: () => import('@/views/dashboard/Charts'),
        },
        {
          name: 'Calendar',
          path: 'calendar',
          component: () => import('@/views/dashboard/Calendar'),
        },
      ],
    },
    {
      path: '*',
      component: () => import('@/views/pages/Index'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('@/views/pages/Error'),
        },
      ],
    },
  ],
})
