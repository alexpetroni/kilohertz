<template>
  <ProductFormModel
    busEventName="product"
    :id="id"
    v-slot="{item, modelState, crudEvents}"
    v-on="pipeUp('item-created', 'item-deleted')"
    >
      <ProductBasicForm
        :item="productBasicData(item)"
        v-bind="modelState"
        v-on="Object.assign({}, crudEvents, pipeUp('new-item', 'cancel'))"
      />
  </ProductFormModel>
</template>

<script>
import ProductFormModel from '@/components/models/ProductFormModel'
import ProductBasicForm from '@/components/forms/ProductBasicForm'
import { pipeEvents } from '@common/utils'
import { pick } from 'lodash-es'

export default {
  name: 'ProductEditor',

  components: {
    ProductFormModel,
    ProductBasicForm,
  },

  props: {
    id: {
      type: String
    },
  },

  computed: {

  },

  methods: {
    productBasicData (item) {
      let fields = [
        'type',
        'name',
        'slug',
        'sku',
        'published',
        'excerpt',
        'description',
        'technicalInformation',
        'displayOrder',

        'sizeWidth',
        'sizeHeight',
        'sizeLength',
        'sizeUnit',

        'weightNet',
        'weightGross',
        'weightUnit',
        'previewFields',
      ]

      return pick(item, fields)
    },

    pipeUp (...events) {
      return pipeEvents(this, ...events)
    },
  },

}
</script>
