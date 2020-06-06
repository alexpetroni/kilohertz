<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    hide-no-data
    item-text="name"
    item-value="id"
    label="Products Search"
    placeholder="Start typing to Search"
    prepend-icon="mdi-database-search"
  ></v-autocomplete>
</template>

<script>
import SearchProducts from '@common/graphql/product/SearchProducts.gql'

export default {
  props: {

  },

  model: {

  },

  data () {
    return {
      model: null,
      items: [],
      search: '',
    }
  },

  computed: {
    isLoading () {
      return this.$apollo.queries.items.loading
    }
  },

  apollo: {
    items: {
      query: SearchProducts,
      variables: function () {
        return { args: {search: this.search } }
      },
      fetchPolicy: 'network-only',
      update: (data) => {
        return data.searchProducts
      },
      debounce: 200,
      skip () {
        return !this.search
      }
    }
  },

  methods: {
    onSelected (val) {
      this.$emit('selected', val)
      this.search = ''
    },

    clear () {
      this.model = null
      this.search = ''
      this.items = []
    },
  },

  watch: {
    model: function (val) {
      if(val) {
        this.$emit('selected', val)
        this.clear()
      }
    }
  }


}
</script>
