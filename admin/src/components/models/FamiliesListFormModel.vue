<script>
import BasePagListFormModel from '@common/models/BasePagListFormModel'
import PaginatedFamilies from '@common/graphql/family/PaginatedFamilies.gql'
import DeleteFamily from '@common/graphql/family/DeleteFamily.gql'
import DeleteFamilies from '@common/graphql/family/DeleteFamilies.gql'

export default {
  extends: BasePagListFormModel,

  data () {
    return {
    }
  },

  methods: {
    async loadPage (queryVars, fetchPolicy = 'network-only') {
      try{
        let { data:{paginatedFamilies} } = await this.$apollo.query({
          query: PaginatedFamilies,
          variables: {args: queryVars},
          fetchPolicy,
        })
        return {
          items: paginatedFamilies.items,
          total: paginatedFamilies.total,
        }
      } catch (error) {
        throw new Error(error)
      }
    },

    async deleteItem (id) {
      try {
        await this.$apollo.mutate({
          mutation: DeleteFamily,
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
          mutation: DeleteFamilies,
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
