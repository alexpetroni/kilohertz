<template>
  <v-container
    fluid
    tag="section"
  >
    <v-row>
      <v-col
      cols="12"
      >
        <AttachmentForm
        multiple
        v-model="editedItem.attachments"
        />
      </v-col>
            <v-col
            cols="12"
            >
            <FormSubmitButtons
            formState="editState"
            @update-item="updateItem"
            />
            </v-col>
          </v-row>
</v-container>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import AttachmentForm from '@/components/forms/mini/AttachmentForm'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import { FormState } from '@common/utils'

export default {
  mixins: [ FormItemMixin ],

  data () {
    return {
      editState: FormState.EDIT,
    }
  },

  components: {
    AttachmentForm,
    FormSubmitButtons,
  },

  computed: {

  },
}
</script>
