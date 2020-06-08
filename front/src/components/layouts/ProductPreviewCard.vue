<template>
  <base-material-card
    color="transparent"
    hover-reveal
    image
    v-if="product"
  >
    <template v-slot:image>
      <!-- <v-img
        src="https://demos.creative-tim.com/vue-material-dashboard-pro/img/card-1.jpg"
      /> -->
      <div @click="showProduct(product)">
      <ImgKit
      :path="imgPath"
      :transform="[{w: 400}]"
      style="max-width: 100%;"

      />
    </div>
    </template>

    <template v-slot:reveal-actions>
      <v-tooltip bottom>
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            class="mx-1"
            v-bind="attrs"
            icon
            v-on="on"
          >
            <v-icon>mdi-tag-heart-outline</v-icon>
          </v-btn>
        </template>

        <span>{{ tooltipText(product, 0) }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            v-bind="attrs"
            class="mx-1"
            color="success"
            light
            icon
            v-on="on"
          >
            <v-icon class="success--text">
              mdi-trophy
            </v-icon>
          </v-btn>
        </template>

        <span>{{ tooltipText(product, 1) }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            v-bind="attrs"
            class="mx-1"
            color="error"
            light
            icon
            v-on="on"
          >
            <v-icon class="error--text">
              mdi-star-face
            </v-icon>
          </v-btn>
        </template>

        <span>{{ tooltipText(product, 2) }}</span>
      </v-tooltip>
    </template>

    <v-card-title class="justify-center font-weight-light"  @click="showProduct(product)">
      {{ product.name }}
    </v-card-title>

    <v-card-text class="body-1 text-center mb-3 font-weight-light grey--text">
      {{ product.excerpt }}
    </v-card-text>

    <template v-slot:actions>
      <div class="display-2 font-weight-light grey--text" v-html="productPrice">
      </div>

      <v-spacer />

      <!-- <span class="caption grey--text font-weight-light">
        <v-icon small color="orange">mdi-fire</v-icon>

        up to {{ randomDiscount() }}% dicount
      </span> -->
    </template>
  </base-material-card>
</template>

<script>
import ImgKit from '@common/components/img/ImgKit'
import { isVariableProduct } from '@common/utils'

export default {
  name: '',

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
    }
  },

  watch: {

  },

  methods: {
    tooltipText (index) {
      let text = ''
      const item = this.product
      if(item && item.meta && item.meta.previewFields && item.meta.previewFields[index] && item.meta.previewFields[index]['title']){
        text = item.meta.previewFields[index]['title']
      }
      return text
    },

    showProduct () {
      this.$emit('show-product', this.product.id)
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
