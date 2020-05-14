// FormMixin
import { jsonCopy, FormState } from '@common/utils'

export default {
  props: {
    item: {
      type: [Object, Array],
      required: true,
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
    }
  },

  data: function () {
    return {
      editedItem: jsonCopy(this.item)
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

    formEvents () {
      return  {
        'create-item': this.createItem,
        'update-item': this.updateItem,
        'delete-item': this.deleteItem,
        'reload-item': this.reloadItem,
        'new-item': this.newItem,
        'cancel': this.cancel,
      }
    }
  },

  methods: {
    createItem () {
      this.$emit('create-item', this.editedItem)
    },

    updateItem () {
      console.log('updateItem %o', this.editedItem)
      this.$emit('update-item', this.editedItem)
    },

    deleteItem () {
      console.log('emit deleteItem')
      this.$emit('delete-item')
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
  },

  watch: {
    item: function (val) {
        this.editedItem = jsonCopy(val)
    },
  }
}
