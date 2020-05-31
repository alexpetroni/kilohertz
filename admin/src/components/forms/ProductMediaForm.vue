<template>
  <v-container
    fluid
    tag="section"
  >

<AttachmentsSelectDialog

/>

  <v-row>
  <v-col
  cols="12"
  >
  <FormSubmitButtons
  :formState="formState"
  @update-item="updateItem"
  @create-item="createItem"
  />
  </v-col>
</v-row>
</v-container>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import AttachmentsSelectDialog from '@/components/common/AttachmentsSelectDialog'

export default {
  mixins: [ FormItemMixin ],

  components: {
    FormSubmitButtons,
    AttachmentsSelectDialog,
  },

  computed: {
  },
}
</script>
