<template>
  <div class="subtitle-2 d-flex">
    <template v-if="priceObj">
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

    </template>
  </div>
</template>

<script>
import { productPriceObject, formatPrice } from '@common/utils'
import { mapState } from 'vuex'

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
    ...mapState(['currencySymbol']),
    priceObj () {
      return productPriceObject(this.product, this.quantity)
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

    formatedPrice () {
      return formatPrice(this.priceObj.price, this.currencySymbol)
    },

    formatedRegularPrice () {
      return formatPrice(this.priceObj.regularPrice, this.currencySymbol)
    },

    priceStyle () {
      return this.priceObj.discountAmount ? 'salePrice' : ''
    },

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.discountPercent {

}
</style>
