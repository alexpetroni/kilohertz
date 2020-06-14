<template>
  <v-container class="px-3" fluid>
    <v-data-iterator
      v-model="selected"
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="totalItems"
      v-on="tableEvents"
      show-select
      :loading_xx="loading"
      width="100%"
    >

      <template v-slot:header>
        <v-alert v-if="error" type="error">{{ error }}</v-alert>
        <v-toolbar
        color="transparent"
        flat
        >
        <span  v-if="title" class="display-3">{{ title }}</span>
        <v-spacer />
        <v-text-field
          :label="search"
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

      <template v-slot:default="props">
        <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
            <ProductPreviewCard
            :product="item"
            v-on="pipeUp('show-product')"
            />
          </v-col>
        </v-row>
      </template>


      <template v-slot:no-results>
        <v-row>
          <v-col cols="12" class="text-center pa-12">No data</v-col>
        </v-row>
      </template>

      <template v-slot:no-data>
        <v-row>
          <v-col cols="12" class="text-center pa-12">No results found</v-col>
        </v-row>
      </template>


    </v-data-iterator>
  </v-container>
</template>

<script>
import FormPagListMixin from '@common/mixins/FormPagListMixin'
import ProductPreviewCard from '@/components/layouts/ProductPreviewCard'
import { pipeEvents } from '@common/utils'

export default {

  mixins: [ FormPagListMixin ],

  props: {
    title: {
      type: String,
    },
  },

  components: {
    ProductPreviewCard,
  },

  data () {
    return {
      headers: [
              {
                text: 'Name',
                value: 'name',
              },
            ],
    }
  },

  methods: {
    pipeUp (...events) {
      return pipeEvents(this, ...events)
    },
  },
}
</script>
