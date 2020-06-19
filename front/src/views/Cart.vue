<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="12" md="8">
        <base-material-card
          color="success"
          icon="mdi-cart-outline"
          :title="cartTitle"
          class="px-5 py-3"
        >
          <!-- <v-card-title class="display-3">
            {{ cartTitle }}
          </v-card-title> -->

          <v-container fluid>
            <template v-if="cartIsEmpty">
              <div class="headline text-center pa-12">
                Leg los und fülle deinen Warenkorb.
              </div>
            </template>

            <template v-else>
            <CartItemCard
            v-for="item in cartItems"
            :key="item.sku"
            :product="item.product"
            :qty="item.qty"
            @remove-item="removeFromCart"
            >
            </CartItemCard>

            <v-card flat color="transparent">
              <v-card-text class="text-right">
                Total: {{ totalFormatPrice }}
                <div
                v-if="discountAmount"
                class="regularPrice">{{ totalFormatRegularPrice }}
              </div>
              <div
              v-if="discountAmount"
              class="discount">{{ formatedDiscountAmount }}
            </div>
              </v-card-text>
            </v-card>

            </template> <!-- cart not empty -->


          </v-container>

          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="backToShop">Entdecke mehr</v-btn>
            <v-spacer />
            <v-btn color="primary" :disabled="cartIsEmpty">Zur Kasse</v-btn>
            <v-spacer />
          </v-card-actions>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import CartItemCard from '@/components/layouts/cart/CartItemCard'
import { formatPrice } from '@common/utils'

export default {

  components: {
    CartItemCard,
  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [],

  model: {

  },

  props: {

  },

  data () {
    return {

    }
  },

  computed: {
    ...mapState(['cartItems', 'currencySymbol']),

    cartIsEmpty () {
      return !this.cartItems.length
    },

    itemsInCart () {
      return this.cartIsEmpty ? 0 : this.cartItems.reduce((acc, e) => acc + e.qty, 0)
    },

    cartTitle () {
      let title = 'Warenkorb'
      if(this.itemsInCart){
        title += ` (${this.itemsInCart} Artikel)`
      }
      return title
    },

    total () {
      return this.cartIsEmpty ? 0 : this.cartItems.reduce((acc, e) => acc + e.product.price * e.qty, 0)
    },

    totalRegular () {
      return this.cartIsEmpty ? 0 : this.cartItems.reduce((acc, e) => acc + (e.product.regularPrice ? e.product.regularPrice: e.product.price) * e.qty, 0)
    },

    totalFormatPrice () {
      return formatPrice(this.total, this.currencySymbol)
    },

    totalFormatRegularPrice () {
      return formatPrice(this.totalRegular, this.currencySymbol)
    },

    formatedDiscountAmount () {
      return '- ' + formatPrice(this.discountAmount, this.currencySymbol)
    },

    discountAmount () {
      return this.totalRegular - this.total
    },

  },

  watch: {

  },

  methods: {
    ...mapMutations(['removeFromCart']),

    backToShop () {
      this.$router.go(-1)
    },
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cart-regular-price {
  text-decoration: strike-t
}
</style>
