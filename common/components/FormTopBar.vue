<template>
    <v-toolbar
        color="transparent"
        flat
         >
           <slot
           name="left"
           v-if="!hideLeftSlot"
           v-bind="{
             isNewForm,
             isEditForm,
             btnColor,
           }"
           >
                <v-icon
                @click="onBack()"
                class="mx-2"
                small
                :color="btnColor"
                left
                :title="backIconTitle"
                >
                {{ backIcon }}
              </v-icon>
            </slot>
            <v-spacer></v-spacer>
            <v-toolbar-title v-html="title"></v-toolbar-title>
            <v-spacer></v-spacer>

            <slot
            name="right"
            v-if="!hideRightSlot"
            v-bind="{
              isNewForm,
              isEditForm,
              btnColor,
            }"
            >

               <v-icon
               v-if="!hideDeleteBtn"
               :disabled="disableDeleteBtn"
               @click="onDelete()"
               class="mx-2"
               small
               :color="btnColor"
               right
               title="Delete"
               >
                mdi-delete
              </v-icon>

             <v-menu
             bottom
             v-if="hasMenuItems">
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="btnColor"
                    :disabled="rightMenuDisabled"
                    icon
                    text
                    v-on="on"
                  >
                    <v-icon
                    small
                    :color="btnColor"
                    >mdi-dots-vertical
                    </v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    v-for="(item, i) in compMenuItems"
                    :key="i"
                    @click="$emit(item.emit)"
                    :disabled="item.disabled"
                  >
                    <v-list-item-icon v-if="useMenuIcons">
                      <v-icon
                      small
                      color="accent"
                      v-text="item.icon"
                      :disabled="item.disabled"
                      >
                      </v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
          </slot>

          <ConfirmationDialog
          v-model="confirmDialog"
          v-bind="confirmOptions"
          @confirm="confirmDelete"
          @cancel="cancelDelete"
          />
        </v-toolbar>

</template>

<script>
import ConfirmationDialog from '@common/components/ConfirmationDialog'

import {
  FormState,
  isNewForm,
  isEditForm,
  } from '@common/utils'

export default {

  components: {
    ConfirmationDialog,
  },

  props: {
    formState: {
      type: String,
      default: FormState.NEW
    },

    name: { // name of the edited item
      type: String,
    },

    error: {
      type: String,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    backIcon: {
      type: String,
      default: 'mdi-chevron-left'
    },

    backIconTitle: {
      type: String,
      default: 'Back to list'
    },

    hideLeftSlot: {
      type: Boolean,
      default: false,
    },

    hideRightSlot: {
      type: Boolean,
      default: false,
    },

    hideDeleteBtn: {
      type: Boolean,
    },

    btnColor: {
      type: String,
      default: 'white'
    },

    menuBtnColor: {
      type: String,
      default: 'dark-grey'
    },

    editTitle: {
      type: String,
      default: 'Edit'
    },

    addNewTitle: {
      type: String,
      default: 'Add New'
    },

    requireDeleteConfirmation: {
      type: Boolean,
      default: true,
    },

    deleteConfirmationMsg: {
      type: String,
      default: "Do you want to delete this item?"
    },

    menuItems: {
      type: Array,
      default: () => [
        {title: "Add new", emit: 'new-item', icon: "mdi-plus", disabled: "new"},
        {title: "Reload", emit: 'reload-item', icon: "mdi-reload"},
      ]
    },

    useMenuIcons: {
      type: Boolean,
      default: true,
    },

    rightMenuDisabled: {
      type: Boolean,
      default: false,
    },

  },

  data () {
    return {
      confirmDialog: false,
    }
  },

  computed: {
    isNewForm () {
      return isNewForm(this.formState)
    },

    isEditForm () {
      return isEditForm(this.formState)
    },

    disableAddNewBtn () {
      return this.isNewForm
    },

    disableReloadBtn () {
      return false
    },

    disableDeleteBtn () {
      return this.isNewForm
    },

    title () {
      if(isEditForm(this.formState)){
        return this.name ? this.editTitle + ' ' + this.name : this.editTitle
      }else{
        return this.addNewTitle
      }
    },

    hasMenuItems () {
      return this.menuItems && this.menuItems.length
    },

    compMenuItems () {
      if(!this.hasMenuItems) return []
      return this.menuItems.map(e => {
        if(e.disabled){
          let disabled = e.disabled == this.formState
          return Object.assign({}, e, {disabled: disabled})
        }
        return e
      })
    },

    confirmOptions () {
      return {
        message: this.deleteConfirmationMsg,
      }
    },
  },

  methods: {
    onBack () {
      this.$emit('cancel')
    },

    onAddNew () {
      this.$emit('new-item')
    },

    onDelete () {
      this.requireDeleteConfirmation ? this.confirmDialog = true : this.$emit('delete-item')
    },

    onReload () {
      this.$emit('reload-item')
    },

    closeConfirmDeleteDialog () {
      this.confirmDialog = false
    },

    confirmDelete () {
      this.closeConfirmDeleteDialog()
      this.$emit('delete-item')
    },

    cancelDelete () {
      this.closeConfirmDeleteDialog()
    }
  },


}
</script>
