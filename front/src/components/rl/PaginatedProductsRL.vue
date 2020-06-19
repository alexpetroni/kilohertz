<script>
import BasePagListFormModel from '@common/models/BasePagListFormModel'
import PaginatedProducts from '@common/graphql/product/PaginatedProducts.gql'

export default {
  extends: BasePagListFormModel,

  props: {
    category: {
      type: String,
    },
  },

  methods: {
    getDefaultItem () {
      return []
    },

    async loadPage (queryVars, fetchPolicy = 'network-only') {
      const args = this.category ? Object.assign({}, queryVars, { category: this.category }) : queryVars
      try{
        let { data:{paginatedProducts} } = await this.$apollo.query({
          query: PaginatedProducts,
          variables: { args },
          fetchPolicy,
        })
        return {
          items: paginatedProducts.items,
          total: paginatedProducts.total,
        }
      } catch (error) {
        throw new Error(error)
      }
    },

  },
}
</script>
