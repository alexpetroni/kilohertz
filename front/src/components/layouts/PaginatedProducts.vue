<template>
  <PaginatedProductsRL
  :category="category"
  v-slot="{items, totalItems, tableOptions, tableEvents, modelState}">
  <v-row>
      <ProductsListForm
        :items="items"
        :totalItems="totalItems"
        :tableOptions="tableOptions"
        :title="title"
        v-bind="modelState"
        v-on="Object.assign({}, tableEvents, pipeUp('show-product'))"
      />
  </v-row>
  </PaginatedProductsRL>
</template>

<script>
import PaginatedProductsRL from '@/components/rl/PaginatedProductsRL'
import ProductsListForm from '@/components/layouts/ProductsListForm'
import { pipeEvents } from '@common/utils'

export default {
  components: {
    PaginatedProductsRL,
    ProductsListForm,
  },

  props: {
    category: {
      type: String,
    },

    title: {
      type: String,
    },
  },

  computed: {

  },

  watch: {

  },

  methods: {
    tooltipText (item, index) {
      let text = ''
      if(item && item.meta && item.meta.previewFields && item.meta.previewFields[index] && item.meta.previewFields[index]['title']){
        text = item.meta.previewFields[index]['title']
      }
      return text
    },

    imgPath (item) {
      return item.category.image ? item.category.image : ''
    },

    categoryName (item) {
      return item.category.name ? item.category.name : ''
    },

    categoryDescription (item) {
      return item.meta && item.meta.description ? item.meta.description : ''
    },

    pipeUp (...events) {
      return pipeEvents(this, ...events)
    },
  },


}
</script>
