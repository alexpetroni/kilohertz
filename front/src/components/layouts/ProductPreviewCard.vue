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
      <ImgKit
      :path="imgPath"
      :transform="[{w: 400}]"
      style="max-width: 100%;"

      />
    </div>
    </template>

    <template v-slot:reveal-actions>

      <v-tooltip bottom
      v-for="(p, index) in previewFields"
      :key="index"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            class="mx-1"
            v-bind="attrs"
            icon
            :color="p.color"
            v-on="on"
          >
            <v-icon>{{ p.icon }}</v-icon>
          </v-btn>
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
import ImgKit from '@common/components/img/ImgKit'
import { isVariableProduct } from '@common/utils'

export default {
  components: {
    ImgKit,
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
      const pf = this.product && this.product.previewFields
      if(!Array.isArray(pf) || !pf.length) return []
      return pf.filter(e => !!e.title).map((e, index) => Object.assign({}, this.previewIcons[index], { title: e.title }))
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
