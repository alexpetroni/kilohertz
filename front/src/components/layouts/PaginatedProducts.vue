<template>
  <PaginatedProductsRL
  id="categories"
  v-slot="{items, totalItems, tableOptions, tableEvents, modelState}">
  <v-row>
      <ProductsListForm
        :items="items"
        :totalItems="totalItems"
        :tableOptions="tableOptions"
        v-bind="modelState"
        v-on="Object.assign({}, tableEvents)"
      />
  </v-row>
  </PaginatedProductsRL>
</template>

<script>
import PaginatedProductsRL from '@/components/rl/PaginatedProductsRL'
import ProductsListForm from '@/components/layouts/ProductsListForm'

export default {
  name: '',

  components: {
    PaginatedProductsRL,
    ProductsListForm,
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

  },

  data () {
    return {

    }
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
  },


}
</script>
