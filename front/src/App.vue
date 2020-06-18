<template>
  <v-app>
    <AppBar />
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import AppBar from '@/components/core/AppBar'
import Footer from '@/components/core/Footer'

export default {
  name: 'App',

  components: {
    AppBar,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.link {
  cursor: pointer;
}

.regularPrice {
  text-decoration: line-through;
  color: grey;
}

.salePrice {
  color: red;
}

.discount {
  color: red;
}

.card-icon-preview {
  max-width: 28px;
  max-height: 28px;
  display: inline-block;
}

.hot-price{
  color: orange;
}

.regular-price {
  color: #ffdddd;
}

.normal-price {
  color: #999;
}

.preview-card-price{
  font-weight: 700;
}
</style>
