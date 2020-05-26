<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="8" md="3">
  <v-select
  :items="items"
  v-model="selected"
   label="Variable Features"
   item-text="name"
   item-value="slug"
   clearable
   return-object
  />
  </v-col>
<v-col sm="4" md="1">
  <v-btn
  :disabled="!selected"
  color="primary"
  class="mt-2"
  @click="onSelect"
  >
    Add
  </v-btn>
</v-col>
</v-row>
</v-container>
</template>

<script>
import VariableFeatureSetsList from '@common/graphql/variable-feature/VariableFeatureSetsList.gql'

export default {

  data () {
    return {
      items: [],
      selected: null,
    }
  },

  apollo: {
    items: {
      query: VariableFeatureSetsList,
      update: (data) => data.variableFeatureSetsList
    }
  },

  methods: {
    onSelect () {
      this.$emit('item-selected', this.selected)
      this.selected = null
    }
  },


}
</script>
