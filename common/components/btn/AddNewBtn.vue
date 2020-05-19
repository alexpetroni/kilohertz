<template>
  <v-btn
    :title="title"
    fab
    color="primary"
    top
    right
    absolute
    dark
    small
    @click="$emit('click')"
  >
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: "Add New"
      }
    }
  }
</script>
