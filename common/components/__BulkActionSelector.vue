<template>
  <div>
    <v-card flat>
      <v-card-actions>
  <v-select
  :disabled="disabled"
  :items="actions"
  :label="selectLabel"
  dense
  return-object
  v-model="selected"
  >
  </v-select>
<v-spacer> </v-spacer>
  <v-btn
  small
  :disabled="disabled"
  color="primary"
  @click="applyBulkAction">
    {{btnLabel}}
  </v-btn>
</v-card-actions>
</v-card>

<v-dialog
  v-model="confirmDialog"
  :width="dialogWidth"
>
  <v-card>
    <v-card-text>
      <p class="title pt-5">
        {{ confirmationMsg }}
      </p>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        @click="onDialogCancel"
      >
        {{dialogNoBtn}}
      </v-btn>

      <v-btn
        color="primary"
        text
        @click="onDialogConfirm"
      >
        {{dialogYesBtn}}
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<v-dialog
 v-model="selectedActionDialog"
 :width="dialogWidth"
 >
 <v-card>
      <v-card-text>
      <p class="title pt-5">
          Please select an action.
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="selectedActionDialog = false"
        >
          OK
        </v-btn>
      </v-card-actions>
  </v-card>
</v-dialog>

</div>
</template>

<script>
export default {
  props: {
    actions: {
      type: Array,
      default: function () {
        return [
          {action: 'delete', text: 'Delete', confirmation: true, confirmationMsg: 'Delete selected items?'}
        ]
      }
    },

    disabled: {
      type: Boolean,
      default: true,
    },

    btnLabel: {
      type: String,
      default: 'Apply'
    },

    selectLabel: {
      type: String,
      default: 'Bulk Actions'
    },

    dialogYesBtn: {
      type: String,
      default: 'Yes'
    },

    dialogNoBtn: {
      type: String,
      default: 'Cancel'
    },

    dialogWidth: {
      default: 350
    }
  },

  data () {
    return {
      selected: null,
      confirmDialog: false,
      selectedActionDialog: false,
    }
  },

  computed: {
    confirmationMsg () {
      if(this.selected && this.selected.confirmationMsg){
        return this.selected.confirmationMsg
      }
      return ''
    }
  },

  methods: {
    applyBulkAction () {
      if(!this.selected) {
        this.selectedActionDialog = true
        return
      }

      if(this.selected.confirmation && this.selected.confirmationMsg){
        this.confirmDialog = true
      }else{
        this.fireSelectedAction()
      }
    },

    fireSelectedAction () {
      if(this.selected && this.selected.action){
        this.$emit('bulkAction', this.selected.action)
      }
    },

    onDialogConfirm () {
      this.fireSelectedAction()
      this.resetState()
    },

    onDialogCancel () {
      this.resetState()
    },

    resetState () {
      this.confirmDialog = false
      this.selected = null
    }
  },


}
</script>
