<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" sm="4" md="2">
        <v-select
        :disabled="disabled"
        :items="actions"
        :label="selectLabel"
        return-object
        v-model="selected"
        >
        </v-select>
    </v-col>
    <v-col sm="4" md="2">
      <v-btn
      color="primary"
      :disabled="disabled"
      @click="applyBulk"
      class="mt-3 ml-3"
      >
      {{ applyBtnText }}
      </v-btn>
    </v-col>
    <v-col sm="4" md="8">
    <ConfirmationDialog
      v-model="confirmDialog"
      @confirm="onConfirm"
      @cancel="onCancel"
      v-bind="confirmOptions"
    />

    <v-dialog
      v-model="alertDialog"
      max-width="350"
    >
    <v-card>
      <v-card-title>
        {{ noBulkActionSelectedText }}
        <v-spacer />

        <v-icon
          aria-label="Close"
          @click="closeAlertDialog"
        >
          mdi-close
        </v-icon>
      </v-card-title>
      <v-card-text class="text-center">
          <v-btn
            class="mt-6"
            color="info"
            default
            @click="closeAlertDialog"
          >
            OK
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ConfirmationDialog from '@common/components/ConfirmationDialog'

export default {
  props: {
    actions: {
      type: Array,
      default: function () {
        return [
          {text: 'Delete', action: 'delete-items', confirmation: true, message: 'Delete selected items?'}
        ]
      }
    },

    disabled: {
      type: Boolean,
      default: true,
    },

    selectLabel: {
      type: String,
      default: 'Bulk Actions'
    },

    applyBtnText: {
      type: String,
      default: "Apply"
    },

    yesBtnText: {
      type: String,
    },

    noBtnText: {
      type: String,
    },

    noBulkActionSelectedText: {
      type: String,
      default: "Please select a bulk action."
    },
  },

  components: {
    ConfirmationDialog,
  },

  data () {
    return {
      selected: null,
      confirmDialog: false,
      alertDialog: false,
    }
  },

  computed: {
    confirmOptions () {
      if(!this.selected) return {}
      return Object.assign({}, {yesBtnText: this.yesBtnText, noBtnText: this.noBtnText}, this.selected)
    },
  },

  methods: {
    applyBulk () {
      if(!this.selected) {
        return this.alertDialog = true
      }

      if(this.selected.confirmation){
        return this.confirmDialog = true
      }
      this.$emit(this.selected.action)
      this.resetState()
    },

    onConfirm () {
      if(this.selected && this.selected.action){
        this.$emit(this.selected.action)
      }
      this.resetState()
    },

    onCancel () {
      this.resetState()
    },

    resetState () {
      this.selected = null
    },

    closeAlertDialog () {
      this.alertDialog = false
    }
  },

  watch: {
    disabled (val) {
      if(val) {
        this.resetState()
      }
    }
  }


}
</script>
