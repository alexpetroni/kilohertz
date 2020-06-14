<template>
  <ProductPresentationRL
  field="slug"
  :id="slug"
  v-slot="{ item }"
  >
  <div>
    <ProductBreadcrumbs
    :product="item.productBy"
    :categories="item.productCategories"
    />

    <ProductPresentation
    :product="item.productBy"
    :selectedVariationSku="selectedVariationSku"
    @selection-change="onSelectionChange"
    />
  </div>
  </ProductPresentationRL>
</template>

<script>
import ProductPresentationRL from '@/components/rl/ProductPresentationRL'
import ProductPresentation from '@/components/layouts/ProductPresentation'
import ProductBreadcrumbs from '@/components/layouts/product/ProductBreadcrumbs'

export default {

  components: {
    ProductPresentationRL,
    ProductPresentation,
    ProductBreadcrumbs,
  },

  data () {
    return {
      slug: '',
      selectedVariationSku: '',
    }
  },

  methods: {
    onSelectionChange (sku) {
      if(sku == this.selectedVariationSku) return
      let path = `/product/${this.slug}` + (sku ? `/${sku}` : '')
      this.$router.push({path})
    },
  },

  watch: {
    '$route.params': {
      handler: function (val) {
        this.slug = val.slug
        this.selectedVariationSku = val.sel
      },
      immediate: true
    },
  },
}
</script>
