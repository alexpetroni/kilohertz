<template>
  <ProductPresentationRL
  field="slug"
  :id="slug"
  v-slot="{ item }"
  >
  <div>
    <v-row no-gutters>
      <v-col md="6" sm="12">
        <ProductBreadcrumbs
        :product="item.productBy"
        :categories="item.productCategories"
        />
      </v-col>

      <v-col md="6" sm="12">
        <ProductFamily
        v-if="item.productFamily"
        :family="item.productFamily"
        :excludeValue="productSku(item.productBy)"
        />
      </v-col>
    </v-row>

    <ProductPresentation
    :product="item.productBy"
    :svSku="selectedVariationSku"
    @selection-change="onSelectionChange"
    />
  </div>
  </ProductPresentationRL>
</template>

<script>
import ProductPresentationRL from '@/components/rl/ProductPresentationRL'
import ProductPresentation from '@/components/layouts/ProductPresentation'
import ProductBreadcrumbs from '@/components/layouts/product/ProductBreadcrumbs'
import ProductFamily from '@/components/layouts/product/ProductFamily'

export default {

  components: {
    ProductPresentationRL,
    ProductPresentation,
    ProductBreadcrumbs,
    ProductFamily,
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

    productSku (prod) {
      return prod && prod.sku
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
