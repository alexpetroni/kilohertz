<script>
import ProductAttachmentsSets from '@common/graphql/product-attachments-set/ProductAttachmentsSets.gql'

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

    nameArr: {
      type: Array,
      required: true,
    }
  },

  data () {
    return {
      parentSets: {},
      variationSets: {},
    }
  },

  computed: {
    sets  () {
      return Object.assign({}, this.parentSets, this.variationSets)
    }
  },

  methods: {
    async loadItem (field, value, nameArr) {
      let { data: { productAttachmentsSets } } = await this.$apollo.query({
        query: ProductAttachmentsSets,
        variables: {field, value, nameArr},
      })
      let setObj = {}
      if(productAttachmentsSets && productAttachmentsSets.length){
        productAttachmentsSets.forEach(e => {
          if(e.attachments && e.attachments.length){
            setObj[e.name] = e.attachments
          }
        })
      }
      return setObj
    },

  },

  watch: {
    product: {
      handler: async function (val) {
        if(val){
          this.parentSets = await this.loadItem(this.field, this.product, this.nameArr)
        }
      },
      immediate: true,
    },

    variation: {
      handler: async function (val) {
        if(val){
          this.variationSets = await this.loadItem(this.field, this.variation, this.nameArr)
        }else{
          this.variationSet = {}
        }
      },
      immediate: true,
    },

  },

  render() {
      return this.$scopedSlots.default({sets: this.sets})
  },
}
</script>
