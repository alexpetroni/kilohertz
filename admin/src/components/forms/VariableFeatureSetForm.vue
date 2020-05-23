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
          addNewTitle="Add New Variable Feature"
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
              <v-select
              v-model="editedItem.type"
              :disabled="isEditForm"
              :items="vfTypes"
              label="Type" >
              </v-select>
            </v-col>

            <v-col
            cols="12"
            xs="12"
            sm="6"
            >
              <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
            </v-col>

            <!-- VF Items form -->
            <template v-if="isEditForm">

            <v-col
            sm="12"
            >
            <v-card
            flat
            >
              <v-toolbar flat>
                <v-toolbar-title>{{ item.name }} Features</v-toolbar-title>
              </v-toolbar>

              <VariableFeatureItemForm
                :type="editedItem.type"
                :item="editedVFItem"
                :formState="VFItemState"
                @create-item="onAddItem"
                @cancel="setNewVFItem"
                ref="vfEditor"
              />



              <v-list v-if="hasItems">
                <draggable v-model="editedItem.items" handle=".handle" @change="onReorder">
                <v-list-item
                  v-for="(item, index) in editedItem.items"
                  :key="item.name"
                >

                  <v-list-item-icon>
                    <v-btn
                      v-if="isReordable"
                      title="Drag to reorder"
                      icon
                      class="handle"
                    >
                      <v-icon>mdi-drag-vertical</v-icon>
                    </v-btn>

                    <template v-if="isColorType">
                    <v-avatar size="28" :color="item.value" class="vfColor mt-2"></v-avatar>
                    </template>
                  </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>

                  <v-list-item-action>
                    <div>
                    <EditBtn @click="editVfItem(index)"/>
                    <DeleteBtn @click="deleteVfItem(index)"/>
                  </div>
                  </v-list-item-action>

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
import VariableFeatureItemForm from '@/components/forms/mini/VariableFeatureItemForm'
import { FormState, isVfColorType } from '@common/utils'
import EditBtn from '@common/components/btn/EditBtn'
import DeleteBtn from '@common/components/btn/DeleteBtn'
import ConfirmationDialog from '@common/components/ConfirmationDialog'

export default {
  mixins: [ FormItemMixin ],

  components: {
    draggable,
    FormTopBar,
    FormSubmitButtons,
    EditBtn,
    DeleteBtn,
    VariableFeatureItemForm,
    ConfirmationDialog,
  },

  data () {
    return {
      editedVFItemIndex: -1,
      editedVFItem: this.getDefaultVFItem(),
      VFItemState: FormState.NEW,

      deleteItemDialog: false,
      deleteItemIndex: null,

      vfTypes: [
        {text: "Text", value: "TEXT"},
        {text: "Color", value: "COLOR_HEX"},
        {text: "SVG", value: "SVG"},
      ],

      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 3 || 'Min 3 characters',
      },
    }
  },

  computed: {
    submitDisabled () {
      return !this.editedItem.name.trim() || !this.editedItem.type
    },

    hasItems () {
      return this.editedItem.items && this.editedItem.items.length
    },

    isColorType () {
      return isVfColorType(this.editedItem.type)
    },

    isReordable () {
      return this.editedItem.items.length > 1
    }
  },

  methods: {

    onAddItem (val) {
      val.name = val.name.trim()
      if(!val.name) return
      if(this.editedItem.items.find(e => e.name.toLowerCase() == val.name.toLowerCase())) {
        return alert("A feature with this name already exists.")
      }
      this.editedItem.items.push(val)
      this.setNewVFItem()
    },

    getDefaultVFItem () {
      return {
      name: '',
      slug: '',
      value: '#FFFFFF',
      description: '',
      }
    },

    setNewVFItem () {
      this.editedVFItemIndex = -1
      this.editedVFItem = this.getDefaultVFItem()
      this.VFItemState = FormState.NEW
    },

    onReorder () {
      this.$emit('reorder-list', this.editedItem)
    },

    editVfItem (index) {
      if(!this.hasItems || !this.editedItem.items[index]) return
      this.editedVFItemIndex = index
      this.editedVFItem = this.editedItem.items[index]
      this.VFItemState = FormState.EDIT
      this.$vuetify.goTo(this.$refs.vfEditor)
    },

    deleteVfItem (index) {
      if(!this.hasItems || !this.editedItem.items[index]) return
      this.deleteItemIndex = index
      this.deleteItemDialog = true
    },

    onDeleteItemConfirm () {
      this.editedItem.items.splice(this.deleteItemIndex, 1)
    },

    resetDeleteItemDialog () {
      this.deleteItemIndex = null
    },
  },
}
</script>
<style lang="scss" scoped>
.vfColor {
  border: solid 1px;
  border-color: #757575 !important
}
</style>
