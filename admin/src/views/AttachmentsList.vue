<template>
  <AttachmentsListEditor
    v-on="onEditorEvents"
  />
</template>

<script>
import AttachmentsListEditor from '@/components/editors/AttachmentsListEditor'

export default {
  components: {
    AttachmentsListEditor,
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
      this.$router.push({path: 'attachment-edit'})
    },

    onEditItem (id) {
      this.$router.push({path: `attachment-edit/${id}`})
    },
  },
}
</script>
