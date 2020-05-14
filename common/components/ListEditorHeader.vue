<template>
  <v-card flat color="rgb(255, 0, 0, 0)">
    <v-toolbar flat color="rgb(255, 0, 0, 0)">
    <v-toolbar-title v-if="title">{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-text-field
    :value="search"
    @input="onChange"
      :label="searchLabel"
      color="secondary"
      hide-details
      style="max-width: 450px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

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
    :title="btnTitle"
    dark
    >
     <v-icon small dark>mdi-plus</v-icon>
   </v-btn>

  </v-toolbar>
  <!-- <v-card-title>
    {{ title }} -->



    <!-- <v-text-field
      :value="search"
      @input="onChange"
      append-icon="mdi-magnify"
      :label="searchLabel"
      single-line
      hide-details
    ></v-text-field> -->
    <!-- <v-spacer></v-spacer>
    <v-btn
    v-if="!hideAddNewBtn"
    :disabled="disableAddNewBtn"
    @click="onAddNew"
    class="mx-1"
    fab
    small
    :color="btnColor"
    left
    :title="btnTitle"
    >
     <v-icon small dark>mdi-plus</v-icon>
   </v-btn>
  </v-card-title> -->
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

    searchLabel: {
      type: String,
      default: 'Search'
    },

    btnTitle: {
      type: String,
      default: 'Add New'
    }
  },

  model: {
    prop: 'search',
  },

  methods: {
    onChange (val) {
      this.$emit('input', val)
    },

    onAddNew () {
      this.$emit('add-new-item')
    },
  },
}
</script>
