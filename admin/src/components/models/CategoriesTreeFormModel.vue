<script>
import { deleteObjFields } from '@common/utils'
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import Categories from '@common/graphql/category/Categories.gql'
import CreateCategory from '@common/graphql/category/CreateCategory.gql'
import UpdateCategories from '@common/graphql/category/UpdateCategories.gql'
import DeleteCategory from '@common/graphql/category/DeleteCategory.gql'

export default {
  extends: BaseItemFormModel,

  methods: {
    getDefaultItem () {
      return []
    },

    async createItem (item, key) {
      let { data: { createCategory } } = await this.$apollo.mutate({
        mutation: CreateCategory,
        variables: {input:item, ...key},
      })
      return createCategory
    },

    async loadItem (key, fetchPolicy = 'network-only') {
      let { data: { categories } } = await this.$apollo.query({
        query: Categories,
        variables: key,
        fetchPolicy
      })
      return categories
    },

    async updateItem (item) {
      let input = this.parseItemForInput(item)
      let { data: { updateCategories } } = await this.$apollo.mutate({
        mutation: UpdateCategories,
        variables: { inputArr: input },
      })
      return updateCategories
    },

    async deleteItem (key) {
      let { data: { deleteCategory } } = await this.$apollo.mutate({
        mutation: DeleteCategory,
        variables: key,
      })
      return deleteCategory
    },

    parseItemForInput (item) {
      return deleteObjFields(item, ['__typename', 'createdAt', 'updatedAt'])
    },

  },
}
</script>
