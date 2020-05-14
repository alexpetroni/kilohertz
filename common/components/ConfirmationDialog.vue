<template>
  <v-dialog
    :value="confirmDialog"
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
</template>

<script>

export default {
  name: '',

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

  props:{
    confirmDialog: {
      type: Boolean,
      default: false,
    },

    confirmationMsg: {
      type: String,
      default: '?'
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

    }
  },

  computed: {

  },

  watch: {

  },

  methods: {
    onDialogConfirm () {
      this.$emit('confirm')
    },

    onDialogCancel () {
      this.$emit('cancel')
    }
  },


}
</script>
