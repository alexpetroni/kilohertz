// ImgKit Mixin
const mix = {
  data () {
    return {
      publicKey: process.env.VUE_APP_IMGKIT_PUBKEY,
      urlEndpoint: process.env.VUE_APP_IMGKIT_ENDPOINT,
    }
  },
}

export default mix
