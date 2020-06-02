<template>
  <AttachmentsListFormModel
  v-slot="{items, totalItems, tableOptions, tableEvents, modelState}"
  >
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
     <template v-slot:activator="{ on }">
       <v-btn color="primary" dark v-on="on">{{ selectBtnText }}</v-btn>
     </template>

      <AttachmentsSelectList
      :items="items"
      :multiple="multiple"
      v-bind="modelState"
      v-on="Object.assign({}, tableEvents, pipeUp('edit-item', 'new-item'))"
      @cancel="closeDialog"
      @change="onItemsSelected"
      />
</v-dialog>
</AttachmentsListFormModel>
</template>

<script>
import AttachmentsSelectList from '@/components/common/AttachmentsSelectList'
import AttachmentsListFormModel from '@/components/models/AttachmentsListFormModel'
import { pipeEvents, jsonCopy } from '@common/utils'

export default {
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },

    selectSingleImageBtnText: {
      type: String,
      default: "Browse File"
    },

    selectMultipleImagesBtnText: {
      type: String,
      default: "Browse Files"
    },
  },

  components: {
    AttachmentsListFormModel,
    AttachmentsSelectList,
  },

  data () {
    return {
      dialog: false,
    }
  },

  computed: {
    selectBtnText () {
      return this.multiple ? this.selectMultipleImagesBtnText : this.selectSingleImageBtnText
    }
  },

  methods: {
    pipeUp (...events) {
      return pipeEvents(this, ...events)
    },

    closeDialog () {
      this.dialog = false
    },

    onItemsSelected (val) {
      let copy = jsonCopy(val)
      console.log('onItemsSelected copy %o', copy)
      console.log('onItemsSelected val %o', val)
      this.$emit('change', val)
      this.closeDialog()
    },
  },
}
</script>
