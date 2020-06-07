<script>
// import { deleteObjFields } from '@common/utils'
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import LinkedProducts from '@common/graphql/linked-products/LinkedProducts.gql'
import UpdateLinkedProducts from '@common/graphql/linked-products/UpdateLinkedProducts.gql'

export default {
  extends: BaseItemFormModel,

  props: {
    linkType: {
      type: String,
      required: true
    },
  },

  methods: {
    getDefaultItem () {
      return []
    },

    async loadItem (key) {
      let variables = {field: 'id', value: key.id, linkType: this.linkType, allVariations: true}
      let { data: { linkedProducts } } = await this.$apollo.query({
        query: LinkedProducts,
        variables,
      })
      return linkedProducts ? linkedProducts : { id: key.id, links: [] }
    },

    async updateItem (item, key) {
      let inputArr = this.parseItemForInput(item)
      let variables = {productId: key.id, linkType: this.linkType, inputArr: inputArr}
      let { data: { updateLinkedProducts } } = await this.$apollo.mutate({
        mutation: UpdateLinkedProducts,
        variables: variables,
      })
      return updateLinkedProducts
    },

    parseItemForInput (item) {
      return item.map(e => {
        let link = {product: e.id}
        if(e.variationsSku) {
          link.variationsSku = e.variationsSku
        }
        return link
      })
    },

    parseLoadResult (result) {
      return result
    },

    parseUpdateResult (result) {
      return result
    },

  },
}
</script>
