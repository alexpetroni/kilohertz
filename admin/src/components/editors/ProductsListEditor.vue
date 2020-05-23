<template>
  <ProductsListFormModel
  v-slot="{items, totalItems, tableOptions, tableEvents, modelState}"
  >
    <ProductsListForm
      :items="items"
      :totalItems="totalItems"
      :tableOptions="tableOptions"
      v-bind="modelState"
      v-on="Object.assign({}, tableEvents, pipeUp('edit-item', 'new-item'))"
    />
  </ProductsListFormModel>
</template>

<script>
import ProductsListFormModel from '@/components/models/ProductsListFormModel'
import ProductsListForm from '@/components/forms/ProductsListForm'
import { pipeUp } from '@common/utils'

export default {
  components: {
    ProductsListFormModel,
    ProductsListForm,
  },

  methods: {
    pipeUp (...args) {
      return pipeUp(this, args)
    },
  }

}
</script>
