<template>
  <CategoryFullRL
  :id="id"
  v-slot="{ item }"
  >

  <v-container>
    <v-row v-if="item">
       <v-col cols="12" class="display-3">
      {{ item.category.name}}
      </v-col>
    </v-row>


    <PaginatedProducts
    />


    <v-row v-if="item">
      <v-col cols="12" class="display-3 mt-6">
        {{ metaTitle(item) }}
      </v-col>
      <v-col cols="12" class="display-1">
        {{ metaDescription(item) }}
      </v-col>
    </v-row>

    <v-row v-if="item">
      <v-col
      v-for="(h, index) in highlights(item)"
      :key="index"
      xs="12" sm="4" md="4"
      >
        <CategoryHighlightCard
        :item="h"
        />
     </v-col>
    </v-row>
  </v-container>
  </CategoryFullRL>
</template>

<script>
import CategoryFullRL from '@/components/rl/CategoryFullRL'
import PaginatedProducts from '@/components/layouts/PaginatedProducts'
import CategoryHighlightCard from '@/components/layouts/CategoryHighlightCard'

export default {
  name: 'Category',

  components: {
    CategoryFullRL,
    PaginatedProducts,
    CategoryHighlightCard,
  },

  data: () => ({
    id: null,
  }),

  computed: {

  },

  methods: {
    highlights (item) {
      let hArr = item && item.categoryMeta && item.categoryMeta.highlights
      return Array.isArray(hArr) ? hArr : []
    },

    metaTitle (item) {
      return item && item.categoryMeta && item.categoryMeta.title
    },

    metaDescription (item) {
      return item && item.categoryMeta && item.categoryMeta.description
    }
  },

  watch: {
    '$route.params.id': {
      handler: function (val) {
        this.id = val
      },
      immediate: true
    },
  },
}
</script>
