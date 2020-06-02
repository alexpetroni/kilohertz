<template>
  <v-container
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <AttachmentForm v-model="editedItem.image" />
      </v-col>
    </v-row>


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
import AttachmentForm from '@/components/forms/mini/AttachmentForm'

export default {
  mixins: [ FormItemMixin ],

  components: {
    FormSubmitButtons,
    AttachmentForm,
  },
}
</script>
