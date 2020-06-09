// ImgKit Mixin
const mix = {
  data: function () {
    return {
      publicKey: process.env.VUE_APP_IMGKIT_PUBKEY,
      urlEndpoint: process.env.VUE_APP_IMGKIT_ENDPOINT,
    }
  },
}

export default mix
