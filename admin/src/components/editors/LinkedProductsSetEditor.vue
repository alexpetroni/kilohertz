<template>
  <LinkedProductsSetFormModel
    :id="id"
    linkType="cross-sell"
    v-slot="{item, modelState, crudEvents}"
    v-on="pipeUp('item-created', 'item-deleted')"
    :reloadAfterUpdate="true"
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
  name: 'LinkedProductsEditor',

  components: {
    LinkedProductsSetFormModel,
    LinkedProductsSetForm,
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
