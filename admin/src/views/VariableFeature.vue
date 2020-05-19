<template>
  <VariableFeatureSetEditor
    :id="id"
    v-on="onEditorEvents"
  />
</template>

<script>
import VariableFeatureSetEditor from '@/components/editors/VariableFeatureSetEditor'
import { groupEventsHandler } from '@common/utils'

export default {
  components: {
    VariableFeatureSetEditor,
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
      this.$router.push({path: '/variable-features'})
    },

    onNewItem () {
      this.$router.push({path: '/variable-feature-edit'})
    },
  },
}
</script>
