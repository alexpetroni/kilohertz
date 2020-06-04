<template>
  <!-- <v-container
    fluid
    tag="section"
  >

    <v-row>
      <v-col cols="12" sm="12" md="6"> -->
        <ProductCategoryEditor :id="id" />
    <!-- </v-col>
  </v-row>
</v-container> -->
</template>

<script>
import ProductCategoryEditor from '@/components/editors/ProductCategoryEditor'

export default {
  props: {
    id: {
      type: String,
    },
  },

  components: {
    ProductCategoryEditor,
  }

}
</script>
