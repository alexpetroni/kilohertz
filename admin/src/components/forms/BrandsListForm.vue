<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      inline
      icon="mdi-clipboard-text"
      title="Brands List"
      class="px-5 py-3"
    >

    <v-data-table
      :headers="headers"
      :items="items"
      :multiSort="false"
      :server-items-length="totalItems"
      v-on="formEvents"
    />
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },

    options: {
      type: Object,
      default: () => {}
    },

    totalItems: {
      type: Number,
      default: 0,
    },

    formEvents: {
      type: Object,
      default: () => {}
    },
  },

  data () {
    return {
      search: '',
      headers: [
              {
                text: 'Name',
                value: 'name',
              },
              {
                text: 'Calories',
                value: 'calories',
              },
              {
                text: 'Office',
                value: 'office',
              },
              {
                text: 'Age',
                value: 'age',
              },
              {
                text: 'Date',
                value: 'date',
              },
              {
                sortable: false,
                text: 'Actions',
                value: 'actions',
              },
            ],
    }
  },

  methods: {
    onUpdate (da) {
      console.log('da %o', da)
    },

    myOn (val) {
      console.log('myOn %o', val)
    }
  }
}
</script>
