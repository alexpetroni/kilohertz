<template>
  <v-container
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <base-subheading>
          Main Image
        </base-subheading>

        <AttachmentForm v-model="editedItem.image" />
      </v-col>

      <v-col cols="12" class="pt-12">
        <base-subheading>
          Gallery
        </base-subheading>
        <AttachmentForm v-model="editedItem.gallery" multiple />
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

  computed: {
    image: {
      get () {
        return this.item.image
      },

      set (val) {
        this.$set(this.item, 'image', val)
      }
    }
  },

  methods: {
  },
}
</script>
