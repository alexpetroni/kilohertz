<template>
  <ProductCategoryFormModel
    busEventName="product-category"
    :id="id"
    v-slot="{item, modelState, crudEvents}"
    v-on="pipeUp('item-updated')"
    ><div>
      <ProductCategoryForm
        :item="item"
        v-bind="modelState"
        v-on="Object.assign({}, crudEvents, pipeUp('new-item', 'cancel'))"
      />
    </div>
  </ProductCategoryFormModel>
</template>

<script>
import ProductCategoryFormModel from '@/components/models/ProductCategoryFormModel'
import ProductCategoryForm from '@/components/forms/ProductCategoryForm'
import { pipeEvents } from '@common/utils'

export default {
  name: 'ProductCategoryEditor',

  components: {
    ProductCategoryFormModel,
    ProductCategoryForm,
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
