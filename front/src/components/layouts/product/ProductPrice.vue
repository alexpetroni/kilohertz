<template>
  <div class="subtitle-2 d-flex">
    <!-- ======================== VARIABLE PRODUCT ======================== -->
    <template v-if="priceObj.isVariableProduct">
      <span class="discountPercent" v-if="priceObj.variationsMaxDiscountAmount"><v-icon color="error">mdi-label-percent</v-icon> -{{priceObj.variationsMaxDiscountPercent}}% </span>
      <span v-if="priceObj.variationsHaveMultiplePrices" class="ml-2">ab {{ priceObj.variationsPricesRange[0] }}</span>
      <template v-else>

        <span v-if="priceObj.discountAmount" class="regularPrice subtitle-2"> {{ formatedRegularPrice }} </span>
        <span :class="priceStyle">{{ formatedPrice }}</span>
      </template>
    </template>

    <!-- ======================== CARTABLE PRODUCT ======================== -->
    <template v-else>
      <v-icon color="error">mdi-label-percent</v-icon><span class="discountPercent" v-if="priceObj.discountPercent"> -{{ priceObj.discountPercent }}% </span>
      <span v-if="priceObj.discountAmount" class="regularPrice mx-2"> {{ formatedRegularPrice }} </span>
      <span :class="priceStyle">{{ formatedPrice }}</span>
    </template>
  </div>
</template>

<script>
import { isVariableProduct, productPrice, productPriceObject } from '@common/utils'

export default {

  props: {
    product: {
      type: Object,
      default: () => {}
      // {
      // hasVolumeDiscount,
      // hasSalePrice,
      // regularPrice,
      // price,
      // discountPercent,
      // discountAmount,
      // isVariableProduct,
      // variationsHaveMultiplePrices,
      // variationsPricesRange,
      // variationsMaxDiscountAmount,
      // variationsMaxDiscountPercent,
      // }
    },

    quantity: {
      type: Number,
      default: 1,
    },
  },

  computed: {
    priceObj () {
      return productPriceObject(this.product, this.quantity)
    },

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
      return 'CHF ' + this.priceObj.price
    },

    formatedRegularPrice () {
      return 'CHF ' + this.priceObj.regularPrice
    },

    priceStyle () {
      return this.priceObj.discountAmount ? 'salePrice' : ''
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

.discountPercent {

}
</style>
