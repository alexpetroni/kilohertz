import Vue from 'vue'
import ImageKit from 'imagekit-javascript'

var imagekit = new ImageKit({
    publicKey : process.env.VUE_APP_IMGKIT_PUBKEY,
    urlEndpoint : process.env.VUE_APP_IMGKIT_ENDPOINT,
    // authenticationEndpoint : "http://www.yourserver.com/auth",
});

const DamImg = {
  install: function (Vue) {
    Vue.mixin({
      methods: {
        imgUrl (path, transformation) {
          return imagekit.url({path, transformation})
        }
      }
    })

  },
}

Vue.use(DamImg)
