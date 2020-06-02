<template>
  <!-- provide id as setName just to have 'formEdit' state -->
  <ProductAttachmentsSetFormModel
    busEventName="productAttachmentsSet"
    :id="setName"
    :productId="productId"
    :name="setName"
    v-slot="{item, modelState, crudEvents}"
    >
      <ProductAttachmentsSetForm
        :item="item"
        v-bind="modelState"
        v-on="crudEvents"
      />
  </ProductAttachmentsSetFormModel>
</template>

<script>
import ProductAttachmentsSetFormModel from '@/components/models/ProductAttachmentsSetFormModel'
import ProductAttachmentsSetForm from '@/components/forms/ProductAttachmentsSetForm'

export default {
  name: 'ProductAttachmentsSetEditor',

  components: {
    ProductAttachmentsSetFormModel,
    ProductAttachmentsSetForm,
  },

  props: {
    productId: {
      type: String
    },

    setName: {
      type: String,
    },
  },

}
</script>
