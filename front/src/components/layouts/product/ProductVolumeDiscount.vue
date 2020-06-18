<template>
  <div v-if="ithasVolumePrice" >
    <div class="d-flex justify-end">
    <v-switch dense label="Volume prices" v-model="showTable" class="pt-0 mt-0"/>
  </div>
      <template v-if="showTable">
        <v-card class="mt-n2">
      <v-card-text>
        <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Qty.</th>
              <th class="text-right">Preise</th>
              <th class="text-right">Discount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.name">
              <td>ab {{ item.qty }}</td>
              <td class="text-right">{{ formatPrice(item.price) }}</td>
              <td class="text-right">{{ item.discount }}%</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
    </v-card>
    </template>
  </div>
</template>

<script>
import { volumePriceArr, hasVolumePrice, discountPercent, formatPrice } from '@common/utils'
import { mapState } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
    },
  },

  data () {
    return {
      showTable: false,
    }
  },

  computed: {
    ...mapState(['currencySymbol']),

    ithasVolumePrice () {
      return hasVolumePrice(this.product)
    },

    items () {
      if(!this.product) return []
      const price = this.product.regularPrice || this.product.price
      const arr = volumePriceArr(this.product)

      return arr.map(e => ({
        qty: e.qty,
        price: e.price,
        discount: discountPercent(e.price, price)
      }))
    },
  },

  methods: {
    formatPrice (price) {
      return formatPrice(price, this.currencySymbol)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
