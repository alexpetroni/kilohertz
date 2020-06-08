<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'
import CategoryWithMeta from '@common/graphql/category/CategoryWithMeta.gql'

export default {
  extends: BaseItemFormModel,

  methods: {
    getDefaultItem () {
      return {
        category: {
          id: '',
          name: '',
          slug: '',
          description: '',
          order: '',
          parent: '',
          ancestors: [],
          image: '',
        },

        categoryMeta: {
          title: '',
          description: '',
          highlights: [],
          previewFields: [],
        }
      }
    },

    async loadItem (key, fetchPolicy) {
      let { data: { category, categoryMeta } } = await this.$apollo.query({
        query: CategoryWithMeta,
        variables: key,
        fetchPolicy
      })
      return { category, categoryMeta }
    },

    parseLoadedData (result) {
      return result
    }

  },
}
</script>
