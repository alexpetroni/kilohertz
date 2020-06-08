const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@common': path.resolve(__dirname, './../common'),
      },
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}
