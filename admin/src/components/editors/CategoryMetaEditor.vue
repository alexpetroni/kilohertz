<template>
  <CategoryMetaFormModel
    busEventName="category-meta"
    :id="id"
    v-slot="{item, modelState, crudEvents}"
    v-on="pipeUp('item-created', 'item-deleted')"
    >
      <CategoryMetaForm
        :item="item"
        v-bind="modelState"
        v-on="Object.assign({}, crudEvents, pipeUp('new-item', 'cancel'))"
      />
  </CategoryMetaFormModel>
</template>

<script>
import CategoryMetaFormModel from '@/components/models/CategoryMetaFormModel'
import CategoryMetaForm from '@/components/forms/CategoryMetaForm'
import { pipeEvents } from '@common/utils'

export default {
  name: 'CategoryMetaEditor',

  components: {
    CategoryMetaFormModel,
    CategoryMetaForm,
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
