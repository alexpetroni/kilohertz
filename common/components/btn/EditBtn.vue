<template>
  <v-btn
    :title="title"
    :color="color"
    class="ml-1"
    fab
    icon
    x-small
    :disabled="disabled"
    @click="$emit('click')"
  >
    <v-icon
      small
    >
      mdi-pencil
    </v-icon>
  </v-btn>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: "Edit"
      },

      disabled: {
        type: Boolean,
        default: false,
      }
    },

    computed: {
      color () {
        return this.disabled ? "grey" : "success"
      }
    }
  }
</script>
