<template>
  <ProductLoader
  :id="id"
  v-slot="{product}"
  >
  <v-card v-if="product">
    <v-toolbar flat>
      <v-btn
      v-if="isReordable"
      title="Drag to reorder"
      icon
      class="handle"
      >
        <v-icon>mdi-drag-vertical</v-icon>
      </v-btn>

      <template v-if="isVariableProduct(product)">
      <v-btn
      icon
      @click="toggleContent"
      >
      <v-icon
      class="">{{ showContentIcon }}</v-icon>
      </v-btn>
    </template>
    <template v-else>
      &nbsp; &nbsp; &nbsp;
    </template>

      <v-toolbar-title v-html="title(product)"></v-toolbar-title>

    <v-spacer/>
    <div class="text-right" style="width: 150px;">
    <DeleteBtn @click="$emit('delete', product.id)" />
    </div>
  </v-toolbar>


    <v-card-text v-if="isVariableProduct(product)">

      <ProductVariationsSelector
      v-show="showContent"
      :product="product"
      v-model="selection"
      />
    </v-card-text>
  </v-card>
</ProductLoader>
</template>

<script>
import ProductLoader from '@/components/rl/ProductLoader'
import ProductVariationsSelector from '@/components/selectors/ProductVariationsSelector'
import DeleteBtn from '@common/components/btn/DeleteBtn'
import { isVariableProduct } from '@common/utils'

export default {
  components: {
    ProductLoader,
    ProductVariationsSelector,
    DeleteBtn,
  },

  props: {
    id: {
      type: String,
      required: true,
    },

    variationsSku: {
      type: Array,
    },

    isReordable: {
      type: Boolean,
    },
  },

  data () {
    return {
      showContent: false,
    }
  },

  computed: {
    selection: {
      get () {
        return this.variationsSku ? this.variationsSku : []
      },

      set (skuArr) {
        this.$emit('update:variationsSku', skuArr)
      }
    },

    showContentIcon () {
      return this.showContent ? 'mdi-minus-box-outline' : 'mdi-plus-box-outline'
    },

    countSelected () {
      return this.variationsSku ? this.variationsSku.length : 0
    }

  },

  methods: {
    toggleContent () {
      this.showContent = !this.showContent
    },

    title (product) {
      if(!product) return ''
      let countSelected = isVariableProduct(product) ? `(${this.countSelected} / ${product.variations.length})` : ''
      return `${product.name} <small>sku:${product.sku}</small> ${countSelected}`
    },

    isVariableProduct (product) {
      return product && isVariableProduct(product)
    },
  },
}
</script>
