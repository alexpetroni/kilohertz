<template>
  <FamilyEditor
    :id="id"
    v-on="onEditorEvents"
  />
</template>

<script>
import FamilyEditor from '@/components/editors/FamilyEditor'
import { groupEventsHandler } from '@common/utils'

export default {
  components: {
    FamilyEditor,
  },

  data: () => ({
    id: null,
  }),

  computed: {
    onEditorEvents () {
      const showList = groupEventsHandler(['item-updated', 'item-deleted', 'cancel'], this.showList)
      const showEditor = {'item-created': this.onItemCreated }
      const newItem = {'new-item': this.onNewItem }
      return Object.assign({}, newItem, showEditor, showList)
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
      this.$router.push({path: '/families'})
    },

    onNewItem () {
      this.$router.push({path: '/family-edit'})
    },

    onItemCreated (item) {
      this.$router.push({path: `/family-edit/${item.id}`})
    },
  },
}
</script>
