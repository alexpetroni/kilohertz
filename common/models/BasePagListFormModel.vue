<script>
import FormStateMixin from '@common/mixins/FormStateMixin'
import ErrorMixin from '@common/mixins/ErrorMixin'

export default {
  mixins: [FormStateMixin, ErrorMixin],

  props: {
    page: {
      type: [String, Number],
      default: 1,
    },

    itemsPerPage: {
      type: [String, Number],
      default: 10,
    },

    sortBy: {
      type: String,
      default: '',
    },

    sortDesc: {
      type: Boolean,
      default: false,
    },

    groupBy: {
      type: [String, Array],
      default: '',
    },

    groupDesc: {
      type: Boolean,
      default: false,
    },

    multiSort: {
      type: Boolean,
      default: false,
    },

    mustSort: {
      type: Boolean,
      default: false,
    },
  },


  data () {
    return {
      tableOptions: {
        page: this.page,
        itemsPerPage: this.itemsPerPage,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc,
        groupBy: this.groupBy,
        groupDesc: this.groupDesc,
        multiSort: this.multiSort,
        mustSort: this.mustSort,
      },

      totalItems: 25,
      loading: false,
    }
  },

  computed: {
    formEvents () {
      return {
        // 'update:options': this.onUpdateOptions,
        'update:page': this.onUpdatePage,
        'update:items-per-page': this.onUpdateItemsPerPage,
        'update:sort-by': this.onUpdateSortBy,

        // 'delete-item': this.onDeleteItem,
        // 'reload-item': this.onReloadItem,
        // 'new-item': this.onNewItem,
      }
    },

    modelState () {
      return {
        error: this.error,
        loading: this.loading,
      }
    },
  },

  watch: {
    tableOptions: {
      handler () {
        this.loadItemsForCurrentPage()
      },
      immediate: true,
    },
  },

  methods: {
    updateQueryVars (obj) {
      this.tableOptions = Object.assing({}, this.tableOptions, obj)
    },

    onUpdatePage (val) {
      this.updateQueryVars({page: val})
    },

    onUpdateItemsPerPage (val) {
      this.tableOptions = Object.assign({}, this.tableOptions, {itemsPerPage: val})
      console.log('onUpdateItemsPerPage %o', val)
    },

    onUpdateSortBy (val) {
      console.log('onUpdateSortBy %o', val)
    },

    async loadItemsForCurrentPage (fetchPolicy) {
      try {

        this.loading = true
        const { items, total } = await this.loadPage(this.pageQueryVariables(), fetchPolicy)
        if(total && Array.isArray(items) && !items.length) { // is a page out of range was specified, find the last page
          const lastPage = Math.ceil(total/this.tableOptions.itemsPerPage)
          return this.updateQueryVars({page: lastPage})
        }
        this.totalItems = total
        this.items = items
        this.loading = false
      }catch(error) {
        this.itemError (error.message)
      }
    },

    async loadPage (queryVars, fetchPolicy) {
      console.log('queryVars %o fetchPolicy %s', queryVars, fetchPolicy )
      throw new Error("loadPage() should be overwritten in child component.")
    },

    reloadPage () {
      this.loadPage(this.pageQueryVariables(), 'network-only')
    },

    itemError (msg) {
      this.setError(msg)
      this.$emit('error', msg)
    },

    // hook for page query options
    pageQueryVariables () {
      return this.tableOptions
    },

    // hook for adding aditional slot params
    extraSlotParams () {
      return {}
    },

    slotParams () {
      const params = {
        items: this.items,
        tableOptions: this.tableOptions,
        totalItems: this.totalItems,
        formEvents: this.formEvents,
        modelState: this.modelState,
      }
      const extraParams = this.extraSlotParams()
      return Object.assign({}, params, extraParams)
    },
  },

  render() {
      return this.$scopedSlots.default(this.slotParams())
  },
}
</script>
