<template>
  <div id="product-editor-price-stock">
      <v-layout
      wrap
      >

      <v-row v-if="error">
        <v-col
        sm="12"
        >
        <v-alert type="error">
          {{ error }}
        </v-alert>
        </v-col>
      </v-row>

      <!-- --------------- PRICE --------------- -->
      <v-flex sm12>
        <v-card>
          <v-card-title>
            <v-layout>
            <v-flex sm12 md9>
              <h3>Price and Sales</h3>
            </v-flex>
          </v-layout>
          </v-card-title>

          <v-container
          fluid
          grid-list-xl
          >
          <v-layout
          align-center
          wrap
          >
          <v-flex sm12 md3>
            <v-text-field
            :label="priceLabel"
            name="price"
            placeholder=""
            v-model.number="editedItem.price"
            required
            ></v-text-field>
          </v-flex>

          <v-flex sm12 md6>
            <v-text-field
            label="Volume Price"
            name="slug"
            placeholder="separated by commas, ex: 3:15, 6:14, ..."
            v-model="editedItem.volumePrice"

            required
            ></v-text-field>
          </v-flex>

          <v-flex sm12 md3>
            <v-text-field
            label="Stock"
            name="stock"
            placeholder=""
            v-model.number="editedItem.stock"

            ></v-text-field>
          </v-flex>

            <v-flex sm12 md3>
              <v-text-field
              :label="salePriceLabel"
              name="salePrice"
              placeholder=""
              v-model.number="editedItem.salePrice"
              ></v-text-field>
            </v-flex>

          <v-flex sm12 md6>
            <v-text-field
            label="Sale Volume Price"
            name="slug"
            placeholder="separated by commas, ex: 3:12, 6:10, ..."
            v-model="editedItem.saleVolumePrice"
            ></v-text-field>
          </v-flex>

          <v-flex sm12 md3>
          </v-flex>

         <v-flex xs12 sm6 md3>
           <v-menu
             v-model="menuSaleStartDate"
             :close-on-content-click="false"
             :nudge-right="40"
             transition="scale-transition"
             offset-y
             min-width="290px"
           >
             <template v-slot:activator="{ on }">
               <v-text-field
                 v-model="editedItem.saleStartDate"
                 label="Sale Start Date"
                 prepend-icon="mdi-calendar"
                 clearable
                 readonly
                 v-on="on"
               ></v-text-field>
             </template>
             <v-date-picker v-model="editedItem.saleStartDate" @input="menuSaleStartDate = false"></v-date-picker>
           </v-menu>
         </v-flex>

         <v-flex xs12 sm6 md3>
           <v-menu
             v-model="menuSaleEndDate"
             :close-on-content-click="false"
             :nudge-right="40"
             transition="scale-transition"
             offset-y
             min-width="290px"
           >
             <template v-slot:activator="{ on }">
               <v-text-field
                 :disabled="stockLiquidation"
                 v-model="editedItem.saleEndDate"
                 label="Sale End Date"
                 prepend-icon="mdi-calendar"
                 clearable
                 readonly
                 v-on="on"
               ></v-text-field>
             </template>
             <v-date-picker v-model="editedItem.saleEndDate" @input="menuSaleEndDate = false"></v-date-picker>
           </v-menu>
         </v-flex>

         <v-flex xs12 sm6 md3>
           <v-checkbox
           v-model="stockLiquidation"
           label="Stock Liquidation"
           ></v-checkbox>
         </v-flex>

        </v-layout>
      </v-container>
    </v-card>
  </v-flex>


  <!-- --------------- SHIPPING DIMMENSIONS AND WEIGHT --------------- -->

  <v-flex sm12 >
    <v-card>
      <v-card-title>
        <div>
          <h3>Shipping Dimensions & Weight (for shipping costs calculations only)</h3>
        </div>
      </v-card-title>

      <v-container
      fluid
      grid-list-xl
      >
      <v-layout
      align-center
      wrap
      >
      <v-flex sm12 md3>
        <v-text-field
        label="Length (cm)"
        name="length"
        placeholder=""
        v-model.number="editedItem.packageLength"

        ></v-text-field>
      </v-flex>

      <v-flex sm12 md3>
        <v-text-field
        label="Width (cm)"
        name="salePrice"
        placeholder=""
        v-model.number="editedItem.packageWidth"

        ></v-text-field>
      </v-flex>
      <v-flex sm12 md3>
        <v-text-field
        label="Height (cm)"

        placeholder=""
        v-model.number="editedItem.packageHeight"

        required
        ></v-text-field>
      </v-flex>

    </v-layout>
    <v-layout
      align-center
      wrap
    >

      <v-flex sm12 md3>
        <v-text-field
        label="Weight (kg)"

        placeholder=""
        v-model.number="editedItem.packageWeight"

        required
        ></v-text-field>
      </v-flex>

    </v-layout>
  </v-container>
    </v-card>
  </v-flex>

  <!-- --------------- DIMMENSIONS AND WEIGHT --------------- -->
  <v-flex sm12 >
    <v-card>
      <v-card-title>
        <div>
          <h3>Product Packaging</h3>
        </div>
      </v-card-title>

      <v-container
      fluid
      grid-list-xl
      >
      <v-layout
      align-center
      wrap
      >
      <v-flex sm12 md6>
        <v-textarea
          v-model="editedItem.packaging"
          label="Product packaging"
          hint="Separate values by | or by new line "
        ></v-textarea>
      </v-flex>
    </v-layout>
  </v-container>
    </v-card>
  </v-flex>

  <v-row>
    <v-col
    sm="12"
    class="text-center"
    >
        <v-btn
        :disabled="disableSubmitBtn"
        @click="onUpdateItem"
        color="primary"
        >
          Update
        </v-btn>
    </v-col>
  </v-row>
</v-layout>
</div>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import productEditService from '@/services/products'
import variationEditService from '@/services/product-variations'
import { jsonCopy, filterObject, parseDate } from '@/utils'

export default {
  mixins: [ ErrorMixin ],

  props: {
    product: {
      required: true
    },

    parent: {
      type: Object,
    },
  },

  components: {
  },

  data: () => {
    return {
      editedItem: {},
      saleIsActives: [],
      menuSaleStartDate: false,
      menuSaleEndDate: false,
      currency: {
        code: "CHF",
      },
    }
  },

  computed: {
    disableSubmitBtn () {
      return !this.product || !this.product.id
    },

    isVariation () {
      return !!this.parent
    },

    isMainProduct () {
      return !this.parent
    },

    parentId () {
      return this.parent ? this.parent.id : null
    },

    saleHint () {
      if(!this.editedItem.sale || this.saleIsActives.length == 0) return ''
      let s = this.saleIsActives.find(e => e.id == this.editedItem.sale)
      let info = s ? `${parseDate(s.startDate)} - ${parseDate(s.endDate)} Value ${s.value}${s.discountType == 'PERCENT' ? '%' : this.currency.code}` : ''
      return info
    },

    saleIsActivesList () {
      return [{name: 'Choose Sale', id:  null},  ...this.saleIsActives]
    },

    priceLabel () {
      return `Price (${this.currency.code})`
    },

    salePriceLabel () {
      return `Sale Price (${this.currency.code})`
    },

    stockLiquidation: {
      get: function () {
        return this.editedItem.saleType == 'STOCK_LIQUIDATION'
      },

      set: function (val) {
        this.editedItem.saleType = val ? 'STOCK_LIQUIDATION' : 'ACTION'
      }
    }
  },

  methods: {

    getDefaultItem () {
      return {
        price: null,
        salePrice: null,
        volumePrice: '',
        saleVolumePrice: '',
        vat: null,
        saleIsActive: false,
        saleStartDate: null,
        saleEndDate: null,
        saleType: 'ACTION', // value: 'ACTION' | 'STOCK_LIQUIDATION'
        stock: null,

        packageWidth: null,
        packageHeight: null,
        packageLength: null,
        packageSizeUnit: 'cm',

        packageWeight: null,
        packageWeightUnit: 'cm',

        packaging: '',
      }
    },

    getActiveSaleById (id) {
      return this.saleIsActives.find(e => e.id == id)
    },

    async onUpdateItem () {
      this.clearError()
      try{
        let input = this.parseForInput(this.editedItem)
        let result = this.isMainProduct ? await productEditService.updateItem(this.product.id, input) : await variationEditService.updateItem(this.parent.id, this.editedItem.id, input)
        this.$emit('itemUpdated', result)
      }catch(error){
        this.setError(error.message)
      }
    },

    parseForInput (item) {
      let keys = Object.keys(this.getDefaultItem()).filter(e => e != 'saleIsActive')
      // copy editedItem values
      return filterObject(item, (value, prop) => keys.indexOf(prop) != -1)
    },

  },

  watch: {
    product: {
      handler: function (val) {
        this.editedItem = val ? jsonCopy(val) : this.getDefaultItem()
      },

      immediate: true
    },

    "editedItem.saleType": function(val){
      if(val){
        this.editedItem.saleEndDate = null
      }
    }
  }
}

</script>
