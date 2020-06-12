<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'
import ProductPresentation from '@common/graphql/product/ProductPresentation.gql'

export default {
  extends: BaseItemFormModel,

  props: {
    field: {
      type: String,
      default: 'id'
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
      let { data: { productBy, categoryMeta } } = await this.$apollo.query({
        query: ProductPresentation,
        variables: key,
        fetchPolicy
      })
      return { productBy, categoryMeta }
    },

    parseLoadResult (result) {
      return result
    },

    itemKey () {
      return {field: this.field, value: this.id}
    },

  },
}
</script>
