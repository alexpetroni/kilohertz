<template>
  <v-img v-if="this.path" :src="imgUrl(this.path, this.transformation)"  />
</template>

<script>
import { imgUrl } from '@common/utils'

  export default {
    props: {
      path: {
        type: String,
      },

      transformation: {
        type: Array
      },
    },

    methods: {
      imgUrl (path, transformation) {
        return imgUrl(path, transformation)
      }
    }
  }
</script>
