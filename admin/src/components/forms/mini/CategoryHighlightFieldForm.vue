<template>
  <v-card class="my-0">
    <v-btn
      title="Delete"
      color="error"
      class="mt-6"
      fab
      absolute
      top
      right
      icon
      x-small
      @click="$emit('delete')"
    >
      <v-icon
        small
      >
        mdi-close
      </v-icon>
    </v-btn>
    <v-card-text>
      <v-text-field
      v-model="item.title"
      label="Title"
      ></v-text-field>

      <v-textarea
      v-model="item.content"
      label="Description"
      ></v-textarea>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  model: {
    model: {
      prop: 'item',
    },
  },

  props: {
    item: {
      type: Object,
      required: true,
    }
  },
}
</script>
