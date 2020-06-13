<template>
  <v-card flat color="transparent">
    <v-card-actions>
      <v-spacer />
    <ProductPrice
    :product="product"
    :quantity="qty"
    />
    <div class="d-flex" style="width: 6em;">
    <v-text-field
        label="Qty."
        type="number"
        v-model.number="qty"
        class="mx-4"
      ></v-text-field>
    </div>

      <v-btn
      :disabled="disabledBtn"
      @click="addToCart"
      color="primary"
      >
      Add to Cart
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ProductPrice from '@/components/layouts/product/ProductPrice'
import { isVariableProduct } from '@common/utils'

export default {

  components: {
    ProductPrice,
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
    product: {
      type: Object,
    }
  },

  data () {
    return {
      qty: 1,
    }
  },

  computed: {
    disabledBtn () {
      return isVariableProduct(this.product) || isNaN(this.qty)  || this.qty < 1
    },
  },

  watch: {

  },

  methods: {
    addToCart () {

    },
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
