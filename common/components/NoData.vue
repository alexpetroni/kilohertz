<template>
  <div class="text-center pa-12">
    <div class="title">{{ title }}</div>
    <div v-if="subtitle" class="subtitle-2">{{ subtitle }}</div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: 'No items found.'
    },

    subtitle: {
      default: 'Click on the "+" button to add one.'
    },
  },
}
</script>
