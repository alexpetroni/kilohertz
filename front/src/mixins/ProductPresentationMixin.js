import { isVariableProduct , PRODUCT_TYPE} from '@common/utils'
import { isEqual, defaultsDeep, omitBy, isNil } from 'lodash-es'

export default {

  components: {

  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [],

  model: {

  },

  props: {
    product: {
      type: Object,
    },
  },

  data () {
    return {
      qty: 1,
      selectedConfig: {},
      selectedVariationSku: null,
    }
  },

  computed: {
    isVariableProduct () {
      return isVariableProduct(this.product)
    },

    variableFeatures () {
      return this.isVariableProduct ? this.product.variableFeatures : []
    },

    p () {
      if(isVariableProduct(this.product) && this.selectedVariation){
        return defaultsDeep({ type: PRODUCT_TYPE.VARIATION }, this.selectedVariation, this.product)
      }
      return this.product
    },

    selectedVariation () {
      const variations = this.product && this.product.variations
      if(!this.selectedVariationSku || !Array.isArray(variations) || !variations.length) return
      let v = variations.find(e => e.sku == this.selectedVariationSku)
      let result = v ? omitBy(v, isNil) : null

      // console.log('selectedVariation %o', result)
      return result
    },

    selectableConfigs () {
      if(!this.isVariableProduct) return []
      return this.product.variations.map(e => e.featuresConfig)
    },
  },

  watch: {
    selectedConfig: function (val) {
      this.$emit('selection-change', this.getVariationSkuForConfig(val))
    },

    selectedVariation: function (val) {
      if(val && val.featuresConfig && !isEqual(this.selectedConfig, val.featuresConfig)) { // sync selected config if needed
        this.selectedConfig = val.featuresConfig
      }
    }
  },

  methods: {
    getVariationSkuForConfig (featuresConfig) {
      const variations = this.product && this.product.variations
      if(!Array.isArray(variations) || !variations.length) return
      let v = variations.find(e => isEqual(featuresConfig, e.featuresConfig))
      return v && v.sku
    }
  },


}
