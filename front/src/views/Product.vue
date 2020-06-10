<template>
  <ProductFullRL
  field="slug"
  :id="slug"
  v-slot="{ item }"
  >
    <ProductPresentation
    :product="item.productBy"
    />
  </ProductFullRL>
</template>

<script>
import ProductFullRL from '@/components/rl/ProductFullRL'
import ProductPresentation from '@/components/layouts/ProductPresentation'

export default {
  name: '',

  components: {
    ProductFullRL,
    ProductPresentation,
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
  },

  data () {
    return {
      slug: '',
    }
  },

  computed: {

  },

  methods: {

  },

  watch: {
    '$route.params.slug': {
      handler: function (val) {
        this.slug = val
      },
      immediate: true
    },
  },


}
</script>
