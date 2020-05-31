<template>
  <input type="file" ref="imageFile" @change="extUpload"/>
</template>

<script>
import {IKUpload} from "imagekitio-vue"
export default {
  extends: IKUpload,
  name: "IKUploadExt",
  data() {
    return {
      file: {}
    };
  },
  methods: {
    extUpload() {
      console.log('this.$refs.imageFile %o', this.$refs.imageFile)
      console.log('file %o', this.file)

      this.upload()
    }
  }
};
</script>
