<template>
  <div>
    <slot
    name="listing"
    v-bind="{editedItemId, listEvents, addNewItem, editItem }"
    >
      listing items
    </slot>

  <v-navigation-drawer
    v-model="openEditorDrawer"
    right
    clipped
    temporary
    fixed
  >
    <slot
    name="editor"
    v-bind="{editedItemId, updateEditedId, editorItem, editorEvents}"
    >
      item editor
    </slot>
  </v-navigation-drawer>
</div>
</template>

<script>


export default {
  name: 'listingWithSideEditor',

  components: {

  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: {

  },

  model: {

  },

  props: {
  },

  data () {
    return {
      editedItemId: null, // edited item id
      openEditorDrawer: false
    }
  },

  computed: {
    editorItem () {
      return {id: this.editedItemId }
    },

    editorEvents () {
      return { input: this.updateEditedId }
    },

    listEvents () {
      return {addNewItem: this.addNewItem, editItem: this.editItem}
    },
  },

  watch: {
    editedItemId: {
      handler (val) {
        this.openEditorDrawer = val !== null ? true : false
      },
      immediate: true
    },

    openEditorDrawer: function (val) {
      if(!val) {
        this.editedItemId = null
      }
    }
  },

  methods: {
    // listing events listeners
    addNewItem () {
      this.editedItemId = ""
      this.$emit('addNewItem')
    },

    editItem (val) {
      this.editedItemId = val
      this.$emit('editItem', val)
    },

    updateEditedId (val) {
      this.editedItemId = val
    }
  },


}
</script>
