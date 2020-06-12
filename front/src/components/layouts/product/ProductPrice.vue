<template>
  <div>
    <div :class="priceStyle">{{ formatedPrice }}</div>
    <div v-if="saleIsActive" class="regularPrice"> {{ formatedRegularPrice }} </div>
     <br />
    {{ product }}
  </div>
</template>

<script>
import { isVariableProduct, productPrice } from '@common/utils'

export default {

  props: {
    product: {
      type: Object,
      default: () => {}
    },

    quantity: {
      type: Number,
      default: 1,
    },
  },

  computed: {
    hasVolumePrice () {
      return true
    },

    isVariableProduct () {
      return isVariableProduct(this.product)
    },

    saleIsActive () {
      return !!this.product.saleIsActive
    },

    formatedPrice () {
      return 'CHF ' + this.currentPrice
    },

    formatedRegularPrice () {
      return 'CHF ' + this.product.regularPrice
    },

    priceStyle () {
      return this.saleIsActive ? 'salePrice' : ''
    },

    currentPrice () {
      return productPrice(this.product, this.quantity)
    },

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.regularPrice {
  text-decoration: line-through;
  color: grey;
}

.salePrice {
  color: red;
}
</style>
