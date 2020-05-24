<template>
  <v-card flat>
    <v-container
    fluid
    grid-list-xl
    >
          <!-- --------------- PRICE --------------- -->
      <v-row>
        <v-col cols="12" sm="12">
          <base-subheading>
            Price and Sales
          </base-subheading>
        </v-col>

          <v-col sm="6" md="2">
            <v-text-field
            :label="priceLabel"
            name="price"
            placeholder=""
            v-model.number="editedItem.price"
            required
            ></v-text-field>
          </v-col>

          <v-col sm="12" md="6">
            <v-text-field
            label="Volume Price"
            name="slug"
            placeholder="separated by commas, ex: 3:15, 6:14, ..."
            v-model="editedItem.volumePrice"

            required
            ></v-text-field>
          </v-col>

          <v-col sm="12" md="2">
            <v-text-field
            label="Stock"
            name="stock"
            placeholder=""
            v-model.number="editedItem.stock"

            ></v-text-field>
          </v-col>

          <v-col sm="12" md="2">
          </v-col>

            <v-col sm="12" md="2">
              <v-text-field
              :label="salePriceLabel"
              name="salePrice"
              placeholder=""
              v-model.number="editedItem.salePrice"
              ></v-text-field>
            </v-col>

          <v-col sm="12" md="6">
            <v-text-field
            label="Sale Volume Price"
            name="slug"
            placeholder="separated by commas, ex: 3:12, 6:10, ..."
            v-model="editedItem.saleVolumePrice"
            ></v-text-field>
          </v-col>

          <v-col sm="12" md="4">
          </v-col>

         <v-col xs="12" sm="6" md="2">
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
         </v-col>

         <v-col xs="12" sm="6" md="2">
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
                 :disabled="isLiquidationSale"
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
         </v-col>

         <v-col xs="12" sm="6" md="3">
           <v-checkbox
           v-model="editedItem.saleType"
           :true-value="saleStockLiquidation"
           :false-value="saleAction"
           label="Stock Liquidation"
           ></v-checkbox>
         </v-col>


  <!-- --------------- SHIPPING DIMMENSIONS AND WEIGHT --------------- -->

  <v-col cols="12" sm="12">
    <base-subheading>
      Shipping Dimensions & Weight (for shipping costs calculations only)
    </base-subheading>
  </v-col>

      <v-col sm="6" md="2">
        <v-text-field
        label="Length (cm)"
        name="length"
        placeholder=""
        v-model.number="editedItem.packageLength"

        ></v-text-field>
      </v-col>

      <v-col sm="6" md="2">
        <v-text-field
        label="Width (cm)"
        name="salePrice"
        placeholder=""
        v-model.number="editedItem.packageWidth"

        ></v-text-field>
      </v-col>
      <v-col sm="6" md="2">
        <v-text-field
        label="Height (cm)"

        placeholder=""
        v-model.number="editedItem.packageHeight"

        required
        ></v-text-field>
      </v-col>


      <v-col sm="6" md="2">
        <v-text-field
        label="Weight (kg)"

        placeholder=""
        v-model.number="editedItem.packageWeight"

        required
        ></v-text-field>
      </v-col>


  <!-- --------------- PRODUCT PACKAGING --------------- -->
      <v-col cols="12" sm="12">
        <base-subheading>
          Product Packaging
        </base-subheading>
      </v-col>


      <v-col sm="12">
        <v-textarea
          v-model="editedItem.packaging"
          label="Product packaging"
          hint="Separate values by | or by new line "
        ></v-textarea>
      </v-col>



  <v-col class="text-center" sm="12">
    <FormSubmitButtons
    :formState="formState"
    @update-item="updateItem"
    @create-item="createItem"
    />
  </v-col>

  </v-row>
</v-container>
</v-card>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import { isLiquidationSale, SALE_TYPE } from '@common/utils'

export default {
  mixins: [ FormItemMixin ],

  components: {
    FormSubmitButtons,
  },

  data () {
    return {
      saleIsActives: [],
      menuSaleStartDate: false,
      menuSaleEndDate: false,
      saleAction: SALE_TYPE.ACTION,
      saleStockLiquidation: SALE_TYPE.STOCK_LIQUIDATION,
    }
  },

  computed: {
    priceLabel () {
      return `Price `
    },

    salePriceLabel () {
      return `Sale Price `
    },

    isLiquidationSale () {
      return isLiquidationSale(this.editedItem.saleType)
    },
  },

  watch: {
    "editedItem.saleType": function (val) {
      if(val == SALE_TYPE.STOCK_LIQUIDATION){
        this.editedItem.saleEndDate = null
      }
    }
  }

}

</script>
