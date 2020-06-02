<template>
  <CategoryEditor
    :id="id"
    v-on="onEditorEvents"
  />
</template>

<script>
import CategoryEditor from '@/components/editors/CategoryEditor'
import { groupEventsHandler } from '@common/utils'

export default {
  components: {
    CategoryEditor,
  },

  data: () => ({
    id: null,
  }),

  computed: {
    onEditorEvents () {
      const showList = groupEventsHandler(['item-created', 'item-updated', 'item-deleted', 'cancel'], this.showList)
      const newItem = {'new-item': this.onNewItem }
      const editCategoryMeta = {'edit-category-meta': this.onEditCategoryMeta }
      return Object.assign({}, newItem, showList, editCategoryMeta)
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
      this.$router.push({path: '/categories'})
    },

    onNewItem () {
      this.$router.push({path: '/category-edit'})
    },

    onEditCategoryMeta () {
      this.$router.push({path: `/category-meta-edit/${this.id}`})
    },
  },
}
</script>
