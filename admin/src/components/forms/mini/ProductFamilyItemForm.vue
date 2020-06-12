<template>
  <ProductLoader
  :id="id"
  v-slot="{product, loading}"
  >

  <v-card v-if="!loading" flat style="width: 100%;" elevation="1">
    <v-toolbar flat>

      <v-btn
      v-if="reordable"
      title="Drag to reorder"
      icon
      class="handle"
      >
        <v-icon>mdi-drag-vertical</v-icon>
      </v-btn>

      <ImgKit
      :path="product.image"
      :transformation="[{w:75, h: 75}]"
      class="pr-3"
       />

      <v-toolbar-title v-html="title(product)"></v-toolbar-title>
      <v-spacer />
      <DeleteBtn @click="$emit('delete-item')"/>
    </v-toolbar>
  </v-card>

  </ProductLoader>
</template>

<script>
import ProductLoader from '@/components/rl/ProductLoader'
import ImgKit from '@common/components/img/ImgKit'
import DeleteBtn from '@common/components/btn/DeleteBtn'

export default {

  components: {
    ProductLoader,
    ImgKit,
    DeleteBtn,
  },

  props: {
    id: {
      type: String
    },

    reordable: {
      type: Boolean,
      default: false,
    }
  },

  methods: {
    title (product) {
      return product.name
    },
  },
}
</script>
