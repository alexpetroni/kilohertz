<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import ProductAttachmentsSet from '@common/graphql/product-attachments-set/ProductAttachmentsSet.gql'
import UpdateProductAttachmentsSet from '@common/graphql/product-attachments-set/UpdateProductAttachmentsSet.gql'

export default {
  extends: BaseItemFormModel,

  props: {
    productId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },

  methods: {
    itemKey () {
      return {
        field: 'id',
        value: this.productId,
        name: this.name,
      }
    },

    getDefaultItem () {
      return {
        product: this.productId,
        name: this.name,
        attachments: [],
      }
    },

    async loadItem (key) {
      let { data: { productAttachmentsSet } } = await this.$apollo.query({
        query: ProductAttachmentsSet,
        variables: key,
      })
      
      return productAttachmentsSet
    },

    async updateItem (item, key) {
      let input = this.parseItemForInput(item)
      console.log('input %o', input)
      let { data: { updateProductAttachmentsSet } } = await this.$apollo.mutate({
        mutation: UpdateProductAttachmentsSet,
        variables: {...key, input },
      })
      return updateProductAttachmentsSet
    },

    parseItemForInput (item) {
      let { product, name, attachments } = item
      if(attachments && attachments.length) {
        attachments = attachments.map(e => {
          let {title, path, type } = e
          return {title, path, type}
        })
      }
      return { product, name, attachments }
    },

  },
}
</script>
