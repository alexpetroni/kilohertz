<template>
  <div>
  <v-file-input
    v-model="files"
    color="primary"
    counter
    label="File input"
    :multiple="multiple"
    placeholder="Upload your files"
    prepend-icon="mdi-paperclip"
    outlined
    :show-size="1000"
    @change="uploadFiles"
    :loading="loading"
    ref="fileInput"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        color="primary"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input>

  <div v-if="errors.length" class="caption" color="error">
    <ul>
      <li v-for="(e, index) in errors" :key="index">{{ e }}</li>
    </ul>
  </div>

  <div v-if="loading"> ...remaining {{ counter }}</div>
</div>
</template>

<script>
import imagekit from '@common/imagekit'

export default {
  props: {
    multiple: {
      type: Boolean,
    }
  },

  data () {
    return {
      files: [],
      errors: [],
      counter: 0,
    }
  },

  methods: {
    async uploadFiles(files) {
      if(files && files.length){

        this.errors = []
        this.counter = 0
        this.loading = true

        let decreaseCounter = this.decreaseCounter
        let errors = this.errors

        this.counter = files.length

        files.forEach(e => {
          imagekit.upload({
            file: e,
            fileName : e.name,
          },
          function(err) {
            if(err) {
              errors.push(err.message)
            }
            decreaseCounter()
        })
      })
      }
    },

    decreaseCounter () {
      this.counter -= 1
      if(this.counter <= 0 ){
        this.uploadCompleted()
      }
    },

    uploadCompleted () {
      this.loading = false
      if(this.errors.length < this.files.length){
        this.$emit('files-uploaded')
      }
      this.files = []
      this.$refs.fileInput.blur()
    },
  },
}
</script>
