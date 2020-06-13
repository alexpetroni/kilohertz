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

            </template> <!-- cart not empty -->
          </v-container>

          <v-card-actions>
            <v-spacer />
            <v-btn @click="backToShop">Entdecke mehr</v-btn>
            <v-spacer />
            <v-btn :disabled="cartIsEmpty">Zur Kasse</v-btn>
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
    ...mapState(['cartItems']),

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
    }

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

</style>
