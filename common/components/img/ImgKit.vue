<template>
  <IKImage
  publicKey="public_+9disIZyM7bZUFcu7H1CfrIcSsU="
  urlEndpoint="https://ik.imagekit.io/kilohertz/"
  :src="src"
  :path="path"
  :transformation="transformation"
  />
</template>

<script>
import {IKImage} from "imagekitio-vue"

  export default {
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
