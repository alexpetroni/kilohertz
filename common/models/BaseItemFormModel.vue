<script>
import FormStateMixin from '@common/mixins/FormStateMixin'
import ErrorMixin from '@common/mixins/ErrorMixin'
import * as utils from '@common/utils'

export default {
  mixins: [FormStateMixin, ErrorMixin],

  model: {
    prop: 'id',
    event: 'change'
  },

  props: {
    id: {
      type: String,
    },

    busEventName: {
      type: [String, Array],
    },

    reloadAfterCreate: {
      type: Boolean,
      default: false
    },

    reloadAfterUpdate: {
      type: Boolean,
      default: false
    },
  },

  data () {
    return {
      item: this.getDefaultItem(),
      loading: false,
      createdItem: null, // used as value/flag in setupCurrentItem after an item was created and avoid reloading
    }
  },

  computed: {
    formEvents () {
      return {
        'create-item': this.onCreateItem,
        'update-item': this.onUpdateItem,
        'delete-item': this.onDeleteItem,
        'reload-item': this.onReloadItem,
        'new-item': this.onNewItem,
      }
    },

    modelState () {
      return {
        error: this.error,
        loading: this.loading,
        formState: this.formState,
      }
    },
  },

  watch: {
    'id': {
      handler: function () { this.setupCurrentItem() },
      immediate: true,
    }
  },

  methods: {
    getDefaultItem () {
      throw new Error ("getDefaultItem() should be overwritten in component")
    },

    // hooks that can be rewriten in cases when parentId document is needed, or the document does not have an id field as UID
    itemKey () {
      return {id: this.id}
    },

    itemFullKey () {
      return this.parentKey() ? { ...this.itemKey() , ...this.parentKey() } : this.itemKey()
    },

    parentKey () {
      return null
    },

    extractItemKey (item) {
      // console.log('extractItemKey item %o', item)
      return item ? item.id : null
    },

    eventBusEmit (event, val) {
      if(this.busEventName) {
        if(Array.isArray(this.busEventName)){
          this.busEventName.forEach(e => utils.EventBus.$emit(e + '-' + event, val))
        }else{
          utils.EventBus.$emit(this.busEventName + '-' + event, val)
          // console.log('~~~~~ utils.EventBus ~~~~~ %s', this.busEventName + '-' + event)
        }
      }
    },

    removeTypenameFromInput (input) {
      return utils.deleteObjField(input, '__typename')
    },

    itemError (msg) {
      this.setError(msg)
      this.$emit('error', msg)
    },

    notifiy(event, value){
      this.$emit(event, value)
      this.eventBusEmit(event, value)
    },

    // return an object that contain only the fields that are specified in defaultItem with values (if exists) from the 'item'
    parseItemToMirrorDefaultModel (item) {
      return utils.isAnObject(item) ? utils.mergeObjectsToLeft(this.getDefaultItem(), item) : item
    },

    // hook for parsing editedItem for input
    // parseItemForInput (item) {
    //   return item
    // },

    // --------------- Async services that should be overwritten in components ---------------
    async createItem (item, key) {
      console.log('createItem item %o, key %o', item, key )
      throw new Error("createItem() should be overwritten in child component.")
    },

    async loadItem (key, fetchPolicy) {
      console.log('loadItem key %o fetchPolicy %s', key, fetchPolicy )
      throw new Error("loadItem() should be overwritten in child component.")
    },

    async updateItem (item, key) {
      console.log('updateItem item %o, key %o', item, key )
      throw new Error("updateItem() should be overwritten in child component.")
    },

    async deleteItem (key) {
      console.log('deleteItem key %o', key )
      throw new Error("deleteItem() should be overwritten in child component.")
    },


    // --------------- Events listeners ---------------
    onNewItem () {
      // console.log('onNewItem')
      this.$emit('new-item')
      this.$emit('change', null)
    },

    async onCreateItem (val) {
      // console.log('onCreateItem %o', val)
      this.clearError()
      this.loading = true
      try{
        const result = await this.createItem(val, this.parentKey()) // key is provided in case the item has a parent document whos id should be provided
        const id = this.extractCreatedItemId(result)

        if(!id){
          throw new Error("No item key provided in createItem result.")
        }

        this.$emit('change', id)
        this.notifiy('item-created', this.parseItemCreatedNotify(result))

        this.createdItem = this.reloadAfterCreate ? null : this.parseCreateResult(result)
      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.loading = false
      }
    },

    async onUpdateItem (val) {
      // console.log('onUpdateItem %o', val)
      this.clearError()
      this.loading = true
      try{
        const result = await this.updateItem(val, this.itemFullKey())

        this.notifiy('item-updated', this.parseItemUpdatedNotify(result))

        if(this.reloadAfterUpdate){
          return this.refreshItem() // return here because 'loading' should remain true
        }else{
          this.item = this.parseUpdateResult(result)
        }
      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.loading = false
      }
    },

    async onDeleteItem () {
      // console.log('onDeleteItem()')
      this.clearError()
      this.loading = true
      try{
        await this.deleteItem(this.itemFullKey())
        this.notifiy('item-deleted', this.itemFullKey())
        this.$emit('change', null)
      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.loading = false
      }
    },

    onReloadItem () {
      // console.log('onReloadItem')
      this.refreshItem('network-only')
    },

    //
    async loadItemForCurrentId (fetchPolicy) {
      // console.log('loadItemForCurrentId() fetchPolicy %s', fetchPolicy)
      this.clearError()
      this.loading = true
      try{
        const result = await this.loadItem(this.itemFullKey(), fetchPolicy)
        if(!result) {
          throw new Error("No item found for this id")
        }
          // console.log('.... itemLoaded  %o', this.item)
        this.setEditedItem(this.parseLoadResult(result))
        this.notifiy('item-loaded', this.id)
      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.loading = false
      }
    },

    setupCurrentItem (fetchPolicy) {
      if(this.id){
        // if it is after an create item and
        if(!this.reloadAfterCreate && this.createdItem && this.extractItemKey(this.createdItem) == this.id) {
          this.setEditedItem(this.createdItem)
          this.createdItem = null
          // console.log('set from createdItem after creation')
        } else {
          this.loadItemForCurrentId(fetchPolicy)
          // console.log('reloaded item after creation')
        }
      }else{
        this.setDefaultItem()
      }
    },

    refreshItem (fetchPolicy = 'network-only') {
      this.id ? this.loadItemForCurrentId(fetchPolicy) : this.setDefaultItem()
    },

    setDefaultItem () {
      this.item = this.getDefaultItem()
      this.setNewFormState()
    },

    setEditedItem (item) {
      this.item = item
      this.setEditFormState()
      // console.log('setEditedItem this.formState %s', this.formState)
    },

    // --------------- Result parsers ---------------
    parseCreateResult (result) {
      return this.parseItemToMirrorDefaultModel(result)
    },

    parseLoadResult (result) {
      return this.parseItemToMirrorDefaultModel(result)
    },

    parseUpdateResult (result) {
      return this.parseItemToMirrorDefaultModel(result)
    },

    // --------------- notifications parsers ---------------
    parseItemCreatedNotify (result) {
      return this.parentKey() ? Object.assign({}, result, this.parentKey()) : result
    },

    parseItemUpdatedNotify (result) {
      return this.parentKey() ? Object.assign({}, result, this.parentKey()) : result
    },

    // --------------- Helpers ---------------
    extractCreatedItemId (item) {
      return this.extractItemKey(item)
    },

    // hook for adding aditional slot params
    extraSlotParams () {
      return {}
    },

    slotParams () {
      const params = {
        item: this.item,
        formEvents: this.formEvents,
        modelState: this.modelState,
      }
      const extraParams = this.extraSlotParams()
      return Object.assign({}, params, extraParams)
    },
  },

  render() {
      return this.$scopedSlots.default(this.slotParams())
  }
}
</script>
