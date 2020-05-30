<template>
  <AttachmentsListFormModel
  v-slot="{items, totalItems, tableOptions, tableEvents, modelState}"
  >
    <AttachmentsListForm
      :items="items"
      :totalItems="totalItems"
      :tableOptions="tableOptions"
      v-bind="modelState"
      v-on="Object.assign({}, tableEvents, pipeUp('edit-item', 'new-item'))"
    />
  </AttachmentsListFormModel>
</template>

<script>
import AttachmentsListFormModel from '@/components/models/AttachmentsListFormModel'
import AttachmentsListForm from '@/components/forms/AttachmentsListForm'
import { pipeUp } from '@common/utils'

export default {
  components: {
    AttachmentsListFormModel,
    AttachmentsListForm,
  },

  methods: {
    pipeUp (...args) {
      return pipeUp(this, args)
    },
  }

}
</script>
