<template>
  <v-app>
    <AppBar />
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
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

<style>
.link {
  cursor: pointer;
}
</style>
