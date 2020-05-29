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

      <v-card-text class="pb-6 pt-6 text-center" v-html="message">
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
          @click="onDialogConfirm"
        >
          {{ yesBtnText }}
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  model: {
    prop: 'dialog'
  },

  props:{
    dialog: {
      type: Boolean,
      required: true,
    },

    message: {
      type: String,
      default: '?'
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

  computed: {
    open: {
      get: function () {
        return this.dialog
      },

      set: function (val) {
        this.$emit('input', !!val)
      }
    }
  },

  methods: {
    onDialogConfirm () {
      this.$emit('confirm')
      this.open = false
    },

    onClose () {
      this.$emit('cancel')
      this.open = false
    }
  },
}
</script>
