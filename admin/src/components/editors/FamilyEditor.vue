<template>
  <FamilyFormModel
    busEventName="family"
    :id="id"
    v-slot="{item, modelState, crudEvents}"
    v-on="pipeUp('item-created', 'item-updated', 'item-deleted')"
    >
      <FamilyForm
        :item="item"
        v-bind="modelState"
        v-on="Object.assign({}, crudEvents, pipeUp('new-item', 'cancel'))"
      />
  </FamilyFormModel>
</template>

<script>
import FamilyFormModel from '@/components/models/FamilyFormModel'
import FamilyForm from '@/components/forms/FamilyForm'
import { pipeEvents } from '@common/utils'

export default {
  name: 'FamilyEditor',

  components: {
    FamilyFormModel,
    FamilyForm,
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
