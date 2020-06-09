<template>
  <AttachmentEditor
    :id="id"
    v-on="onEditorEvents"
  />
</template>

<script>
import AttachmentEditor from '@/components/editors/AttachmentEditor'
import { groupEventsHandler } from '@common/utils'

export default {
  components: {
    AttachmentEditor,
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
      this.$router.push({path: '/attachments'})
    },

    onNewItem () {
      this.$router.push({path: '/attachment-edit'})
    },
  },
}
</script>
