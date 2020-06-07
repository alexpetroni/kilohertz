<script>
import Product from '@common/graphql/product/Product.gql'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },

    raw: {
      type: Boolean,
    }
  },

  data () {
    return {
      product: null,
    }
  },

  apollo: {
    product: {
      query: Product,
      variables () { return {id: this.id, raw: this.raw} },
      update: (data) => {
        return data.product
      },
      fetchPolicy: 'network-only'
    }
  },

  render() {
    return this.$scopedSlots.default({ product: this.product, loading: this.$apollo.queries.product.loading })
  }
}
</script>
