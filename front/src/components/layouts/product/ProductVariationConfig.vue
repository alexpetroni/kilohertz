<template>
  <div>
    <ProductVariableFeatureSelector
    v-for="f in variableFeatures"
    :key="f.slug"
    :feature="f"
    :selected="variationConfig[f.slug]"
    @change="onConfigChange(f.slug, $event)"
    />
  </div>
</template>

<script>
import ProductVariableFeatureSelector from '@/components/layouts/product/ProductVariableFeatureSelector'

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
  },

  methods: {
    onConfigChange(slug, event){
      let conf = Object.assign({}, this.variationConfig, {[slug]: event})
      this.$emit('change', conf)
    }
  },
}
</script>
