<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'
import CategoriesWithMeta from '@common/graphql/category/CategoriesWithMeta.gql'

export default {
  extends: BaseItemFormModel,

  methods: {
    getDefaultItem () {
      return []
    },

    async loadItem (key, fetchPolicy) {
      let { data: { categoriesWithMeta } } = await this.$apollo.query({
        query: CategoriesWithMeta,
        variables: key,
        fetchPolicy
      })
      return categoriesWithMeta
    },

  },
}
</script>
