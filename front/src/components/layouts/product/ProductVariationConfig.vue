<template>
  <div>
    <ProductVariableFeatureSelector
    v-for="f in variableFeatures"
    :key="f.slug"
    :feature="f"
    :value="variationConfig[f.slug]"
    @change="onConfigChange(f.slug, $event)"
    />
  </div>
</template>

<script>
import ProductVariableFeatureSelector from '@/components/layouts/product/ProductVariableFeatureSelector'

export default {
  name: '',

  components: {
    ProductVariableFeatureSelector,
  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [],

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

  data () {
    return {

    }
  },

  computed: {

  },

  watch: {

  },

  methods: {
    onConfigChange(slug, event){
      let conf = Object.assign({}, this.variationConfig, {[slug]: event})
      this.$emit('change', conf)
    }
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
