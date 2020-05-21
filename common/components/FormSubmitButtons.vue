<template>
  <v-card
  :class="cardClass"
  flat
  >
  <v-card-actions>
    <v-spacer></v-spacer>

    <v-btn
    v-if="isNewForm"
    @click="onCreate()"
    :color="btnColor"
    :disabled="disabled"
    :text="textBtn"
    :outlined="outlined"
    >
      {{ btnTextAdd }}
    </v-btn>

    <v-btn
    v-else
    @click="onUpdate()"
    :color="btnColor"
    :disabled="disabled"
    :text="textBtn"
    :outlined="outlined"
    >
      {{ btnTextUpdate }}
    </v-btn>

    <v-btn
    v-if="cancelBtn"
    @click="onCancel()"
    :color="btnColor"
    :text="textBtn"
    :outlined="outlined"
    >
      {{ btnTextCancel }}
    </v-btn>


    <v-spacer></v-spacer>
  </v-card-actions>
  </v-card>
</template>

<script>
import { FormState,  isEditForm, isNewForm } from '@common/utils'

export default {
  props: {
    formState: {
      type: String,
      default: FormState.NEW
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    btnColor: {
      type: String,
      default: 'primary'
    },

    cardClass: {
      type: String,
      default: 'pb-4 mt-4'
    },

    btnTextAdd: {
      type: String,
      default: "Add"
    },

    btnTextUpdate: {
      type: String,
      default: "Update"
    },

    btnTextCancel: {
      type: String,
      default: "Cancel"
    },

    cancelBtn: {
      type: Boolean,
      default: false
    },

    textBtn: {
      type: Boolean,
      default: false
    },

    outlined: {
      type: Boolean,
      default: false
    },
},

  computed: {
    isNewForm () {
      return isNewForm(this.formState)
    },

    isEditForm () {
      return isEditForm(this.formState)
    },
  },

  methods: {
    onCreate () {
      this.$emit('create-item')
    },

    onUpdate () {
      this.$emit('update-item')
    },

    onCancel () {
      this.$emit('cancel')
    }
  },


}
</script>
