<script>
import { isVariableProduct, productPriceObject } from '@common/utils'
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      requried: true,
    },
  },

  data () {
    return {
      qty: 1,
    }
  },

  computed: {
    ...mapState(['cartItems']),

    addToCartBtnDisabled () {
      return isVariableProduct(this.product) || isNaN(this.qty)  || this.qty < 1
    },

    alreadyInCart () {
      return !!this.cartItems.find(e => e.product.sku == this.product.sku)
    },

    on () {
      return {
        'change': this.onQtyChange,
      }
    }
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

    onQtyChange (val) {
      this.qty = isNaN(val) || parseInt(val) < 0 ? 1 : parseInt(val)
    }
  },

  render() {
      return this.$scopedSlots.default({
        priceObj: productPriceObject(this.product, this.qty),
        qty: this.qty,
        addToCartBtnDisabled: this.addToCartBtnDisabled,
        alreadyInCart: this.alreadyInCart,
        addToCart: this.addToCart,
        on: this.on
      })
  }
}
</script>
