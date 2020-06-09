<template>
  <v-container
    fluid
    tag="section"
  >
    <base-material-card>
      <template v-slot:heading>
        <FormTopBar
          addNewTitle="Add New Attachment"
          editTitle="Edit Attachment"
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
              <ImgKit :src="item.url" />
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
import ImgKit from '@common/components/img/ImgKit'

export default {
  mixins: [ FormItemMixin ],

  components: {
    FormTopBar,
    FormSubmitButtons,
    ImgKit,
  },

  computed: {
    submitDisabled () {
      return !this.editedItem.name.trim()
    },
  },
}
</script>
