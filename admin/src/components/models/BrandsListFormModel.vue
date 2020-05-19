<script>
import BasePagListFormModel from '@common/models/BasePagListFormModel'
import PaginatedBrands from '@common/graphql/brand/PaginatedBrands.gql'
import DeleteBrand from '@common/graphql/brand/DeleteBrand.gql'
import DeleteBrands from '@common/graphql/brand/DeleteBrands.gql'

export default {
  extends: BasePagListFormModel,

  data () {
    return {
    }
  },

  methods: {
    async loadPage (queryVars, fetchPolicy = 'network-only') {
      try{
        let { data:{paginatedBrands} } = await this.$apollo.query({
          query: PaginatedBrands,
          variables: {args: queryVars},
          fetchPolicy,
        })
        return {
          items: paginatedBrands.items,
          total: paginatedBrands.total,
        }
      } catch (error) {
        throw new Error(error)
      }
    },

    async deleteItem (id) {
      try {
        await this.$apollo.mutate({
          mutation: DeleteBrand,
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
          mutation: DeleteBrands,
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
