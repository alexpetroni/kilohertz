<template>
  <FamiliesListEditor
    v-on="onEditorEvents"
  />
</template>

<script>
import FamiliesListEditor from '@/components/editors/FamiliesListEditor'

export default {
  components: {
    FamiliesListEditor,
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
      this.$router.push({path: 'family-edit'})
    },

    onEditItem (id) {
      this.$router.push({path: `family-edit/${id}`})
    },
  },
}
</script>
