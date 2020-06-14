<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'
import ProductPresentation from '@common/graphql/product/ProductPresentation.gql'

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
      let { data: { productBy, categoryMeta, productCategories } } = await this.$apollo.query({
        query: ProductPresentation,
        variables: key,
        fetchPolicy
      })
      return { productBy, categoryMeta, productCategories }
    },

    parseLoadResult (result) {
      console.log('parseLoadResult %o', result)
      return result
    },

    itemKey () {
      return { field: this.field, value: this.id }  // as 'id' a 'sku' or a 'slug' are qualified as well
    },

  },
}
</script>
