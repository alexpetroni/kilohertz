<template>
  <div>
    <ProductVariableFeatureSelector
    v-for="f in variableFeatures"
    :key="f.slug"
    :feature="f"
    :selected="variationConfig[f.slug]"
    @change="onConfigChange(f.slug, $event)"
    :disabledOptions="disabledFeaturesForConfig(f.slug, variationConfig)"
    />
  </div>
</template>

<script>
import ProductVariableFeatureSelector from '@/components/layouts/product/ProductVariableFeatureSelector'
import { pickBy, isEmpty, difference }  from 'lodash-es'

export default {

  components: {
    ProductVariableFeatureSelector,
  },

  model: {
    prop: 'variationConfig',
    event: 'change'
  },

  props: {
    variableFeatures: {
      type: Array,
      default: () => [],
    },

    variationConfig: {
      type: Object,
      default: () => {}
    },

    selectableConfigs: { // all the product variations configs, to prevent selection of an inexistent combination
      type: Array,
      default: () => []
    },
  },

  computed: {
    disabledOptions () {
      return this.variableFeatures.reduce((acc, e) => {
        acc[e.slug] = this.disabledFeaturesForConfig(e.slug, this.definedVariationConfig)
        return acc
      }, {})
    },

    definedVariationConfig () { // the variationConfig with only the fields that are valid choices
      return pickBy(this.variationConfig, (val) => !!val)
    },
  },

  methods: {
    onConfigChange(slug, event){
      let conf = Object.assign({}, this.variationConfig, {[slug]: event})
      this.$emit('change', conf)
    },
    // slug is the variableFeature slug and dvc is the computed 'definedVariationConfig'
    disabledFeaturesForConfig (slug, vc) {


      let dvc = pickBy(vc, (val, key) => !!val && key != slug)
      if(isEmpty(dvc)) return []
      const vf = this.variableFeatures.find(e => e.slug == slug)
      const allOptions = vf && vf.items && vf.items.map(e => e.slug)

      if(!Array.isArray(allOptions) || !allOptions.length) return []
      const availableOptions = this.selectableConfigs
      .filter(e => Object.keys(dvc).every(k => e[k] == dvc[k])) // filter the configs that match partial variationConfig
      .map(e => e[slug]) // retain only the values for that slug
      .filter((e, index, arr) => arr.indexOf(e) == index) // remove duplicates

      let dis = difference(allOptions, availableOptions)

      return dis
    },



  },
}
</script>
