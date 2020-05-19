// FormPagListMixin - provide basic properties for a paginated list editing form
// import { jsonCopy, FormState } from '@common/utils'

import { throttle } from 'lodash-es'
import { pipeEvents } from '@common/utils'

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },

    tableOptions: {
      type: Object,
      default: () => {}
    },

    totalItems: {
      type: Number,
      default: 0,
    },

    tableEvents: {
      type: Object,
      default: () => {}
    },

    search: {
      type: String,
      default: '',
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

  data () {
    return {
      selected: [],

      dialog: false,
      deletePayload: null,
      dialogMsg: '',
    }
  },

  computed: {
    hasItems () {
      return this.items && this.items.length
    },

    itemsSelected () {
      return this.selected && this.selected.length
    },

    options: {
      get: function () {
        return this.tableOptions
      },

      set: function (val) {
        this.$emit('update:tableOptions', val)
      }
    },

    searchTerm: {
      get: function () {
        return this.search
      },

      set: throttle(function (val) {
        this.$emit('update:search', val)
      }, process.env.VUE_APP_SEARCH_THROTTLE)
    }
  },

  methods: {
    addNew () {
      this.$emit('new-item')
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
  },
}
