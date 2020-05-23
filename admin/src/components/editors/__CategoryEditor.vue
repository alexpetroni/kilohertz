<template>
  <CategoryFormModel
    busEventName="category"
    :id="id"
    v-slot="{item, modelState, crudEvents}"
    v-on="pipeUp('item-created', 'item-updated', 'item-deleted')"
    >
      <CategoryForm
        :item="item"
        v-bind="modelState"
        v-on="Object.assign({}, crudEvents)"
      />
  </CategoryFormModel>
</template>

<script>
import CategoryFormModel from '@/components/models/CategoryFormModel'
import CategoryForm from '@/components/forms/CategoryForm'
import { pipeEvents } from '@common/utils'

export default {
  name: 'CategoryEditor',

  components: {
    CategoryFormModel,
    CategoryForm,
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
