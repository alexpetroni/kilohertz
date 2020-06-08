<script>
import BasePagListFormModel from '@common/models/BasePagListFormModel'
import PaginatedProducts from '@common/graphql/product/PaginatedProducts.gql'

export default {
  extends: BasePagListFormModel,

  methods: {
    getDefaultItem () {
      return []
    },

    async loadPage (queryVars, fetchPolicy = 'network-only') {
      try{
        let { data:{paginatedProducts} } = await this.$apollo.query({
          query: PaginatedProducts,
          variables: {args: queryVars},
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
