<template>
  <v-row>
    <template v-if="product">
      <v-col sm="6" md="6">
        <!-- <ImgTransf
        :path="p.image"
        :transformation="[{w: 600}]"
        style="max-width: 100%;"
        /> -->
        <ProductGallery
        :product="product.id"
        :variation="variationId"
        name="gallery"
        :mainImage="p.image"

        />
      </v-col>

      <v-col sm="6" md="6">
        <div class="display-4">{{ p.name }}</div>
        <div class="text--disabled">SKU {{p.sku}}</div>
        <div class="headline pt-5">{{ p.excerpt }}</div>
        <div class="display-1 pt-3" v-html="p.description"></div>

        <ProductVariationConfig
        v-if="isVariableProduct"
        :variableFeatures="variableFeatures"
        v-model="selectedConfig"
        :selectableConfigs="selectableConfigs"
        />

        <ProductPresentationAddToCart
        :product="p"
        class="mb-0"
        />

        <ProductVolumeDiscount
        :product="p"
        />
      </v-col>

      <!-- ==================== INFO TABS DATA ==================== -->
      <v-col md="12" >

        <ProductAttachmetsSetsRL
        :product="product.id"
        :variation="variationId"
        :nameArr="attachmentsSets.map(e => e.slug)"
        v-slot="{sets}"
        >

          <ProductTabbedInfo
          :longDescription="p.longDescription"
          :technicalInformation="p.technicalInformation"
          :attSets="sets"
          :attNameArr="attachmentsSets"
          />

        </ProductAttachmetsSetsRL>
      </v-col>

<!-- <v-col md="8" >



  <ProductPresentationAttachmentsSets
  :product="product.id"
  :variation="variationId"
  :setsArr="attachmentsSets"
  />


</v-col> -->

      <v-col md="8" v-if="hasAttachmentsSets">
        <!-- ==================== ATTACHMENTS SETS TABS DATA ==================== -->
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
      </v-col>

      <v-col md="8" v-if="infoTabs.length">
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

            <!-- <v-tab-item
            v-if="hasTechnicalInformation"
            value="tab-technical-informations"
            >
              <ProductTechnicalInformationTable
              :textContent="p.technicalInformation"
              />
            </v-tab-item> -->

            <v-tab-item
            v-if="hasPackagingInfo"
            value="tab-packaging"
            >
              <ProductPackagingTable
              :textContent="p.packaging"
              />
            </v-tab-item>

            <!-- <v-tab-item
            v-if="hasDimensionsInfo"
            value="tab-dimensions"
            >
              <ProductDimensionsTable
              :dimensions="dimensionsInfo"
              />
            </v-tab-item> -->


          </base-material-tabs>
        </v-card-text>
        </v-card>
      </v-col>


      <!-- ==================== LINKED PRODUCTS DATA ==================== -->

      <LinkedProductsRL
      v-for="link in linkedProducts"
      :key="link.type"
      :id="link.type"
      field="slug"
      :fieldValue="p.slug"
      v-slot="{item}"
      >
      <v-col cols="12" v-if="item && item.links && item.links.length">
        <v-row>
        <v-col cols="12" class="headline">{{ link.title }}</v-col>
        <v-col
        v-for="p in item.links"
        :key="p.product.id"
        sm="4"
        md="3"
        >
          <ProductPreviewCard
          :product="p.product"
          />
        </v-col>
        </v-row>
      </v-col>

      </LinkedProductsRL>
    </template>

    <template v-else>
      loading...
    </template>

  </v-row>
</template>

<script>
import ProductPresentationMixin  from '@/mixins/ProductPresentationMixin'

// import ImgTransf from '@common/components/img/ImgTransf'
import ProductPackagingTable from '@/components/layouts/product/ProductPackagingTable'
import ProductTechnicalInformationTable from '@/components/layouts/product/ProductTechnicalInformationTable'
import ProductDimensionsTable from '@/components/layouts/product/ProductDimensionsTable'
import ProductPresentationAddToCart from '@/components/layouts/product/ProductPresentationAddToCart'
import ProductVariationConfig from '@/components/layouts/product/ProductVariationConfig'
import ProductVolumeDiscount from '@/components/layouts/product/ProductVolumeDiscount'
// import ProductPresentationAttachmentsSets from '@/components/layouts/product/ProductPresentationAttachmentsSets'

import ProductAttachmetsSetsRL from '@/components/rl/ProductAttachmetsSetsRL'

import ProductTabbedInfo from '@/components/layouts/product/ProductTabbedInfo'

import LinkedProductsRL from '@/components/rl/LinkedProductsRL'
import ProductPreviewCard from '@/components/layouts/ProductPreviewCard'

import ProductGallery from '@/components/layouts/product/ProductGallery'

export default {
  mixins: [ ProductPresentationMixin ],

  components: {
    // ImgTransf,
    ProductPackagingTable,
    ProductTechnicalInformationTable,
    ProductDimensionsTable,
    ProductPresentationAddToCart,
    ProductVariationConfig,
    ProductVolumeDiscount,
    LinkedProductsRL,
    ProductAttachmetsSetsRL,
    ProductTabbedInfo,
    ProductPreviewCard,
    // ProductPresentationAttachmentsSets,
    ProductGallery,
  },

  props: {
    svSku: {
      type: String,
    },
  },

  data () {
    return {
      linkedProducts: [
        {type: 'accessories', title: 'Zubehör'},
        {type: 'cross-sells', title: 'Kunden kauften auch'},
        {type: 'replacement-material', title: 'Ersatzmaterial'},
      ],

      attachmentsSets:[
        {title: "Flyers", slug: "flyers"},
        {title: "Manuals", slug: "manuals"},
        {title: "Layouts", slug: "layouts"},
        {title: "Videos", slug: "videos"},
      ],

      currentId: null,
    }
  },

  computed: {

    hasTechnicalInformation () {
      return false // this.p && this.p.technicalInformation
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

    hasAttachmentsSets () {
      return false
    },

    variationId () {
      return this.isVariableProduct && this.selectedVariation ? this.selectedVariation.id : null
    },

  },

  watch: {
    svSku: {
      handler: function (val) {
        this.selectedVariationSku = val
      },
      immediate: true,
    }
  }

}
</script>
