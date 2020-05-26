<template>
      <v-card flat>

        <v-container
        fluid
        grid-list-xl
        >
          <v-row>

      <v-col sm="12">
        <VariableFeatureSelect
        @item-selected="onAddVariableFeature"
        />
      </v-col>

      <v-col cols="12" sm="12">
        <draggable v-model="editedItem" handle=".handle" @change="onReorder">

        <VariableFeatureItemsSelector
        v-for="vf in editedItem"
        :key="vf.slug"
        v-model="vf.items"
        :vfSlug="vf.slug"
        @delete="removeVFSet"
        :isReordable="isReordable"
        />
        </draggable>
      </v-col>

      <v-col cols="12" class="text-center">
        <FormSubmitButtons
        :formState="formState"
        @update-item="updateItem"
        @create-item="createItem"
        :disabled="submitDisabled"
        />
      </v-col>
      </v-row>

    </v-container>

    <ConfirmationDialog
    v-model="dialog"
    :message="dialogMessage"
    @confirm="onDeleteConfirmed"
    @cancel="onDeleteCancel"
    />
  </v-card>
</template>

<script>
import draggable from 'vuedraggable'
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import VariableFeatureSelect from '@/components/forms/mini/VariableFeatureSelect'
import VariableFeatureItemsSelector from '@/components/forms/mini/VariableFeatureItemsSelector'
import ConfirmationDialog from '@common/components/ConfirmationDialog'

export default {
  mixins: [ FormItemMixin ],

  components: {
    draggable,
    FormSubmitButtons,
    VariableFeatureSelect,
    VariableFeatureItemsSelector,
    ConfirmationDialog,
  },

  data () {
    return {
      dialog: false,
      dialogMessage: '',
      vfSlugToDelete: null,
    }
  },

  computed: {
    isReordable () {
      return this.editedItem.length > 1
    },

    submitDisabled () {
      return !this.editedItem.every(e => e.items.length > 0)
    },
  },

  methods: {
    onAddVariableFeature (val) {
      if(this.editedItem.find(e => e.slug == val.slug)){
          alert(`${val.name} already exists in list.`)
          return
      }
      let vfConfig = { slug: val.slug, items: val.items.map(e => e.slug) }
      this.editedItem.push(vfConfig)
    },

    removeVFSet (vfSet) {
      this.vfSlugToDelete = vfSet.slug
      this.dialogMessage = `Do you want to remove on this product the "${vfSet.name}" variable feature ?`
      this.dialog = true
    },

    onDeleteConfirmed () {
      const index = this.editedItem.findIndex(e => e.slug == this.vfSlugToDelete)
      if(index == -1) return
      this.editedItem.splice(index, 1)
      this.clearDialog()
    },

    onDeleteCancel () {
      this.clearDialog()
    },

    clearDialog () {
      this.vfSlugToDelete = null
      this.dialogMessage = ''
    },

    onReorder () {
      this.$emit('reorder-list', this.editedItem)
    },

    // updateItem () {
    //   this.$emit('update-item', {variableFeatures: this.editedItem })
    //     console.log("UPDATE editedItem %o", this.editedItem)
    // },
  },
}
</script>
