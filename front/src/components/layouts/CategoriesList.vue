<template>
  <CategoriesRL
  id="categories"
  v-slot="{item, loading}">
  <v-row>
    <div v-if="loading">
      loading
    </div>

    <template v-else>
      <v-col
      sm="6" md="3"
      v-for="catWithMeta in item"
      :key="catWithMeta.category.id"
      >

        <CategoryPreviewCard
        :fullCategory="catWithMeta"
        @show-category="(val) => $emit('show-category', val)"
        />

      </v-col>
    </template>
  </v-row>
  </CategoriesRL>
</template>

<script>
import CategoriesRL from '@/components/rl/CategoriesRL'
import CategoryPreviewCard from '@/components/layouts/CategoryPreviewCard'

export default {

  components: {
    CategoriesRL,
    CategoryPreviewCard,
  },
}
</script>
