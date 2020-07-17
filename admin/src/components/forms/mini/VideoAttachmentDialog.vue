<template>
  <v-dialog
    v-model="open"
    :max-width="maxWidth"
  >
  <v-card>
    <v-card-title>
      <v-spacer />
      <v-icon
        aria-label="Close"
        @click="onClose"
      >
        mdi-close
      </v-icon>
    </v-card-title>

    <v-card-text class="pb-6 pt-6 text-center" >
      <v-text-field label="Video URL" v-model="editedItem.path" />
      <v-text-field label="Title" v-model="editedItem.title" />
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        class="mr-3"
        text
        @click="onClose"
      >
        {{ noBtnText }}
      </v-btn>


      <v-btn
        color="success"
        text
        :disabled="disabled"
        @click="onDialogConfirm"
      >
        {{ confirmBtnText }}
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>

<script>

import FormItemMixin from '@common/mixins/FormItemMixin'

export default {
  components: {

  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [ FormItemMixin ],

  model: {
    prop: 'dialog'
  },

  props: {
    dialog: {
      type: Boolean,
      required: true,
    },

    yesBtnText: {
      type: String,
      default: 'Yes'
    },

    noBtnText: {
      type: String,
      default: 'Nevermind'
    },

    maxWidth: {
      default: 400
    },
  },

  data () {
    return {

    }
  },

  computed: {
    open: {
      get: function () {
        return this.dialog
      },

      set: function (val) {
        this.$emit('input', !!val)
      }
    },

    confirmBtnText () {
      return this.isEditForm ? "Update Video" : "Add Video"
    },

    disabled () {
      return !this.editedItem.path 
    }
  },

  watch: {

  },

  methods: {
    onDialogConfirm () {
      this.isEditForm ? this.updateItem() : this.createItem()
      this.open = false
    },

    onClose () {
      this.$emit('cancel')
      this.open = false
    }
  },


}
</script>
