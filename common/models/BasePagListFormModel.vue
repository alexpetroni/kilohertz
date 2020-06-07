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
      type: [String, Array],
      default: () => []
    },

    sortDesc: {
      type: [Boolean, Array],
      default: () => [],
    },

    groupBy: {
      type: [String, Array],
      default: '',
    },

    groupDesc: {
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

      search: '',

      totalItems: 25,
      loading: false,
    }
  },

  computed: {
    tableEvents () {
      return {
        'update:tableOptions': this.onUpdateTableOptions,
        'update:page': this.onUpdatePage,
        'update:items-per-page': this.onUpdateItemsPerPage,
        'update:sort-by': this.onUpdateSortBy,
        'update:search': this.onUpdateSearch,

        'delete-item': this.onDeleteItem,
        'delete-items': this.onDeleteItems,

        'reload': this.reloadPage,
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
      this.tableOptions = Object.assign({}, this.tableOptions, obj)
    },

    onUpdateTableOptions (val) {
      this.tableOptions = val
    },

    onUpdatePage (val) {
      this.updateQueryVars({page: val})
    },

    onUpdateItemsPerPage (val) {
      this.tableOptions = Object.assign({}, this.tableOptions, {itemsPerPage: val})
    },

    onUpdateSearch (val) {
      this.search = val
      this.loadItemsForCurrentPage()
    },

    onUpdateSortBy (val) {
      this.tableOptions = Object.assign({}, this.tableOptions, {sortBy: val})
    },

    async onDeleteItem (id) {
      try {
        this.loading = true
        this.clearError()
        await this.deleteItem(id)
        this.reloadPage()
      } catch (error) {
        this.loading = false
        this.itemError (error.message)
      }
    },

    async onDeleteItems (idArr) {
      try {
        this.loading = true
        this.clearError()
        await this.deleteItems(idArr)
        this.reloadPage()
      } catch (error) {
        this.loading = false
        this.itemError (error.message)
      }
    },

    async loadItemsForCurrentPage (fetchPolicy) {
      try {
        this.loading = true
        this.clearError()
        const { items, total } = await this.loadPage(this.pageQueryVariables(), fetchPolicy)
        if(total && Array.isArray(items) && !items.length) { // is a page out of range was specified, find the last page
          const lastPage = Math.ceil(total/this.tableOptions.itemsPerPage)
          return this.updateQueryVars({page: lastPage})
        }
        this.totalItems = total
        this.items = items

      } catch (error) {
        this.itemError (error.message)
      } finally {
        this.loading = false
      }
    },

    async loadPage (queryVars, fetchPolicy) {
      throw new Error("loadPage() should be overwritten in child component.", queryVars, fetchPolicy)
    },

    async deleteItem (id) {
      // console.log('deleteItem  %s', id )
      throw new Error("deleteItem() should be overwritten in child component.", id)
    },

    async deleteItems (idArr) {
      // console.log('deleteItems  %o', idArr )
      throw new Error("deleteItems() should be overwritten in child component.", idArr)
    },


    reloadPage () {
      this.loadItemsForCurrentPage('network-only')
    },

    itemError (msg) {
      this.setError(msg)
      this.$emit('error', msg)
    },

    // hook for page query options
    pageQueryVariables () {
      let { page, itemsPerPage, sortBy, sortDesc} = this.tableOptions
      return { page, itemsPerPage, sortBy, sortDesc, search: this.search }
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
        tableEvents: this.tableEvents,
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
