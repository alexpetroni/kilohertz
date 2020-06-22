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
        <v-btn color="primary" :href="exportLink()" download>Export all products</v-btn>
      </v-col>
      <v-col cols="12">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ErrorMixin from '@common/mixins/ErrorMixin'
import axios from 'axios'

export default {
  mixins: [ ErrorMixin ],


  data () {
    return {
      loading: false,
      downloadLink: ''
    }
  },

  methods: {
    onExport () {
      this.loading = true
      axios
      .get('/hh')
      .then(result => {
        this.downloadLink = result.data
        this.loading = false
        })
      .catch(error => this.setError(error.message))
    },

    exportLink () {
      return process.env.VUE_APP_HTTP + process.env.VUE_APP_PATH_PRODUCTS_EXPORT
    },
  },


}
</script>
