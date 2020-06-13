<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="white"
  >
    <!-- <v-container> -->
      <!-- <v-card flat color="transparent"> -->
        <!-- <v-toolbar> -->
      <v-toolbar-title class="link" @click="showHome">Kilohertz</v-toolbar-title>
      <v-spacer></v-spacer>
      <CartPreview @show-cart="showCart"/>

    <!-- </v-toolbar> -->
      <!-- </v-card> -->
    <!-- </v-container> -->
  </v-app-bar>
</template>

<script>

import CartPreview from '@/components/layouts/CartPreview'

  export default {
    name: 'AppBar',

    components: {
      CartPreview,
    },

    methods: {
      showHome () {
        this.$router.push({path: '/'})
      },

      showCart () {
        this.$router.push({path: '/cart'})
      }
    }
  }
</script>
