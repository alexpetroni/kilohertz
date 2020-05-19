<template>
  <v-btn
    :title="title"
    color="error"
    class="ml-1"
    fab
    icon
    x-small

    @click="$emit('click')"
  >
    <v-icon
      small
    >
      mdi-close
    </v-icon>
  </v-btn>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: "Delete"
      }
    }
  }
</script>
