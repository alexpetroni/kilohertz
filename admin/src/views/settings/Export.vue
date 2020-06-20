<template>
  <v-container
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <v-alert type="error" v-if="error">
          {{ error }}
        </v-alert>
      </v-col>

      <v-col cols="12">
        <v-btn color="primary" @click="onExport">Export all products</v-btn>
      </v-col>
      <v-col cols="12">
        <v-progress-circular v-if="loading" :value="40" indeterminate color="primary"></v-progress-circular>
        <a v-if="downloadLink" :href="downloadLink" download>Download exported products file</a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ErrorMixin from '@common/mixins/ErrorMixin'
import axios from 'axios'

const productsExportUrl = process.env.VUE_APP_HTTP + process.env.VUE_APP_PATH_PRODUCTS_EXPORT

export default {
  name: '',

  components: {

  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [ ErrorMixin ],

  model: {

  },

  props: {

  },

  data () {
    return {
      loading: false,
      downloadLink: ''
    }
  },

  computed: {

  },

  watch: {

  },

  methods: {
    onExport () {
      this.loading = true
      axios
      .get(productsExportUrl)
      .then(result => {
        this.downloadLink = result.data
        this.loading = false
        })
      .catch(error => this.setError(error.message))
    }
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
