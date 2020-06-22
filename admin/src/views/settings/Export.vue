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
        <v-progress-circular
        v-if="loading"
          indeterminate
          color="primary"
          />
        <a
          v-if="downloadLink"
         :href="downloadLink"
         download>
         Download products export
       </a>
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
      let exportLink = process.env.VUE_APP_HTTP + process.env.VUE_APP_PATH_PRODUCTS_EXPORT
      axios
      .get(exportLink)
      .then(result => {
        this.downloadLink = result.data
        })
      .catch(error => this.setError(error.message))
      .finally(() => { this.loading = false })
    },

    // exportLink () {
    //   return process.env.VUE_APP_HTTP + process.env.VUE_APP_PATH_PRODUCTS_EXPORT
    // },
  },


}
</script>
