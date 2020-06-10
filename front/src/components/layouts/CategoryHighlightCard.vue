<template>
  <v-card>
    <v-card-title >
      {{ item.title }}
    </v-card-title>
    <v-card-text>
      {{ item.content }}
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: '',

  components: {

  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [],

  model: {

  },

  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {

    }
  },

  computed: {

  },

  watch: {

  },

  methods: {

  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
