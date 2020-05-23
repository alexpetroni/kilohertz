<template>
  <ProductFormModel
    busEventName="product"
    :id="id"
    v-slot="{item, modelState, crudEvents}"
    v-on="pipeUp('item-created', 'item-deleted')"
    >
      <ProductForm
        :item="item"
        v-bind="modelState"
        v-on="Object.assign({}, crudEvents, pipeUp('new-item', 'cancel'))"
      />
  </ProductFormModel>
</template>

<script>
import ProductFormModel from '@/components/models/ProductFormModel'
import ProductForm from '@/components/forms/ProductForm'
import { pipeEvents } from '@common/utils'

export default {
  name: 'ProductEditor',

  components: {
    ProductFormModel,
    ProductForm,
  },

  props: {
    id: {
      type: String
    },
  },

  methods: {
    pipeUp (...events) {
      return pipeEvents(this, ...events)
    },
  },

}
</script>
