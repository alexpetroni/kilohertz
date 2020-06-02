<template>
  <CategoryMetaEditor
    :id="id"
    v-on="onEditorEvents"
  />
</template>

<script>
import CategoryMetaEditor from '@/components/editors/CategoryMetaEditor'
// import { groupEventsHandler } from '@common/utils'

export default {
  components: {
    CategoryMetaEditor,
  },

  data: () => ({
    id: null,
  }),

  computed: {
    onEditorEvents () {
      return {'cancel': this.showCategoryEditor }
      // const showList = groupEventsHandler(['item-created', 'item-updated', 'item-deleted', 'cancel'], this.showList)
      // const newItem = {'new-item': this.onNewItem }
      // const editCategoryMeta = {'edit-category-meta': this.onEditCategoryMeta }
      // return Object.assign({}, newItem, showList, editCategoryMeta)
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
    // showList () {
    //   this.$router.push({path: '/categories'})
    // },
    //
    // onNewItem () {
    //   this.$router.push({path: '/category-edit'})
    // },

    showCategoryEditor () {
      this.$router.push({path: `/category-edit/${this.id}`})
    },
  },
}
</script>
