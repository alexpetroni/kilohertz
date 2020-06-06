<template>
  <v-container
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
      cols="12"
      sm="8"
      md="4"
      >
        <ProductSearch
        @selected="onProductSelected"
        />
      </v-col>



        <v-col
        cols="12"
        v-if="!isEmptyList"
        >
        <draggable v-model="editedItem" handle=".handle" @change="onReorder">

          <LinkedProductItemConfig
          v-for="item in editedItem"
          :key="item.id"
          :id="item.id"
          :variationsSku.sync="item.variationsSku"
          :isReordable="isReordable"
          @delete="deleteItem"
          />

        </draggable>
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

      <ConfirmationDialog
        v-model="dialog"
        :message="dialogMsg"
        @confirm="onConfirm"
      />
  </v-row>
</v-container>
</template>

<script>
import draggable from 'vuedraggable'
import FormListMixin from '@common/mixins/FormListMixin'
import ProductSearch from '@/components/selectors/ProductSearch'
import LinkedProductItemConfig from '@/components/selectors/LinkedProductItemConfig'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import ConfirmationDialog from '@common/components/ConfirmationDialog'

export default {
  mixins: [ FormListMixin ],

  components: {
    draggable,
    ProductSearch,
    LinkedProductItemConfig,
    FormSubmitButtons,
    ConfirmationDialog,
  },

  computed: {
    submitDisabled () {
      return false
    },

    isReordable () {
      return !!(this.editedItem && Array.isArray(this.editedItem) && this.editedItem.length > 1)
    },

    isEmptyList () {
      return this.editedItem && Array.isArray(this.editedItem) && this.editedItem.length == 0
    },
  },

  methods: {
    onProductSelected (val) {
      this.editedItem.push({id: val})
    },

    parseProvidedItems (items) {
      return items.map(e => ({ id: e.product.id, variationsSku: e.variationsSku }))
    },

    onReorder () {

    },

    removeItem (id) {
      let index = this.editedItem.findIndex(e => e.id == id)
      if(index >= 0){
        this.editedItem.splice(index, 1)
      }
    },

  },

  created () {
    this.$on('delete-item', this.removeItem)
  }
}
</script>
