<template>
  <VariableFeatureSetsListEditor
    v-on="onEditorEvents"
  />
</template>

<script>
import VariableFeatureSetsListEditor from '@/components/editors/VariableFeatureSetsListEditor'

export default {
  components: {
    VariableFeatureSetsListEditor,
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
      this.$router.push({path: 'variable-feature-edit'})
    },

    onEditItem (id) {
      this.$router.push({path: `variable-feature-edit/${id}`})
    },
  },
}
</script>
