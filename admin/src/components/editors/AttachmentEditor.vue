<template>
  <AttachmentFormModel
    busEventName="attachment"
    :id="id"
    v-slot="{item, modelState, crudEvents}"
    v-on="pipeUp('item-created', 'item-deleted')"
    >
      <AttachmentForm
        :item="item"
        v-bind="modelState"
        v-on="Object.assign({}, crudEvents, pipeUp('new-item', 'cancel'))"
      />
  </AttachmentFormModel>
</template>

<script>
import AttachmentFormModel from '@/components/models/AttachmentFormModel'
import AttachmentForm from '@/components/forms/AttachmentForm'
import { pipeEvents } from '@common/utils'

export default {
  name: 'AttachmentEditor',

  components: {
    AttachmentFormModel,
    AttachmentForm,
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
