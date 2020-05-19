<template>
  <BrandEditor
    :id="id"
    v-on="onEditorEvents"
  />
</template>

<script>
import BrandEditor from '@/components/editors/BrandEditor'
import { groupEventsHandler } from '@common/utils'

export default {
  components: {
    BrandEditor,
  },

  data: () => ({
    id: null,
  }),

  computed: {
    onEditorEvents () {
      const showList = groupEventsHandler(['item-created', 'item-updated', 'item-deleted', 'cancel'], this.showList)
      console.log('showList %o', showList)
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
      this.$router.push({path: '/brands'})
    },

    onNewItem () {
      this.$router.push({path: '/brand-edit'})
    },
  },

  created () {
    console.log('BrandsLIST Created')
  },
}
</script>
