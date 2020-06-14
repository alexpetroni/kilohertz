<script>
import BaseItemFormModel from '@common/models/BaseItemFormModel'
import LinkedProducts from '@common/graphql/product/LinkedProducts.gql'

export default {
  extends: BaseItemFormModel,

  props: {
    //'id' prop from BaseItemFormModel will be used for linkType
    field: {
      type: String,
      default: 'slug'
    },

    fieldValue: {
      type: String,
      required: true,
    }
  },

  methods: {
    getDefaultItem () {
      return []
    },

    async loadItem (key, fetchPolicy) {
      let variables = {field: this.field, value: this.fieldValue, linkType: key.id }
      console.log('variables %o', variables)
      let { data: { linkedProducts } } = await this.$apollo.query({
        query: LinkedProducts,
        variables,
        fetchPolicy
      })
      return linkedProducts
    },

    parseLoadResult (result) {
      console.log('result linkedProducts %o', result)
      return result
    },

  },
}
</script>
