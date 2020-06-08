<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="white"
  >
    <v-container>
      <v-toolbar-title class="link" @click="showHome">Kilohertz</v-toolbar-title>
    </v-container>
  </v-app-bar>
</template>

<script>

  export default {
    name: 'AppBar',

    methods: {
      showHome () {
        this.$router.push({path: '/'})
      }
    }
  }
</script>
