<template>
  <VariableFeatureSetsListFormModel
  v-slot="{items, totalItems, tableOptions, tableEvents, modelState}"
  >
    <VariableFeatureSetsListForm
      :items="items"
      :totalItems="totalItems"
      :tableOptions="tableOptions"
      v-bind="modelState"
      v-on="Object.assign({}, tableEvents, pipeUp('edit-item', 'new-item'))"
    />
  </VariableFeatureSetsListFormModel>
</template>

<script>
import VariableFeatureSetsListFormModel from '@/components/models/VariableFeatureSetsListFormModel'
import VariableFeatureSetsListForm from '@/components/forms/VariableFeatureSetsListForm'
import { pipeUp } from '@common/utils'

export default {
  components: {
    VariableFeatureSetsListFormModel,
    VariableFeatureSetsListForm,
  },

  methods: {
    pipeUp (...args) {
      return pipeUp(this, args)
    },
  }

}
</script>
