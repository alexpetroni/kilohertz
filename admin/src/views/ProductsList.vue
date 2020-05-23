<template>
  <ProductsListEditor
    v-on="onEditorEvents"
  />
</template>

<script>
import ProductsListEditor from '@/components/editors/ProductsListEditor'

export default {
  components: {
    ProductsListEditor,
  },

  computed: {
    onEditorEvents () {
      return {
        'new-item': this.onNewItem,
        'edit-item': this.onEditItem,
      }
    },
  },

  methods: {
    onNewItem () {
      this.$router.push({path: 'product-edit'})
    },

    onEditItem (id) {
      this.$router.push({path: `product-edit/${id}`})
    },
  },
}
</script>
