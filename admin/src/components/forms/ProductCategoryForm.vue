<template>
  <v-container
    tag="section"
  >
  <v-row>
    <v-col sm="12" md="6">
      <v-row>
      <v-col cols="12">
        <base-subheading>
          Product Categories
        </base-subheading>
        <CategoryTreeSelect
          v-model="editedItem"
        />
      </v-col>

      <v-col cols="12" sm="4">
        <FormSubmitButtons
        :formState="formState"
        @update-item="updateItem"
        btnTextUpdate="Update Categories"
        />
      </v-col>
    </v-row>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import CategoryTreeSelect from '@/components/selectors/CategoryTreeSelect'
import FormSubmitButtons from '@common/components/FormSubmitButtons'

export default {
  mixins: [ FormItemMixin ],

  components: {
    CategoryTreeSelect,
    FormSubmitButtons,
  },
}
</script>
