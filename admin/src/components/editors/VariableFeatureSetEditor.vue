<template>
  <VariableFeatureSetFormModel
    busEventName="variableFeatureSet"
    :id="id"
    v-slot="{item, modelState, crudEvents}"
    v-on="pipeUp('item-created', 'item-updated', 'item-deleted')"
    >
      <VariableFeatureSetForm
        :item="item"
        v-bind="modelState"
        v-on="Object.assign({}, crudEvents, pipeUp('new-item', 'cancel'))"
      />
  </VariableFeatureSetFormModel>
</template>

<script>
import VariableFeatureSetFormModel from '@/components/models/VariableFeatureSetFormModel'
import VariableFeatureSetForm from '@/components/forms/VariableFeatureSetForm'
import { pipeEvents } from '@common/utils'

export default {
  name: 'VariableFeatureSetEditor',

  components: {
    VariableFeatureSetFormModel,
    VariableFeatureSetForm,
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
