<template>
  <v-card>
    <v-card-title >
      {{ item.title }}
    </v-card-title>
    <v-card-text>
      {{ item.content }}
    </v-card-text>
  </v-card>
</template>

<script>

export default {

  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
}
</script>
