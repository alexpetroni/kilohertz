/* TableEditorMixin -  */
import ErrorMixin from '@common/mixins/ErrorMixin'
import DateFilterMixin from '@common/mixins/DateFilterMixin'

const mix = {
  mixins: [ DateFilterMixin, ErrorMixin ],

  data: function () {
    return {
      search: null,
      selectedItems: [],

      rowsPerPage: [12, 24, 36, 72, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ],

      isLoading: false,

      pagination: {
        page: 1,
        rowsPerPage: 24,
        sortBy: 'updatedAt',
        descending: true
      },

      tableData: {
        items: [],
        total: 0,
      }
    }
  },

  computed: {
    skipTableQuery () {
      return false
    }
  },

  apollo: {
    tableData: {
      query () {
        return this.tableDataQuery()
      },

      variables () {
        return this.getQueryVariables()
      },

      update (data) {
        return this.onUpdateTableData(data)
      },

      skip() {
        return this.skipTableQuery
      },

      error (e) {
        this.setErrMsg(e.message)
      },

      throttle: 300
    }
  },

  methods: {
    // return specific gql query object to populate the table
    tableDataQuery () {
      throw new Error("Method tableDataQuery should be overwriten in component")
    },

    getQueryVariables () {
      return this.getTableQueryParams()
    },

    getTableQueryParams () {
      const {rowsPerPage, page, sortBy:orderBy } = this.pagination
      const order = this.pagination.descending ? "DESC" : "ASC"
      const params = {rowsPerPage, page, orderBy, order}
      if(this.search) params.search = this.search
      return {args: params}
    },

    refetchQuery () {
      this.$apollo.queries.tableData.refetch()
    },

    onUpdateTableData (data) {
      if(!Object.keys(data).length){
        return {items: [], total: 0}
      }

      return this.parseTableDateResult(data)
    },

    parseTableDateResult (result) {
      let fName = Object.keys(result)[0]
      return result[fName]
    },

    showTableFirstPage (orderByUpdateDesc = true) {
      this.$apollo.queries.tableData.skip = true
      if(orderByUpdateDesc){
        this.pagination.sortBy = 'updatedAt'
        this.pagination.descending = true
      }
      this.$apollo.queries.tableData.skip = false
      this.pagination.page = 1
      this.$apollo.queries.tableData.refetch()
    },

    shortenedText (val, maxLength = 45) {
      if(val && typeof val === 'string' && val.length > maxLength){
        return val.substring(0, maxLength)+'...'
      }
      return val
    }
  },

}

export default mix
