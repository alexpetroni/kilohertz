<template>
  <base-material-card
    color="transparent"
    hover-reveal
    image
    v-if="product"
  >
    <template v-slot:image>
      <div
       @click="showProduct(product)"
       class="link"
       >
      <ImgTransf
      :path="imgPath"
      :transformation="[{w: 350}]"
      style="max-width: 100%;"
      />
    </div>
    </template>

    <template v-slot:reveal-actions>
      <PreviewIconsGroup :items="previewFields" />
    </template>

    <v-card-title class="justify-center font-weight-light link"  @click="showProduct">
      {{ product.name }}
    </v-card-title>

    <v-card-text class="body-1 text-center mb-3 font-weight-light grey--text">
      {{ product.excerpt }}
    </v-card-text>

      <template v-slot:actions>
        <v-container class="pa-0 ma-0">
        <v-row no-gutters wrap>

        <AddToCartRL
        :product="p"
        v-slot="{priceObj, qty, addToCartBtnDisabled, addToCart, alreadyInCart, on}"
        >
        <v-col cols="12">
          <div v-html="showPrice(priceObj)"></div>
          <div  style="width: 6em; display: inline-block;">
            <v-text-field
                label="Qty."
                type="number"
                :value="qty"
                v-on="on"
                class="mx-4"
              ></v-text-field>
          </div>

            <v-btn
            :disabled="addToCartBtnDisabled"
            @click="addToCart({product:p, qty})"
            color="primary"
            small
            bottom
            right
            >
            Add to Cart
            <v-icon right dark v-if="alreadyInCart">mdi-check</v-icon>
          </v-btn>

          </v-col>
        </AddToCartRL>



        <v-col cols="12">

          <ProductVariationConfig
          v-if="isVariableProduct"
          :variableFeatures="variableFeatures"
          v-model="selectedConfig"
          :selectableConfigs="selectableConfigs"
          />
      </v-col>
    </v-row>
  </v-container>

      <v-spacer />
    </template>
  </base-material-card>
</template>

<script>
import ProductPresentationMixin  from '@/mixins/ProductPresentationMixin'
import ImgTransf from '@common/components/img/ImgTransf'
import PreviewIconsGroup from '@common/components/PreviewIconsGroup'
import AddToCartRL from '@/components/rl/AddToCartRL'
import { isVariableProduct, formatPrice } from '@common/utils'
import ProductVariationConfig from '@/components/layouts/product/ProductVariationConfig'
import { mapState } from 'vuex'

export default {
  components: {
    ImgTransf,
    PreviewIconsGroup,
    ProductVariationConfig,
    AddToCartRL,
  },

  mixins: [ ProductPresentationMixin ],

  props: {
    product: {
      type: Object,
    },
  },

  data () {
    return {

    }
  },

  computed: {
    ...mapState(['currencySymbol']),

    imgPath () {
      return this.product && this.product.image
    },

    productPrice () {
      if(!this.product) return
      let priceTxt = ''
      if(isVariableProduct(this.product) && this.product.price){
        priceTxt = `from CHF ${this.product.price}`
      }else{
        priceTxt = this.product.price ? `CHF ${this.product.price}` : ''
      }

      return priceTxt ? priceTxt : 'no price...'
    },

    previewFields () {
      if(!this.product || !this.product.previewFields) return []
      return this.product.previewFields.map(e => {
        let { title, content } = e
        let image = e.image && this.imgUrl(e.image, [{w: 28, h: 28}])
        return {title, content, image}
      })
    },
  },

  methods: {

    showPrice (priceObj) {
      if(!priceObj) return
      if(priceObj.isVariableProduct) {
       if(priceObj.variationsHaveMultiplePrices) {
         return `ab <span class="normal-price preview-card-price">${formatPrice(priceObj.variationsPricesRange[0], this.currencySymbol)}</span>`
       }else{
         return `<span class="normal-price preview-card-price">${formatPrice(priceObj.price, this.currencySymbol)}</span>`
       }
      }

      if(priceObj.hasSalePrice){
        return `<span class="hot-price preview-card-price">${formatPrice(priceObj.price, this.currencySymbol)} </span> statt <span class="regular-price preview-card-price">${formatPrice(priceObj.regularPrice, this.currencySymbol)}</span>`
      }
      return `<span class="normal-price preview-card-price">${formatPrice(priceObj.price, this.currencySymbol)} </span>`
    },

    showProduct () {
      this.$emit('show-product', {field: 'slug', value: this.product.slug})
    },

    randomPrice () {
      let price = 25 + 100 * Math.random()
      return Math.round(price)
    },

    randomDiscount () {
      let disc = 10 + 25 * Math.random()
      return Math.round(disc)
    },

    updatedSelectedSku (val) {
      this.selectedVariationSku = val
    },

  },

  created () {
    this.$on('selection-change', this.updatedSelectedSku)
  },

}
</script>
