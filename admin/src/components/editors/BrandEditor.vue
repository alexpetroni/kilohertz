<template>
  <BrandFormModel
    busEventName="brand"
    :id="id"
    v-slot="{item, modelState, crudEvents}"
    v-on="pipeUp('item-created', 'item-deleted')"
    >
      <BrandForm
        :item="item"
        v-bind="modelState"
        v-on="Object.assign({}, crudEvents, pipeUp('new-item', 'cancel'))"
      />
  </BrandFormModel>
</template>

<script>
import BrandFormModel from '@/components/models/BrandFormModel'
import BrandForm from '@/components/forms/BrandForm'
import { pipeEvents } from '@common/utils'

export default {
  name: 'BrandEditor',

  components: {
    BrandFormModel,
    BrandForm,
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
