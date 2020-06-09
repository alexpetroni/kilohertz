<template>
  <IKContext
    publicKey="publicKey"
    urlEndpoint="urlEndpoint"
    authenticationEndpoint="http://localhost:4000/imagekitauth">
      <IKUploadExt :fileName="kilo" :onSuccess="onSuccess" :onError="onError"/>
  </IKContext>
</template>

<script>

import {IKContext}from "imagekitio-vue"
import IKUploadExt from '@common/components/img/IKUploadExt'
import ImgKitMixin from '@common/components/img/ImgKitMixin'

  export default {
    mixins: [ ImgKitMixin ],
    
    components: {
      IKContext,
      IKUploadExt,
    },

    props: {
      src: {
        type: String,
      }
    },

    data () {
      return {
        kilo: "xx"
      }
    },

    methods: {
      onSuccess (result) {
        console.log('success %o', result)
        this.$emit('item-uploaded')
      },

      onError (error) {
        console.log('error %o', error)
        this.$emit('error', error.message)
      }
    }
  }
</script>
