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
          addNewTitle="Add New Family"
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
            xs="12"
            sm="6"
            >
              <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
            </v-col>

            <!-- Family components form -->
            <template v-if="isEditForm">

            <v-col
            sm="12"
            >
            <v-card
            flat
            >
              <v-toolbar flat>
                <v-toolbar-title>{{ item.name }} Members</v-toolbar-title>
              </v-toolbar>

              <v-row justify="center">
              <v-col xs="12" sm="6">
              <ProductSearch
                @selected="onAddProduct"
                class="pb-6"
              />
            </v-col>
          </v-row>

              <v-list v-if="hasItems">
                <draggable v-model="editedItem.products" handle=".handle" @change="onReorder">
                <v-list-item
                  v-for="id in editedItem.products"
                  :key="id"
                >
                  <ProductFamilyItemForm
                  :id="id"
                  @delete-item="onDeleteItem(id)"
                  :reordable="reordable"
                  class="mt-1 mb-1"
                  />
                </v-list-item>
                </draggable>
              </v-list>

                <div
                v-else
                class="text-center pa-6"
                >
                No features yet.
              </div>
            </v-card>
            </v-col>

            </template>

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

          <ConfirmationDialog
            v-model="deleteItemDialog"
            message="Do you want to delete this feature?"
            @confirm="onDeleteItemConfirm"
            @cancel="resetDeleteItemDialog"
          />
    </base-material-card>
</v-container>
</template>

<script>
import draggable from 'vuedraggable'
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormTopBar from '@common/components/FormTopBar'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import ProductSearch from '@/components/selectors/ProductSearch'
import ProductFamilyItemForm from '@/components/forms/mini/ProductFamilyItemForm'
import ConfirmationDialog from '@common/components/ConfirmationDialog'

export default {
  mixins: [ FormItemMixin ],

  components: {
    draggable,
    FormTopBar,
    FormSubmitButtons,
    // EditBtn,
    // DeleteBtn,
    ProductSearch,
    ProductFamilyItemForm,
    ConfirmationDialog,
  },

  data () {
    return {
      deleteItemDialog: false,
      deleteItemId: null,
    }
  },

  computed: {
    submitDisabled () {
      return !this.editedItem.name.trim()
    },

    hasItems () {
      return this.editedItem.products && this.editedItem.products.length
    },

    reordable () {
      return this.editedItem.products.length > 1
    }
  },

  methods: {
    onAddProduct (val) {
      const index = this.editedItem.products.indexOf(val)
      if(index >= 0) {
        this.editedItem.products.splice(index, 1)
      }
      this.editedItem.products.push(val)
    },

    onReorder () {
      // console.log("this.editedItem %o", this.editedItem.products)
      this.$emit('reorder-list', this.editedItem)
    },

    onDeleteItem (id) {
      this.deleteItemId = id
      this.deleteItemDialog = true
    },

    onDeleteItemConfirm () {
      const index = this.editedItem.products.indexOf(this.deleteItemId)
      if(index >=0){
        this.editedItem.products.splice(index, 1)
      }
    },

    resetDeleteItemDialog () {
      this.deleteItemId = null
    },
  },
}
</script>
