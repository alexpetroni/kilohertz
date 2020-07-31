<template>
    <ProductAttachmetsSetRL
    :product="product"
    :variation="variation"
    :field="field"
    :name="name"
    v-slot="{set}"
    >
      <lingallery
      v-if="set || mainImage"
      :iid.sync="currentId"
      :width="600"
      :height="400"
      :items="gallery(set)"
      />
    </ProductAttachmetsSetRL>
</template>

<script>
import ProductAttachmetsSetRL from '@/components/rl/ProductAttachmetsSetRL'
import Lingallery from 'lingallery'
import { imgUrl } from '@common/utils'

export default {

  components: {
    ProductAttachmetsSetRL,
    Lingallery,
  },

  props: {
    mainImage: {
      type: String,
    },

    product: {
      type: String,
      required: true,
    },

    variation: {
      type: String
    },

    field: {
      type: String,
      default: 'id'
    },

    name: {
      type: String,
      required: true,
    },

    thumbnailTranformations: {
      type: Object,
      default: () => ({w: 100, h: 100})
    },

    imgTranformations: {
      type: Object,
      default: () => ({w: 600, h: 400})
    },
  },

  data () {
    return {
      currentId: null,
    }
  },

  computed: {

  },

  watch: {

  },

  methods: {
    gallery (set) {
      let items = []
      if(this.mainImage) {
        items.push({
          id: this.mainImage.path,
          src: imgUrl(this.mainImage, this.imgTranformations),
          thumbnail: imgUrl(this.mainImage, this.thumbnailTranformations),
        })
      }
      if(set && set.length){
        set.forEach(e => {
          items.push({
            id: e.path,
            src: imgUrl(e.path, {w: 400, h: 300}),
            thumbnail: imgUrl(e.path, {w: 100, h: 75}),
            alt: e.title,
            caption: e.title,
          })
        })
      }

      return items
    },
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
