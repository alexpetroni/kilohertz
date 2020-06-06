<template>
  <v-data-table
    v-model="variationsSku"
    :headers="headers"
    :items="items"
    :search="searchTerm"
    item-key="id"
    selectable-key="sku"
    show-select
  >
    <template v-slot:top>
      <v-toolbar
      flat
      >
      <v-spacer />
      <v-text-field
        :label="$t('search')"
        color="secondary"
        hide-details
        v-model="searchTerm"
        style="max-width: 350px;"
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
      <v-spacer />
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import { variationsWithFeatures } from '@common/utils'

export default {
  mixins: [],

  model: {
    prop: 'selection',
    event: 'change'
  },

  props: {
    product: {
      type: Object,
      required: true,
    },

    selection: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      searchTerm: '',
    }
  },

  computed: {
    headers () {
      let h = [
                {
                  text: 'Sku',
                  value: 'sku',
                },
            ]
      this.product.variableFeatures.forEach(e => {
        h.push({text: e.name, value:`vf__${e.slug}` })
      })
      return h
    },

    variationsSku: {
      get () {
        return this.items.filter(e => this.selection.indexOf(e.sku) >=0)
      },

      set (items) {
        let skuArr = items.map(e => e.sku)
        this.$emit('change', skuArr)
      }
    },

    items () {
      if (!this.product) return []
      let prodVariations = variationsWithFeatures(this.product)
      let items = prodVariations.map(e => {
        e.features.map(f => {
          e['vf__'+f.vfSlug] = f.fiName
        })
        return e
      })
      return items
    },


  },

  watch: {

  },

  methods: {

  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
