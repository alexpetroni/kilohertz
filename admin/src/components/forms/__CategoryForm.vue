<template>
  <v-container
    fluid
    tag="section"
  >
        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>

        <v-alert v-if="error" type="error">{{ error }}</v-alert>

          <v-row justify="center">
            <v-col
            cols="6"
            >
              <v-text-field v-model="editedItem.name" label="Name" class="mt-6"></v-text-field>
            </v-col>

            <v-col
            cols="6"
            >
            <FormSubmitButtons
            :disabled="submitDisabled"
            :formState="formState"
            @update-item="updateItem"
            @create-item="createItem"
            @cancel="cancel"
            btnTextAdd="Add Category"
            btnTextUpdate="Update Category"
            cancelBtn
            />
            </v-col>
          </v-row>
</v-container>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormSubmitButtons from '@common/components/FormSubmitButtons'

export default {
  mixins: [ FormItemMixin ],

  components: {
    FormSubmitButtons,
  },

  computed: {
    submitDisabled () {
      return !this.editedItem.name.trim()
    },
  },
}
</script>
