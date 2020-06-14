<template>
  <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
</template>

<script>

export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    },

    product: {
      type: Object,
      default: () => {}
    },
  },

  computed: {
    items () {
      let crumbs = [{
        text: 'Home',
        disabled: false,
        to: '/'
      }]

      const cat = this.categories && this.categories[0]
      if(cat){
        crumbs.push({text: cat.name, disabled: false, to: {path: `/category/${cat.slug}/${cat.id}`}})
      }

      if(this.product) {
        crumbs.push({text: this.product.name, disabled: false, to: {path: `/product/${this.product.slug}`}})
      }

      return crumbs
    }
  },
}
</script>
