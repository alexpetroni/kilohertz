<template>
  <div>
  <v-tooltip bottom
  v-for="(p, index) in items"
  :key="index"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-img
      v-if="p.image"
      v-bind="attrs"
      v-on="on"
      :src="p.image"
      class="card-icon-preview mx-2 mt-2"
      />

    </template>
    <span>{{ p.title }}</span>
  </v-tooltip>
  </div>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      default: () => [] // [{title,  , image,  description}, ... ]
    },
  },
}
</script>
