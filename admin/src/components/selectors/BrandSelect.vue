<template>
  <v-select
  :items="items"
  :value="brand"
  @change="onChange"
   label="Select a Brand"
   item-text="name"
   item-value="id"
   clearable
  />
</template>

<script>
import AllBrands from '@common/graphql/brand/AllBrands.gql'

export default {
  props: {
    brand: {
      type: String,
    },
  },

  model: {
    prop: 'brand',
    event: 'change'
  },

  data () {
    return {
      items: [],
    }
  },

  apollo: {
    items: {
      query: AllBrands,
      fetchPolicy: 'network-only',
      update: (data) => data.allBrands
    }
  },

  methods: {
    onChange (val) {
      if(val === undefined) {
        val = null
      }
      this.$emit('change', val)
    }
  },


}
</script>
