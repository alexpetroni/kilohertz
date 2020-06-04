<script>
import BasePagListFormModel from '@common/models/BasePagListFormModel'
import PaginatedAttachments from '@common/graphql/attachment/PaginatedAttachments.gql'
import DeleteAttachment from '@common/graphql/attachment/DeleteAttachment.gql'
import DeleteAttachments from '@common/graphql/attachment/DeleteAttachments.gql'

export default {
  extends: BasePagListFormModel,

  methods: {
    async loadPage (queryVars, fetchPolicy = 'network-only') {
      try{
        let { data:{paginatedAttachments} } = await this.$apollo.query({
          query: PaginatedAttachments,
          variables: {args: queryVars},
          fetchPolicy,
        })
        return {
          items: paginatedAttachments.items,
          total: paginatedAttachments.total,
        }
      } catch (error) {
        throw new Error(error)
      }
    },

    async deleteItem (id) {
      try {
        await this.$apollo.mutate({
          mutation: DeleteAttachment,
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
          mutation: DeleteAttachments,
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
