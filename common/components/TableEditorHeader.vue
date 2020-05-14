<template>
  <v-card>
  <v-card-title>
    {{ title }}
    <v-spacer></v-spacer>
    <v-text-field
      :value="search"
      @input="onChange"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn
    v-if="!hideAddNewBtn"
    :disabled="disableAddNewBtn"
    @click="onAddNew"
    class="mx-1"
    fab
    small
    :color="btnColor"
    left
    title="Add new"
    >
     <v-icon small dark>mdi-plus</v-icon>
   </v-btn>
  </v-card-title>
</v-card>
</template>

<script>
export default {
  props: {
    search: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: ''
    },

    hideAddNewBtn: {
      type: Boolean,
      default: false,
    },

    disableAddNewBtn: {
      default: false,
    },

    btnColor: {
      type: String,
      default: 'primary'
    },
  },

  model: {
    prop: 'search',
  },

  methods: {
    onChange (val) {
      this.$emit('input', val)
    },

    onAddNew () {
      this.$emit('addNewItem')
    },
  },
}
</script>
