<template>
  <div>
    {{ productId }} / {{ variationId }}
  </div>
</template>

<script>

export default {

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
    productId: {
      type: String,
      required: true,
    },

    variationId: {
      type: String
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
