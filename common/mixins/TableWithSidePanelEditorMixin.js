/* TableWithSidePanelEditorMixin - extend TableEditorMixin with methods and listeners for an ItemEditor that is in a side panel */
import TableEditorMixin from '@common/mixins/TableEditorMixin'

const mix = {
  mixins: [ TableEditorMixin ],

  data: function () {
    return {
      editedItemId: '',
      openEditorDrawer: false,
    }
  },

  methods: {
    onAddNew () {
      this.editedItemId = ''
      if(!this.openEditorDrawer){
        this.openEditorDrawer = true
      }
      this.$emit('add-new')
    },

    editItem (id) {
      this.editedItemId = id
      if(!this.openEditorDrawer){
        this.openEditorDrawer = true
      }
      this.$emit('edit', id)
    },

    onNewItemAdded (item) {
      this.editedItemId = item.id
      this.showTableFirstPage()
    },

    onItemUpdated (item) {
      this.refetchQuery()
    },

    onItemDeleted (id) {
      this.closeEditorDrawer()
      this.refetchQuery()
    },

    closeEditorDrawer () {
      if(this.openEditorDrawer){
        this.openEditorDrawer = false
      }
    },
  },

  watch: {
    'openEditorDrawer': function (val) {
      // it will reset the editedItemId even if the drawer will close by clicking outside
        if(!val){
          this.editedItemId = ''
      }
    }
  }

}

export default mix
