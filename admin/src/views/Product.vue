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
      const showList = groupEventsHandler(['item-created', 'item-updated', 'item-deleted', 'cancel'], this.showList)
      const newItem = {'new-item': this.onNewItem }
      return Object.assign({}, newItem, showList)
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
  },
}
</script>
