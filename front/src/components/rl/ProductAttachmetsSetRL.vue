<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'
import ProductAttachmentsSet from '@common/graphql/product-attachments-set/ProductAttachmentsSet.gql'

export default {
  extends: BaseItemFormModel,

  props: {
    field: {
      type: String,
      default: 'id' // id | sku | slug
    },

    args: {
      type: Object,
    },
  },



  methods: {
    getDefaultItem () {
      return {}
    },

    async loadItem (key, fetchPolicy) {
      let { data: { productAttachmentsSet } } = await this.$apollo.query({
        query: ProductAttachmentsSet,
        variables: key,
        fetchPolicy
      })
      return productAttachmentsSet
    },

    parseLoadResult (result) {
      return result
    },

    itemKey () {
      return { field: this.field, value: this.id }  // as 'id' a 'sku' or a 'slug' are qualified as well
    },

  },
}
</script>
