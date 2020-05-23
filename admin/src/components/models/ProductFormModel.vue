<script>
import { deleteObjFields } from '@common/utils'
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import Product from '@common/graphql/product/Product.gql'
import CreateProduct from '@common/graphql/product/CreateProduct.gql'
import UpdateProduct from '@common/graphql/product/UpdateProduct.gql'
import DeleteProduct from '@common/graphql/product/DeleteProduct.gql'

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
        logo: '',
      }
    },

    async createItem (item, key) {
      let { data: { createProduct } } = await this.$apollo.mutate({
        mutation: CreateProduct,
        variables: {input:item, ...key},
      })
      return createProduct
    },

    async loadItem (key) {
      let { data: { product } } = await this.$apollo.query({
        query: Product,
        variables: key,
      })
      return product
    },

    async updateItem (item, key) {
      let input = this.parseItemForInput(item)
      let { data: { updateProduct } } = await this.$apollo.mutate({
        mutation: UpdateProduct,
        variables: {...key, input },
      })
      return updateProduct
    },

    async deleteItem (key) {
      let { data: { deleteProduct } } = await this.$apollo.mutate({
        mutation: DeleteProduct,
        variables: key,
      })
      return deleteProduct
    },

    parseItemForInput (item) {
      return deleteObjFields(item, ['__typename'])
    },

  },
}
</script>
