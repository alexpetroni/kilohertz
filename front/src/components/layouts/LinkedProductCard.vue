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
      <div class="display-2 font-weight-light grey--text" v-html="productPrice">
      </div>

      <v-spacer />
    </template>
  </base-material-card>
</template>

<script>
import ImgTransf from '@common/components/img/ImgTransf'
import PreviewIconsGroup from '@common/components/PreviewIconsGroup'
import { isVariableProduct } from '@common/utils'

export default {
  components: {
    ImgTransf,
    PreviewIconsGroup,
  },

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


  },


}
</script>
