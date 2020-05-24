<template>
  <ProductEditor
    :id="id"
    v-on="onEditorEvents"
  />
</template>

<script>
import ProductEditor from '@/components/editors/ProductEditor'
import { groupEventsHandler } from '@common/utils'

export default {
  components: {
    ProductEditor,
  },

  data: () => ({
    id: null,
  }),

  computed: {
    onEditorEvents () {
      const showList = groupEventsHandler(['item-deleted', 'cancel'], this.showList)
      const newItem = {'new-item': this.onNewItem }
      const itemCreated = {'item-created': this.onItemCreated}
      return Object.assign({}, newItem, itemCreated, showList)
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
  },
}
</script>
