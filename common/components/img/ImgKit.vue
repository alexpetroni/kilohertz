<template>
  <IKImage
  :publicKey="publicKey"
  :urlEndpoint="urlEndpoint"
  :src="src"
  :path="path"
  :transformation="transformation"
  />
</template>

<script>
import ImgKitMixin from '@common/components/img/ImgKitMixin'
import { IKImage } from "imagekitio-vue"

  export default {
    mixins: [ ImgKitMixin ],

    components: {
      IKImage,
    },

    props: {
      src: {
        type: String,
      },

      path: {
        type: String,
      },

      transformation: {
        type: Array
      },
    },
  }
</script>
