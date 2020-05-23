<script>
import { deleteObjFields } from '@common/utils'
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import Category from '@common/graphql/category/Category.gql'
import CreateCategory from '@common/graphql/category/CreateCategory.gql'
import UpdateCategory from '@common/graphql/category/UpdateCategory.gql'
import DeleteCategory from '@common/graphql/category/DeleteCategory.gql'

export default {
  extends: BaseItemFormModel,

  data () {
    return {
    }
  },

  methods: {
    getDefaultItem () {
      return {
        name: '',
        slug: '',
        description: '',
        order: 0,
        parent: null,
        ancestors: [],
        image: ''
      }
    },

    async createItem (item, key) {
      let { data: { createCategory } } = await this.$apollo.mutate({
        mutation: CreateCategory,
        variables: {input:item, ...key},
      })
      return createCategory
    },

    async loadItem (key) {
      let { data: { category } } = await this.$apollo.query({
        query: Category,
        variables: key,
      })
      return category
    },

    async updateItem (item, key) {
      let input = this.parseItemForInput(item)
      let { data: { updateCategory } } = await this.$apollo.mutate({
        mutation: UpdateCategory,
        variables: {...key, input },
      })
      return updateCategory
    },

    async deleteItem (key) {
      let { data: { deleteCategory } } = await this.$apollo.mutate({
        mutation: DeleteCategory,
        variables: key,
      })
      return deleteCategory
    },

    parseItemForInput (item) {
      return deleteObjFields(item, ['__typename'])
    },

  },
}
</script>
