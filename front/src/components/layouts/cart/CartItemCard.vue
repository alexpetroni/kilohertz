<template>
<v-container>
  <v-row>
    <v-col sm="4" md="2">
      <ImgKit
      :path="product.image"
      :transform="[{w: 150, h: 150}]"
      style="max-width: 100%;"
      />
    </v-col>
    <v-col sm="4" md="4">
      <div class="display-2">{{product.name}}</div>
      <template v-if="isProductVariation">
        <div v-for="(f, index) in productFeatures" :key="index">
          {{f.vfName}} : {{ f.fiName }}
        </div>
      </template>
      <div class="display-1">{{product.name}}</div>

      <div class="del"><v-btn icon small @click="$emit('remove-item', product.sku)"><v-icon small grey>mdi-trash-can-outline</v-icon> Entfernen</v-btn></div>
    </v-col>
    <v-col>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import ImgKit from '@common/components/img/ImgKit'
import { isProductVariation, zipFeatures } from '@common/utils'

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
    isProductVariation () {
      console.log('prod %o', this.product)
      return isProductVariation(this.product)
    },

    productFeatures () {
      console.log('this.product.variableFeatures %o', this.product.variableFeatures)
      console.log('this.product.featuresConfig %o', this.product.featuresConfig)
      return zipFeatures(this.product.featuresConfig, this.product.variableFeatures)
    },

  },

  watch: {

  },

  methods: {

  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
