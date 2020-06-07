<template>
  <ProductEditor
    :id="id"
    v-on="onEditorEvents"
  />
</template>

<script>
import ProductEditor from '@/components/editors/ProductEditor'

export default {
  components: {
    ProductEditor,
  },

  data: () => ({
    id: null,
  }),

  computed: {
    onEditorEvents () {
      return {
        'item-deleted': this.showList,
        'cancel': this.showList,
        'new-item': this.onNewItem,
        'item-created': this.onItemCreated,
        'edit-variation': this.onEditVariation,
      }
    },
  },

  watch: {
    '$route.params.id': {
      handler: function (val) {
        this.id = val
      },
      immediate: true
    },
  },

  methods: {
    showList () {
      this.$router.push({path: '/products'})
    },

    onNewItem () {
      this.$router.push({path: '/product-edit'})
    },

    onItemCreated (item) {
      this.$router.push({path: `/product-edit/${item.id}`})
    },

    onEditVariation (val) {
      let {id, parentId} = val
      this.$router.push({path: `/product-variation-edit/${id}/${parentId}`})
    },
  },
}
</script>
