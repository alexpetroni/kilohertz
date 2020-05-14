<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="date"
        :label="label"
        prepend-icon="mdi-calendar"
        :disabled="disabled"
        :clearable="clearable"
        :dense="dense"
        @click:clear="onClear"
        readonly
        v-on="on"
      ></v-text-field>
    </template>

    <v-date-picker
    :value="date"
    @input="onInput">
  </v-date-picker>
  </v-menu>
</template>

<script>

export default {
  model: {
    prop: 'date',
    event: 'change'
  },

  props: {
    date: {
      type: String,
      default: new Date().toISOString().substr(0, 10)
    },

    label: {
      type: String,
      default: "Choose Date"
    },

    clearable: {
      type: Boolean,
      default: false,
    },

    dense: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

  },

  data () {
    return {
      menu: false
    }
  },

  computed: {

  },

  watch: {

  },

  methods: {
    onInput (val) {
      this.$emit('change', val)
      this.menu = false
    },

    onClear () {
      if(this.clearable){
        this.$emit('change', null)
      }
    },
  },


}
</script>
