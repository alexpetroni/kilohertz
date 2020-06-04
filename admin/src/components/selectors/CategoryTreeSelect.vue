<template>
    <v-treeview
      v-if="hasItems"
      v-model="selection"
      :items="items"
      selectable
    ></v-treeview>
</template>

<script>
import Categories from '@common/graphql/category/Categories.gql'

export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    },
  },

  model: {
    prop: 'categories',
    event: 'change'
  },

  data () {
    return {
      items: [],
    }
  },

  computed: {
    selection: {
      get () {
        return this.categories
      },

      set (val) {
        this.$emit('change', val)
      }
    },

    hasItems () {
      return this.items.length
    },
  },

  apollo: {
    items: {
      query: Categories,
      fetchPolicy: 'network-only',
      update: (data) => data.categories
    }
  },
}
</script>
