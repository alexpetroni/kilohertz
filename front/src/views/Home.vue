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
    onShowCategory (cat) {
      console.log('cat %s', cat)
      this.$router.push({path: `/category/${cat.slug}/${cat.id}`})
    },
  },
}
</script>
