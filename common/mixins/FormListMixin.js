// FormListMixin - provide basic properties for a list editing form

import { pipeEvents, jsonCopy, FormState, isNewForm, isEditForm } from '@common/utils'

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },

    formState: {
      type: String,
      default: FormState.NEW
    },

    loading: {
      type: Boolean,
      default: false,
    },

    error: {
      type: String,
      default: '',
    },

    confirmDelete: {
      type: Boolean,
      default: true,
    },

    singleDeleteMsg: {
      type: String,
      default: "Do you want to delete this item?"
    },

    multiDeleteMsg: {
      type: String,
      default: "Do you want to delete this items?"
    },
  },

  data: function () {
    return {
      editedItem: this.parseProvidedItems(this.items),

      selected: [],

      dialog: false,
      deletePayload: null,
      dialogMsg: '',
      options: {},
      search: '',
    }
  },

  computed: {
    modelState () {
      return {
        formState: this.formState,
        error: this.error,
        loading: this.loading,
      }
    },

    hasItems () {
      return this.editedItem && this.editedItem.length
    },

    itemsSelected () {
      return this.selected && this.selected.length
    },

    isNewForm () {
      return isNewForm(this.formState)
    },

    isEditForm () {
      return isEditForm(this.formState)
    },
  },

  methods: {
    createItem () {
      this.$emit('create-item', this.editedItem)
    },

    updateItem () {
      this.$emit('update-item', this.editedItem)
    },

    reloadItem () {
      this.$emit('reload-item')
    },

    newItem () {
      this.$emit('new-item')
    },

    cancel () {
      this.$emit('cancel')
    },

    reset () {
      this.editedItem = this.parseProvidedItems(this.items)
    },

    editItem (val) {
      this.$emit('edit-item', val)
    },

    deleteItem (val) {
      if(this.confirmDelete){
        this.dialogMsg = this.singleDeleteMsg
        this.deletePayload = { event: 'delete-item', value: val }
        this.dialog = true
      }else{
        this.$emit('delete-item', val)
      }
    },

    onDeleteItems () {
      if(this.selected) {
        this.$emit('delete-items', this.selected.map(e => e.id))
      }
    },

    onConfirm () {
      if(this.deletePayload) {
        this.$emit(this.deletePayload.event, this.deletePayload.value)
        this.deletePayload = null
      }
    },

    closeDialog () {
      this.dialog = false
    },

    pipeUp (...events) {
      return pipeEvents(this, ...events)
    },

    parseProvidedItems (items) {
      return jsonCopy(items)
    },
  },

  watch: {
    items: function (val) {
      this.editedItem = this.parseProvidedItems(val)
    },
  },
}
