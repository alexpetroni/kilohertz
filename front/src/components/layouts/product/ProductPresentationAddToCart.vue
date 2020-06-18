<template>
  <v-card flat color="transparent">
    <v-card-actions>
      <v-spacer />
    <ProductPresentationPrice
    :product="product"
    :quantity="qty"
    />
    <div class="d-flex" style="width: 6em;">
    <v-text-field
        label="Qty."
        type="number"
        v-model.number="qty"
        class="mx-4"
      ></v-text-field>
    </div>

      <v-btn
      :disabled="disabledBtn"
      @click="addToCart({product, qty})"
      color="primary"
      >
      Add to Cart
      <v-icon right dark v-if="alreadyInCart">mdi-check</v-icon>
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ProductPresentationPrice from '@/components/layouts/product/ProductPresentationPrice'
import { isVariableProduct } from '@common/utils'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    ProductPresentationPrice,
  },

  props: {
    product: {
      type: Object,
    }
  },

  data () {
    return {
      qty: 1,
    }
  },

  computed: {
    ...mapState(['cartItems']),

    disabledBtn () {
      return isVariableProduct(this.product) || isNaN(this.qty)  || this.qty < 1
    },

    alreadyInCart () {
      return !!this.cartItems.find(e => e.product.sku == this.product.sku)
    },
  },

  watch: {
    product: function (val) {
      // syc quantity with the one in cart
      let inCart = this.cartItems.find(e => e.product.sku == val.sku)
      this.qty = inCart ? inCart.qty : 1
    },
  },

  methods: {
    ...mapMutations(['addToCart']),
  },


}
</script>
