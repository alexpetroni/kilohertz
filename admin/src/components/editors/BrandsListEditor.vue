<template>
  <BrandsListFormModel
  v-slot="{items, totalItems, tableOptions, tableEvents, modelState}"
  >
    <BrandsListForm
      :items="items"
      :totalItems="totalItems"
      :tableOptions="tableOptions"
      v-bind="modelState"
      v-on="Object.assign({}, tableEvents, pipeUp('edit-item', 'new-item'))"
    />
  </BrandsListFormModel>
</template>

<script>
import BrandsListFormModel from '@/components/models/BrandsListFormModel'
import BrandsListForm from '@/components/forms/BrandsListForm'
import { pipeUp } from '@common/utils'

export default {
  components: {
    BrandsListFormModel,
    BrandsListForm,
  },

  methods: {
    pipeUp (...args) {
      return pipeUp(this, args)
    },
  }

}
</script>
