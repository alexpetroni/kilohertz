<template>
  <ProductVariationEditor
    :id="id"
    :parentId="parentId"
    v-on="onEditorEvents"
  />
</template>

<script>
import ProductVariationEditor from '@/components/editors/ProductVariationEditor'


export default {
  components: {
    ProductVariationEditor,
  },

  data: () => ({
    id: null,
    parentId: null,
  }),

  computed: {
    onEditorEvents () {
      return {
        'item-deleted': this.showProduct,
        'cancel': this.showProduct,
      }
    },
  },

  watch: {
    '$route.params': {
      handler: function (val) {
        let { id, parentId } = val
        this.id = id
        this.parentId = parentId
      },
      immediate: true
    },
  },

  methods: {
    showProduct () {
      this.$router.push({path: `/product-edit/${this.parentId}`})
    },
  },
}
</script>
