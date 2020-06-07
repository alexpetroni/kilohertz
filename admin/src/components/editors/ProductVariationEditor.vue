<template>
  <ProductVariationFormModel
    busEventName="product-variation"
    :id="id"
    :parentId="parentId"
    v-slot="{item, modelState, crudEvents }"
    v-on="pipeUp('item-created', 'item-updated', 'item-deleted')"
    >

    <v-container
      fluid
      tag="section"
    >
      <base-material-card
       class="mx-auto">
        <template v-slot:heading>
          <FormTopBar
            addNewTitle="Add New Product"
            editTitle="Edit Variation"
            v-bind="modelState"
            v-on="Object.assign({}, crudEvents, pipeUp('new-item', 'cancel'))"
            :name="variationName(item)"
            :menuItems="topBarMenuItems"
          />
          </template>

          <div style="height: 5px;">
          <v-progress-linear v-show="modelState.loading"  indeterminate></v-progress-linear>
          </div>

          <v-alert v-if="modelState.error" type="error">{{ modelState.error }}</v-alert>

          <v-tabs
            v-model="tabsModel"
            centered
            slider-color="blue"
            color="elevation-1"
          >
            <v-tab
                v-for="t in productTabs"
                :href="`#${t.slug}`"
                :key="t.slug"
                :disabled="disableTab(t.slug, modelState.formState)"
              >
                {{ t.title }}
            </v-tab>

            <v-tab-item
            value="tab-basic-data"
            >
              <ProductBasicForm
                :item="productBasicData(item)"
                v-bind="modelState"
                v-on="Object.assign({}, crudEvents)"
              />
            </v-tab-item>

            <v-tab-item
            value="tab-price-delivery"
            >
              <ProductPriceDeliveryForm
                :item="productPriceDeliveryData(item)"
                v-bind="modelState"
                v-on="Object.assign({}, crudEvents)"
              />
            </v-tab-item>


            <v-tab-item
            value="tab-media"
            >
            <!-- ================ MEDIA TABS ================= -->
                <v-tabs vertical v-model="mediaTabsModel">
                  <v-tab href="#media-tab-image"> Main Image</v-tab>

                  <v-tab v-for="t in mediaTabs"
                  :key="t.name"
                  :href="`#media-tab-${t.name}`"
                  >
                    {{ t.title}}
                  </v-tab>

                  <v-tab-item value="media-tab-image">
                    <ProductMediaForm
                      :item="productMediaData(item)"
                      v-bind="modelState"
                      v-on="Object.assign({}, crudEvents)"
                    />
                  </v-tab-item>

                  <v-tab-item
                     v-for="t in mediaTabs"
                     :key="t.name"
                     :value="`media-tab-${t.name}`"
                   >
                   <ProductAttachmentsSetEditor
                   :productId="id"
                   :setName="t.name"
                   />
                  </v-tab-item>
                </v-tabs>
            </v-tab-item>

            <v-tab-item
            value="tab-linked-products"
            >
            <!-- ================ LINKED PRODUCTS TABS ================= -->
          <v-tabs vertical v-model="mediaTabsModel">
            <v-tab v-for="t in linkedProductsTabs"
            :key="t.linkType"
            :href="`#linked-tab-${t.linkType}`"
            >
              {{ t.name }}
            </v-tab>

              <v-tab-item
                 v-for="t in linkedProductsTabs"
                 :key="t.linkType"
                 :value="`linked-tab-${t.linkType}`"
               >
                <LinkedProductsSetEditor
                :id="id"
                :linkType="t.linkType"
                />
              </v-tab-item>
            </v-tabs>
            </v-tab-item>
        </v-tabs>


    </base-material-card>
  </v-container>
  </ProductVariationFormModel>
</template>

<script>
import ProductVariationFormModel from '@/components/models/ProductVariationFormModel'
import FormTopBar from '@common/components/FormTopBar'
import ProductBasicForm from '@/components/forms/ProductBasicForm'
import ProductPriceDeliveryForm from '@/components/forms/ProductPriceDeliveryForm'
import ProductMediaForm from '@/components/forms/ProductMediaForm'
import ProductAttachmentsSetEditor from '@/components/editors/ProductAttachmentsSetEditor'
import LinkedProductsSetEditor from '@/components/editors/LinkedProductsSetEditor'

import { pipeEvents, isNewForm, parseDate, isVariableProduct} from '@common/utils'
import { pick } from 'lodash-es'

export default {
  name: 'ProductVariationEditor',

  components: {
    ProductVariationFormModel,
    FormTopBar,
    ProductBasicForm,
    ProductPriceDeliveryForm,
    ProductMediaForm,
    LinkedProductsSetEditor,
    ProductAttachmentsSetEditor,
  },

  props: {
    id: {
      type: String
    },

    parentId: {
      type: String,
    },
  },

  data () {
    return {
      productTabs: [
        {
          title: 'Basic Data',
          slug: 'tab-basic-data',
        },

        {
          title: 'Price&Delivery',
          slug: 'tab-price-delivery',
        },

        {
          title: 'Media',
          slug: 'tab-media',
        },

        {
          title: 'Linked Products',
          slug: 'tab-linked-products',
        },
      ],

      tabsModel: 'tab-basic-data',
      mediaTabsModel: '#media-tab-image',

      mediaTabs: [
              {title: 'Gallery', component: 'ProductAttachmentsSetEditor', name: 'gallery'},
              {title: 'Videos', component: 'ProductAttachmentsSetEditor', name: 'videos'},
              {title: 'Flyers', component: 'ProductAttachmentsSetEditor', name: 'flyers'},
              {title: 'Manuals', component: 'ProductAttachmentsSetEditor', name: 'manuals'},
              {title: 'Layouts', component: 'ProductAttachmentsSetEditor', name: 'layouts'}
            ],

      linkedProductsTabs: [
        { name: 'Accessories', linkType: 'accessories' },
        { name: 'Cross Sells', linkType: 'cross-sells' },
        { name: 'Replacement Material', linkType: 'replacement-material' },
      ],

      topBarMenuItems: [
        {title: "Reload", emit: 'reload-item', icon: "mdi-reload"},
      ],
    }
  },

  computed: {

  },

  methods: {
    productBasicData (item) {
      const fields = [
        'type',
        'name',
        'slug',
        'sku',
        'published',
        'excerpt',
        'description',
        'technicalInformation',
        'displayOrder',

        'brand',

        'sizeWidth',
        'sizeHeight',
        'sizeLength',
        'sizeUnit',

        'weightNet',
        'weightGross',
        'weightUnit',
        'previewFields',
      ]

      let data = pick(item, fields)
      if(data.brand){
        data.brand = data.brand.id
      }
      return data
    },

    productPriceDeliveryData (item) {
      const fields = [
        'price',
        'salePrice',
        'volumePrice',
        'saleVolumePrice',
        'vat',
        'saleIsActive',
        'saleStartDate',
        'saleEndDate',
        'saleType',
        'stock',

        'packageWidth',
        'packageHeight',
        'packageLength',
        'packageSizeUnit',

        'packageWeight',
        'packageWeightUnit',

        'packaging',
      ]
      let data = pick(item, fields)
      if(data.saleStartDate){
        data.saleStartDate = parseDate(data.saleStartDate)
      }
      if(data.saleEndDate){
        data.saleEndDate = parseDate(data.saleEndDate)
      }
      return data
    },

    productVariableFeaturesData (item) {
      let vf = []
      if(item.variableFeatures && item.variableFeatures.length) {
        vf = item.variableFeatures.map(e => {
          return {slug: e.slug, items: e.items.map(f => f.slug)}
        })
      }

      return vf
    },

    productClassificationData (item) {
      const { brand } = item
      const brandId = brand && brand.id
      return {
        brand: brandId,
      }
    },

    productMediaData (item) {
      return {
        image: item.image,
      }
    },

    productVariationsData (item) {
      return item.variations
    },

    pipeUp (...events) {
      return pipeEvents(this, ...events)
    },

    disableTab (slug, state) {
      return isNewForm(state) && slug != 'tab-basic-data'
    },

    isVariableProduct (prod) {
      return isVariableProduct(prod)
    },

    editVariation (val) {
      this.$emit('edit-variation', val)
    },

    variationName (item) {
      return `${item.name} <small>(${item.sku})</small>`
    }
  },

  watch: {
    id: function () {
      this.tabsModel = 'tab-basic-data'
    }
  }

}
</script>
