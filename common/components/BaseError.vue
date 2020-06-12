<template>
  <v-alert v-if="error" type="error">
    {{ error }}
  </v-alert>
</template>

<script>

export default {
  props: {
    error: {
      type: String
    }
  },
}
</script>
