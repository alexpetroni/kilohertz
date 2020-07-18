<script>
import ProductAttachmentsSet from '@common/graphql/product-attachments-set/ProductAttachmentsSet.gql'

export default {

  props: {
    field: {
      type: String,
      default: 'id' // id | sku
    },

    product: {
      type: String,
      required: true,
    },

    variation: {
      type: String
    },

    name: {
      type: String,
      required: true,
    }
  },

  data () {
    return {
      parentSet: null,
      variationSet: null,
    }
  },

  computed: {
    set  () {
      return this.variationSet || this.parentSet
    }
  },

  methods: {
    async loadItem (field, value, name) {
      let { data: { productAttachmentsSet } } = await this.$apollo.query({
        query: ProductAttachmentsSet,
        variables: {field, value, name},
      })
      return productAttachmentsSet && productAttachmentsSet.attachments && productAttachmentsSet.attachments.length ? productAttachmentsSet.attachments : null
    },
  },

  watch: {
    product: {
      handler: async function (val) {
        if(val){
          this.parentSet = await this.loadItem(this.field, this.product, this.name)
        }
      },
      immediate: true,
    },

    variation: {
      handler: async function (val) {
        if(val){
          this.variationSet = await this.loadItem(this.field, this.variation, this.name)
        }else{
          this.variationSet = null
        }
      },
      immediate: true,
    },

  },

  render() {
      return this.$scopedSlots.default({set: this.set})
  },
}
</script>
