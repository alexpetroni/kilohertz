<script>
import BasePagListFormModel from '@common/models/BasePagListFormModel'
import PaginatedProducts from '@common/graphql/product/PaginatedProducts.gql'
import DeleteProduct from '@common/graphql/product/DeleteProduct.gql'
import DeleteProducts from '@common/graphql/product/DeleteProducts.gql'

export default {
  extends: BasePagListFormModel,

  data () {
    return {
    }
  },

  methods: {
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

    async deleteItem (id) {
      try {
        await this.$apollo.mutate({
          mutation: DeleteProduct,
          variables: { id }
        })
        return id
      } catch (error) {
        throw new Error(error)
      }
    },

    async deleteItems (idArr) {
      try {
        await this.$apollo.mutate({
          mutation: DeleteProducts,
          variables: { idArr }
        })
        return idArr
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}
</script>
