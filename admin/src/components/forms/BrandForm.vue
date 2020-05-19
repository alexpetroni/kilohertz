<template>
  <v-container
    fluid
    tag="section"
  >
    <base-material-card
      max-width="650"
     class="px-5 py-3 mx-auto">
      <template v-slot:heading>
        <FormTopBar
          addNewTitle="Add New Brand"
          v-bind="modelState"
          v-on="formEvents"
          :name="item.name"
        />
        </template>

        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>
        <v-alert v-if="error" type="error">{{ error }}</v-alert>

          <v-row justify="center">
            <v-col
            cols="12"
            >
              <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
            </v-col>

            <v-col
            cols="12"
            >
              <v-text-field v-model="editedItem.slug" label="Slug"></v-text-field>
            </v-col>

            <v-col
            cols="12"
            >
            <FormSubmitButtons
            :disabled="submitDisabled"
            :formState="formState"
            @update-item="updateItem"
            @create-item="createItem"
            />
            </v-col>
          </v-row>
    </base-material-card>
</v-container>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormTopBar from '@common/components/FormTopBar'
import FormSubmitButtons from '@common/components/FormSubmitButtons'

export default {
  mixins: [ FormItemMixin ],

  components: {
    FormTopBar,
    FormSubmitButtons,
  },

  computed: {
    submitDisabled () {
      return !this.editedItem.name.trim()
    },
  },
}
</script>
