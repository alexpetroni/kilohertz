<script>
import { deleteObjFields } from '@common/utils'
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import ProductCategories from '@common/graphql/product/ProductCategories.gql'
import UpdateProductCategories from '@common/graphql/product/UpdateProductCategories.gql'

export default {
  extends: BaseItemFormModel,

  methods: {
    getDefaultItem () {
      return []
    },

    async loadItem (key) {
      let variables = {field: 'id', value: key.id}
      let { data: { productCategories } } = await this.$apollo.query({
        query: ProductCategories,
        variables,
      })
      return productCategories
    },

    async updateItem (idArr, key) {
      let variables = {id: key.id, idArr: idArr}
      let { data: { updateProductCategories } } = await this.$apollo.mutate({
        mutation: UpdateProductCategories,
        variables,
      })
      return updateProductCategories
    },

    parseItemForInput (item) {
      return deleteObjFields(item, ['__typename'])
    },

    parseLoadResult (result) {
      return this.parseIds(result)
    },

    parseUpdateResult (result) {
      return this.parseIds(result)
    },

    parseIds (result) {
      return result ? result.map(e => e.id ) : []
    },

  },
}
</script>
