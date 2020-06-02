<script>
import { deleteObjFields } from '@common/utils'
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import CategoryMeta from '@common/graphql/category-meta/CategoryMeta.gql'
import CreateCategoryMeta from '@common/graphql/category-meta/CreateCategoryMeta.gql'
import UpdateCategoryMeta from '@common/graphql/category-meta/UpdateCategoryMeta.gql'
import DeleteCategoryMeta from '@common/graphql/category-meta/DeleteCategoryMeta.gql'

export default {
  extends: BaseItemFormModel,

  data () {
    return {
    }
  },

  methods: {
    getDefaultItem () {
      return {
        category: {
          id: '',
          name: '',
        },
        title: '',
        description: '',
        highlights: [],
        previewFields: this.getNewPreviewFields(),
      }
    },

    getNewPreviewFields () {
      let arr = []
      for(let i = 0; i < 3; i++){
          arr.push({title: '', content: '', image: null})
      }
      return arr
    },

    async createItem (item, key) {
      let { data: { createCategoryMeta } } = await this.$apollo.mutate({
        mutation: CreateCategoryMeta,
        variables: {input:item, ...key},
      })
      return createCategoryMeta
    },

    async loadItem (key) {
      let { data: { categoryMeta } } = await this.$apollo.query({
        query: CategoryMeta,
        variables: key,
      })
      return categoryMeta
    },

    async updateItem (item, key) {
      let input = this.parseItemForInput(item)
      console.log('input %o key %o', input, key)
      let { data: { updateCategoryMeta } } = await this.$apollo.mutate({
        mutation: UpdateCategoryMeta,
        variables: {...key, input },
      })
      return updateCategoryMeta
    },

    async deleteItem (key) {
      let { data: { deleteCategoryMeta } } = await this.$apollo.mutate({
        mutation: DeleteCategoryMeta,
        variables: key,
      })
      return deleteCategoryMeta
    },

    parseItemForInput (item) {
      let input =  deleteObjFields(item, ['__typename'])
      delete input.category
      return input
    },

  },
}
</script>
