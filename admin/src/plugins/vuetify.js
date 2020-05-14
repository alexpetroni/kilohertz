import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'
import '@/sass/overrides.sass'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken1, // #E53935
        secondary: colors.blue.lighten4, // #FFCDD2
        accent: colors.indigo.darken4, // #3F51B5
      },
    },
  },
});
