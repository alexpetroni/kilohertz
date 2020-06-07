<template>
  <LinkedProductsSetFormModel
    :id="id"
    :linkType="linkType"
    v-slot="{item, modelState, crudEvents}"
    v-on="pipeUp('item-created', 'item-deleted')"
    >
      <LinkedProductsSetForm
        :items="item.links"
        v-bind="modelState"
        v-on="Object.assign({}, crudEvents, pipeUp('new-item', 'cancel'))"
      />
  </LinkedProductsSetFormModel>
</template>

<script>
import LinkedProductsSetFormModel from '@/components/models/LinkedProductsSetFormModel'
import LinkedProductsSetForm from '@/components/forms/LinkedProductsSetForm'
import { pipeEvents } from '@common/utils'

export default {
  name: 'LinkedProductsSetEditor',

  components: {
    LinkedProductsSetFormModel,
    LinkedProductsSetForm,
  },

  props: {
    id: {
      type: String,
      required: true,
    },

    linkType: {
      type: String,
      required: true,
    }
  },

  methods: {
    pipeUp (...events) {
      return pipeEvents(this, ...events)
    },
  },

}
</script>
