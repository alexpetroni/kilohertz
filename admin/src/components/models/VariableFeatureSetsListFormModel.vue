<script>
import BasePagListFormModel from '@common/models/BasePagListFormModel'
import PaginatedVariableFeatureSets from '@common/graphql/variable-feature/PaginatedVariableFeatureSets.gql'
import DeleteVariableFeatureSet from '@common/graphql/variable-feature/DeleteVariableFeatureSet.gql'
import DeleteVariableFeatureSets from '@common/graphql/variable-feature/DeleteVariableFeatureSets.gql'

export default {
  extends: BasePagListFormModel,

  methods: {
    async loadPage (queryVars, fetchPolicy = 'network-only') {
      try{
        let { data:{paginatedVariableFeatureSets} } = await this.$apollo.query({
          query: PaginatedVariableFeatureSets,
          variables: {args: queryVars},
          fetchPolicy,
        })
        return {
          items: paginatedVariableFeatureSets.items,
          total: paginatedVariableFeatureSets.total,
        }
      } catch (error) {
        throw new Error(error)
      }
    },

    async deleteItem (id) {
      try {
        await this.$apollo.mutate({
          mutation: DeleteVariableFeatureSet,
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
          mutation: DeleteVariableFeatureSets,
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
