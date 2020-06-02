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
          addNewTitle="Add New Category"
          v-bind="modelState"
          v-on="formEvents"
          :name="item.name"
        />
        </template>

        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>

        <v-alert v-if="error" type="error">{{ error }}</v-alert>
        <v-card-text>
          <v-row justify="center">
            <v-col
            cols="12"
            sm="12"
            >
              <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
            </v-col>

            <v-col
            cols="12"
            sm="12"
            >
              <v-text-field v-model="editedItem.slug" label="Slug"></v-text-field>
            </v-col>

            <v-col
            cols="12"
            sm="12"
            md="6"
            >

              <AttachmentForm
              title="Image"
              v-model="editedItem.image"
              />
            </v-col>

            <v-col
            sm="12"
            md="6">
              <v-btn
              color="primary"
              outlined
              class="mt-7"
              v-if="isEditForm"
              @click="onEditCategoryMeta"
              >
                Edit Category Meta
              </v-btn>
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
        </v-card-text>
    </base-material-card>
</v-container>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormTopBar from '@common/components/FormTopBar'
import AttachmentForm from '@/components/forms/mini/AttachmentForm'
import FormSubmitButtons from '@common/components/FormSubmitButtons'

export default {
  mixins: [ FormItemMixin ],

  components: {
    FormTopBar,
    AttachmentForm,
    FormSubmitButtons,
  },

  computed: {
    submitDisabled () {
      return !this.editedItem.name.trim()
    },
  },

  methods: {
    onEditCategoryMeta () {
      this.$emit('edit-category-meta')
    },
  },
}
</script>
