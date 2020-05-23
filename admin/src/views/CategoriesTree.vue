<template>
  <CategoriesTreeEditor
    v-on="onEditorEvents"
  />
</template>

<script>
import CategoriesTreeEditor from '@/components/editors/CategoriesTreeEditor'

export default {
  components: {
    CategoriesTreeEditor,
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
      this.$router.push({path: 'category-edit'})
    },

    onEditItem (id) {
      this.$router.push({path: `category-edit/${id}`})
    },
  },
}
</script>
