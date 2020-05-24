<template>
  <ProductFormModel
    busEventName="product"
    :id="id"
    v-slot="{item, modelState, crudEvents}"
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

          <v-progress-linear indeterminate v-if="modelState.loading"></v-progress-linear>

          <v-alert v-if="modelState.error" type="error">{{ modelState.error }}</v-alert>

          <v-tabs
            v-model="tabsModel"
            centered
            slider-color="blue"
            color="elevation-1"
          >
            <v-tab
                v-for="t in tabs"
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



          <!-- <v-tab-item v-for="t in tabs"
          :key="t.slug"
          :value="t.slug"
          >
          {{ t.slug }}
          </v-tab-item> -->

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


import { pipeEvents, isNewForm, parseDate } from '@common/utils'
import { pick } from 'lodash-es'

export default {
  name: 'ProductEditor',

  components: {
    ProductFormModel,
    FormTopBar,
    ProductBasicForm,
    ProductPriceDeliveryForm,

  },

  props: {
    id: {
      type: String
    },
  },

  data () {
    return {
      tabsModel: 'tab-basic-data',

      tabs: [
          {
            title: 'Basic Data',
            slug: 'tab-basic-data',
            component: 'ProductBasicForm'
          },

          {
            title: 'Price&Delivery',
            slug: 'tab-price-delivery',
            component: 'ProductPriceDeliveryEditor'
          },

          {
            title: 'Classification',
            slug: 'tab-classification',
            component: 'ProductClassificationEditor'
          },

          {
            title: 'Media',
            slug: 'tab-media',
            component: 'ProductMediaEditor'
          },

          {
            title: 'Linked Products',
            slug: 'tab-linked-products',
            component: 'LinkedProductsContainer'
          },

          {
            title: 'Variable Features',
            slug: 'tab-variable-features',
            component: 'ProductVariableFeaturesEditor'
          },

          {
            title: 'Variations',
            slug: 'tab-variations',
            component: 'ProductVariationsTableEditor'
          },
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
      console.log('productPriceDeliveryData item %o', item)
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
      console.log('productPriceDeliveryData -- parsed -- data %o', data)
      return data
    },

    pipeUp (...events) {
      return pipeEvents(this, ...events)
    },

    disableTab (slug, state) {
      return isNewForm(state) && slug != 'tab-basic-data'
    },
  },

}
</script>
