<template>
  <IKImage
  publicKey="public_+9disIZyM7bZUFcu7H1CfrIcSsU="
  urlEndpoint="https://ik.imagekit.io/kilohertz/"
  :src="src"
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
      }
    },
  }
</script>
