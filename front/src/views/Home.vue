<template>
  <div class="home">
    <CategoriesList
    @show-category="onShowCategory"
    />
  </div>
</template>

<script>
import CategoriesList from '@/components/layouts/CategoriesList'

export default {
  name: 'Home',

  components: {
    CategoriesList,
  },

  methods: {
    onShowCategory (slug) {
      console.log('slug %s', slug)
      this.$router.push({path: `/category/${slug}`})
    },
  },
}
</script>
