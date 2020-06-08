<template>
  <v-app>
    <AppBar />
    <v-content>
        <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import AppBar from '@/components/core/AppBar'
import Footer from '@/components/core/Footer'

export default {
  name: 'App',

  components: {
    AppBar,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
