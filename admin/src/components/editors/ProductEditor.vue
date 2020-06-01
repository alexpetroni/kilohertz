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
            value="tab-media"
            >
              <ProductMediaForm
                :item="productMediaData(item)"
                v-bind="modelState"
                v-on="Object.assign({}, crudEvents)"
              />
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
import ProductMediaForm from '@/components/forms/ProductMediaForm'
import ProductVariableFeaturesForm from '@/components/forms/ProductVariableFeaturesForm'
import ProductVariationsListForm from '@/components/forms/ProductVariationsListForm'

import { pipeEvents, isNewForm, parseDate, isVariableProduct} from '@common/utils'
import { pick } from 'lodash-es'

export default {
  name: 'ProductEditor',

  components: {
    ProductFormModel,
    FormTopBar,
    ProductBasicForm,
    ProductPriceDeliveryForm,
    ProductMediaForm,
    ProductVariableFeaturesForm,
    ProductVariationsListForm,
  },

  props: {
    id: {
      type: String
    },
  },

  data () {
    return {
      tabsModel: 'tab-basic-data',
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

        'sizeWidth',
        'sizeHeight',
        'sizeLength',
        'sizeUnit',

        'weightNet',
        'weightGross',
        'weightUnit',
        'previewFields',
      ]

      return pick(item, fields)
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

    productMediaData (item) {
      return {
        image: item.image,
        gallery: item.gallery || [], 
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
