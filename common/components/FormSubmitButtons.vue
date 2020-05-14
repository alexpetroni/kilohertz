<template>
  <v-card
  :class="cardClass"
  flat
  >
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
    v-if="isEditForm"
    @click="onUpdate()"
    :color="btnColor"
    :disabled="disabled"
    >
      {{ btnTextUpdate }}
    </v-btn>

    <v-btn
    v-else
    @click="onCreate()"
    :color="btnColor"
    :disabled="disabled"
    >
      {{ btnTextAdd }}
    </v-btn>
    <v-spacer></v-spacer>
  </v-card-actions>
  </v-card>
</template>

<script>
import { FormState,  isEditForm } from '@common/utils'

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
  },

  computed: {
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
  },


}
</script>
