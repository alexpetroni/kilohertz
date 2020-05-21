<template>
  <FamiliesListFormModel
  v-slot="{items, totalItems, tableOptions, tableEvents, modelState}"
  >
    <FamiliesListForm
      :items="items"
      :totalItems="totalItems"
      :tableOptions="tableOptions"
      v-bind="modelState"
      v-on="Object.assign({}, tableEvents, pipeUp('edit-item', 'new-item'))"
    />
  </FamiliesListFormModel>
</template>

<script>
import FamiliesListFormModel from '@/components/models/FamiliesListFormModel'
import FamiliesListForm from '@/components/forms/FamiliesListForm'
import { pipeUp } from '@common/utils'

export default {
  components: {
    FamiliesListFormModel,
    FamiliesListForm,
  },

  methods: {
    pipeUp (...args) {
      return pipeUp(this, args)
    },
  }

}
</script>
