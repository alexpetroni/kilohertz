<template>
  <CategoryFullRL
  :id="id"
  v-slot="{ item }"
  >

  <v-container>
    <v-row v-if="item">
      <CategoryBreadcrumbs :category="item.category" />
    </v-row>


    <PaginatedProducts
    :category="id"
    :title="categoryName(item)"
    @show-product="onShowProduct"
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
import CategoryBreadcrumbs from '@/components/layouts/category/CategoryBreadcrumbs'
import PaginatedProducts from '@/components/layouts/PaginatedProducts'
import CategoryHighlightCard from '@/components/layouts/CategoryHighlightCard'
// import { pipeEvents } from '@common/utils'

export default {
  name: 'Category',

  components: {
    CategoryFullRL,
    CategoryBreadcrumbs,
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
    },

    onShowProduct (val) {
      let {field, value} = val
      if(field == 'slug'){
        this.$router.push({path: `/product/${value}`})
      }
    },

    categoryName (item) {
      return item && item.category && item.category.name
    },
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
