<template>
  <v-btn
    :title="title"
    color="success"
    class="ml-1"
    fab
    icon
    x-small
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
      }
    }
  }
</script>
