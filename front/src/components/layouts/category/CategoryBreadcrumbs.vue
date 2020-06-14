<template>
  <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
</template>

<script>

export default {

  props: {
    category: {
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

      const cat = this.category
      if(cat){
        crumbs.push({text: cat.name, disabled: false, to: {path: `/category/${cat.slug}/${cat.id}`}})
      }

      return crumbs
    }
  },

}
</script>
