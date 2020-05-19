<template>
  <BrandsListEditor
    v-on="onEditorEvents"
  />
</template>

<script>
import BrandsListEditor from '@/components/editors/BrandsListEditor'

export default {
  components: {
    BrandsListEditor,
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
      this.$router.push({path: 'brand-edit'})
    },

    onEditItem (id) {
      this.$router.push({name: 'Brand', params: {id: id}})
    },
  },
}
</script>
