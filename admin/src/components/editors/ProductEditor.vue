<template>
  <ProductFormModel
    busEventName="product"
    :id="id"
    v-slot="{item, modelState, crudEvents, updateVariableFeatures, updateVariations }"
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
            v-bind="modelState"
            v-on="Object.assign({}, crudEvents, pipeUp('new-item', 'cancel'))"
            :name="item.name"
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
                v-for="t in productTabs(item)"
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
            value="tab-classification"
            >
              <ProductClassificationForm :id="id" />
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


            <template v-if="isVariableProduct(item)">
            <v-tab-item
            value="tab-variable-features"
            >
              <ProductVariableFeaturesForm
                :item="productVariableFeaturesData(item)"
                v-bind="modelState"
                @update-item="updateVariableFeatures"
              />
            </v-tab-item>

            <v-tab-item
            value="tab-variations"
            >
              <ProductVariationsListForm
                :items="productVariationsData(item)"
                :parent="item"
                v-bind="modelState"
                @update-item="updateVariations"
                singleDeleteMsg="Do you want to delete this item? <br /><span style='font-size: .75em;'>(you need to 'Update' to save the changes)</span>"
                multiDeleteMsg="Do you want to delete this items? <br /><span style='font-size: .75em;'>(you need to 'Update' to save the changes)</span>"
              />
            </v-tab-item>
          </template>


        </v-tabs>


    </base-material-card>
  </v-container>
  </ProductFormModel>
</template>

<script>
import ProductFormModel from '@/components/models/ProductFormModel'
import FormTopBar from '@common/components/FormTopBar'
import ProductBasicForm from '@/components/forms/ProductBasicForm'
import ProductPriceDeliveryForm from '@/components/forms/ProductPriceDeliveryForm'
import ProductClassificationForm from '@/components/forms/ProductClassificationForm'
import ProductMediaForm from '@/components/forms/ProductMediaForm'
import ProductVariableFeaturesForm from '@/components/forms/ProductVariableFeaturesForm'
import ProductVariationsListForm from '@/components/forms/ProductVariationsListForm'
import ProductAttachmentsSetEditor from '@/components/editors/ProductAttachmentsSetEditor'

import { pipeEvents, isNewForm, parseDate, isVariableProduct} from '@common/utils'
import { pick } from 'lodash-es'

export default {
  name: 'ProductEditor',

  components: {
    ProductFormModel,
    FormTopBar,
    ProductBasicForm,
    ProductPriceDeliveryForm,
    ProductClassificationForm,
    ProductMediaForm,
    ProductVariableFeaturesForm,
    ProductVariationsListForm,
    ProductAttachmentsSetEditor,
  },

  props: {
    id: {
      type: String
    },
  },

  data () {
    return {
      tabsModel: 'tab-basic-data',
      mediaTabsModel: '#media-tab-image',

      mediaTabs: [
              {title: 'Gallery', component: 'ProductAttachmentsSetEditor', name: 'gallery'},
              {title: 'Videos', component: 'ProductAttachmentsSetEditor', name: 'videos'},
              {title: 'Flyers', component: 'ProductAttachmentsSetEditor', name: 'flyers'},
              {title: 'Manuals', component: 'ProductAttachmentsSetEditor', name: 'manuals'},
              {title: 'Layouts', component: 'ProductAttachmentsSetEditor', name: 'layouts'}
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

    productTabs (item) {
      let tabs = [
          {
            title: 'Basic Data',
            slug: 'tab-basic-data',
          },

          {
            title: 'Price&Delivery',
            slug: 'tab-price-delivery',
          },

          {
            title: 'Classification',
            slug: 'tab-classification',
          },

          {
            title: 'Media',
            slug: 'tab-media',
          },

          {
            title: 'Linked Products',
            slug: 'tab-linked-products',
          },
        ]
      if(item && isVariableProduct(item)){
        tabs.push(
          {
            title: 'Variable Features',
            slug: 'tab-variable-features',
          },

          {
            title: 'Variations',
            slug: 'tab-variations',
          },
        )
      }

      return tabs
    },

    isVariableProduct (prod) {
      return isVariableProduct(prod)
    },
  },

  watch: {
    id: function () {
      this.tabsModel = 'tab-basic-data'
    }
  }

}
</script>
