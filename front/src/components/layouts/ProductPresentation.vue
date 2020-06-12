<template>
  <v-row>
    <template v-if="product">
      <v-col sm="6" md="6">
        <ImgKit
        :path="product.image"
        :transform="[{w: 600}]"
        style="max-width: 100%;"
        />
      </v-col>

      <v-col sm="6" md="6">
        <div class="display-4">{{ p.name }}</div>
        <div class="text--disabled">SKU# {{p.sku}}</div>
        <div class="headline pt-5">{{ p.excerpt }}</div>
        <div class="display-1 pt-3" v-html="p.description"></div>

        <ProductVariationConfig
        v-if="isVariableProduct"
        :variableFeatures="variableFeatures"
        v-model="selectedConfig"
        />

        <ProductPrice
        :product="p"
        :quantity="9"
        />
      </v-col>

      <v-col md="8">
        <!-- ==================== INFO TABS DATA ==================== -->
        <v-card>
          <v-card-text>
          <base-material-tabs color="warning">
          <v-tab
            v-for="tab in infoTabs"
            :key="tab.slug"
            :href="`#tab-${tab.slug}`"
          >
            {{ tab.title }}
          </v-tab>

            <v-tab-item
            v-if="hasTechnicalInformation"
            value="tab-technical-informations"
            >
              <ProductTechnicalInformationTable
              :textContent="p.technicalInformation"
              />
            </v-tab-item>

            <v-tab-item
            v-if="hasPackagingInfo"
            value="tab-packaging"
            >
              <ProductPackagingTable
              :textContent="p.packaging"
              />
            </v-tab-item>

            <v-tab-item
            v-if="hasDimensionsInfo"
            value="tab-dimensions"
            >
              <ProductDimensionsTable
              :dimensions="dimensionsInfo"
              />
            </v-tab-item>


          </base-material-tabs>
        </v-card-text>
        </v-card>

        {{ p }}

        <!-- ==================== LINKED PRODUCTS DATA ==================== -->



      </v-col>
    </template>

    <template v-else>
      loading...
    </template>

  </v-row>
</template>

<script>
import ImgKit from '@common/components/img/ImgKit'
import ProductPackagingTable from '@/components/layouts/product/ProductPackagingTable'
import ProductTechnicalInformationTable from '@/components/layouts/product/ProductTechnicalInformationTable'
import ProductDimensionsTable from '@/components/layouts/product/ProductDimensionsTable'
import ProductPrice from '@/components/layouts/product/ProductPrice'
import ProductVariationConfig from '@/components/layouts/product/ProductVariationConfig'
import { isVariableProduct , PRODUCT_TYPE} from '@common/utils'
import { isEqual, defaultsDeep, omitBy, isNil } from 'lodash-es'

export default {

  components: {
    ImgKit,
    ProductPackagingTable,
    ProductTechnicalInformationTable,
    ProductDimensionsTable,
    ProductPrice,
    ProductVariationConfig,
  },

  props: {
    product: {
      type: Object,
    },

    selectedVariationSku: {
      type: String,
    }
  },

  data () {
    return {
      selectedConfig: {},

      previewIcons: [
        { icon: 'mdi-tag-heart-outline', color: 'blue' },
        { icon: 'mdi-trophy', color: 'success'},
        { icon: 'mdi-star-face', color: 'error'},
      ],
    }
  },

  computed: {
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
      return result
    },

    isVariableProduct () {
      return isVariableProduct(this.product)
    },

    variableFeatures () {
      return this.isVariableProduct ? this.product.variableFeatures : []
    },

    hasTechnicalInformation () {
      return this.p && this.p.technicalInformation
    },

    hasPackagingInfo () {
      return this.p && this.p.packaging
    },

    hasDimensionsInfo () {
      return this.p.sizeWidth ||  this.p.sizeHeight || this.p.sizeLength || this.p.weightNet || this.p.weightGross
    },

    dimensionsInfo () {
      let {sizeWidth, sizeHeight, sizeLength, sizeUnit, weightNet, weightGross, weightUnit} = this.p
      return {sizeWidth, sizeHeight, sizeLength, sizeUnit, weightNet, weightGross, weightUnit}
    },

    infoTabs () {
      let tabs = []
      if(this.hasPackagingInfo){
        tabs.push({title: 'Lieferumfang', slug: 'packaging'})
      }

      if(this.hasDimensionsInfo){
        tabs.push({title: 'Dimensionen & Gewicht', slug: 'dimensions'})
      }

      if(this.hasTechnicalInformation){
        tabs.push({title:'Technische Daten', slug: 'technical-informations'})
      }

      return tabs
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
</script>
