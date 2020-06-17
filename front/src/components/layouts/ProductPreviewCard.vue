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
      <v-img :src="imgUrl(product.image, [{w: 400}])" style="max-width: 100%;" />
    </div>
    </template>

    <template v-slot:reveal-actions>

      <v-tooltip bottom
      v-for="(p, index) in previewFields"
      :key="index"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-img
          v-bind="attrs"
          v-on="on"
          :src="p.image"
          class="card-icon-preview mx-2 mt-2"
          />

        </template>
        <span>{{ p.title }}</span>
      </v-tooltip>
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

import { isVariableProduct } from '@common/utils'

export default {
  components: {

  },

  props: {
    product: {
      type: Object,
    },
  },

  data () {
    return {
      previewIcons: [
        { icon: 'mdi-tag-heart-outline', color: 'blue' },
        { icon: 'mdi-trophy', color: 'success'},
        { icon: 'mdi-star-face', color: 'error'},
      ],
    }
  },

  computed: {

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

<style scoped>

</style>
