<template>
<v-container>
  <v-row>
    <v-col sm="3" md="2">
      <ImgKit
      :path="product.image"
      :transform="[{w: 150, h: 150}]"
      style="max-width: 100%;"
      />
    </v-col>
    <v-col sm="6" md="8">
      <div class="display-2">{{product.name}}</div>
      <template v-if="isProductVariation">
        <div v-for="(f, index) in productFeatures" :key="index">
          {{f.vfName}} : {{ f.fiName }}
        </div>
      </template>
      <div class="display-1">{{product.name}}</div>

      <div class="del"><v-btn icon small @click="$emit('remove-item', product.sku)"><v-icon small grey>mdi-trash-can-outline</v-icon> Entfernen</v-btn></div>
    </v-col>

    <v-col sm="3" md="2">
      <div style="width: 5em;" >
      <v-text-field
      label="Qty."
      :value="qty"
      @change="onQtyChange"
      type="number"
      >
      </v-text-field>
      </div>
      <div :class="priceStyle">{{ formatedPrice }}</div>
      <template v-if="priceObj.discountAmount">
        <div class="regularPrice">{{ formatedRegularPrice }}</div>
        <div class="discount">-{{ priceObj.discountPercent}}%</div>
      </template>
    </v-col>
    <v-col cols="12" dense><v-divider></v-divider></v-col>
  </v-row>
</v-container>
</template>

<script>
import ImgKit from '@common/components/img/ImgKit'
import { isProductVariation, zipFeatures, productPriceObject, formatPrice } from '@common/utils'
import { mapState, mapMutations } from 'vuex'

export default {

  components: {
    ImgKit,
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
    },

    qty: {
      type: Number,
    }
  },

  data () {
    return {

    }
  },

  computed: {
    ...mapState(['currencySymbol']),

    isProductVariation () {
      return isProductVariation(this.product)
    },

    productFeatures () {
      return zipFeatures(this.product.featuresConfig, this.product.variableFeatures)
    },

    priceObj () {
      return productPriceObject(this.product, this.qty)
    },

    priceStyle () {
      return this.priceObj.discountAmount ? 'salePrice' : ''
    },

    formatedPrice () {
      return formatPrice(this.priceObj.price, this.currencySymbol)
    },

    formatedRegularPrice () {
      return formatPrice(this.priceObj.regularPrice, this.currencySymbol)
    },
  },

  watch: {

  },

  methods: {
    ...mapMutations(['addToCart']),

    onQtyChange (val) {
      if(isNaN(val) || val < 0){
        val = 1
      }
      val = parseInt(val)
      this.addToCart({product: this.product, qty:val})
    },
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
