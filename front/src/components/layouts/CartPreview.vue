<template>
  <v-btn
  icon
  :color="cartColor"
  title="View Cart"
  @click="$emit('show-cart')"
  >
    <v-icon>mdi-cart</v-icon>
    ({{ itemsInCart }})
  </v-btn>
</template>

<script>
import { mapState } from 'vuex'

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

  },

  data () {
    return {

    }
  },

  computed: {
    ... mapState(['cartItems']),

    itemsInCart () {
      return this.cartItems.reduce((acc, e) => {
        acc += e.qty
        return acc
      }, 0)
    },

    cartColor () {
      return this.itemsInCart ? "primary" : "grey"
    }
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
