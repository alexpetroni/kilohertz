<template>
  <div>
    <div :class="titleContainer">
      <v-btn
      :color="color"
      small
      @click="openMediaSelect"
      class="mr-8"
      >
      {{ btnLabel }}
      </v-btn>
      <span class="title">{{ title }}</span>
    </div>
    <template v-if="isSingleImage">
    <template v-if="hasImage">
    <v-hover v-slot:default="{ hover }">
      <v-card
      :width="cardWidth"
      class="text-center">
        <v-btn
        v-if="hover"
            absolute
            color="primary"
            class="white--text"
            fab
            small
            right
            top
            @click="removeImage"
          >
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        <v-card-text>
      <cld-image
      :publicId="media" secure="true">
        <cld-transformation :width="imgWidth" :crop="crop" />
      </cld-image>
    </v-card-text>

    </v-card>
    </v-hover>
  </template>



      <div v-else>
        no image
      </div>
    </template>


    <template v-else>
      <template v-if="hasGallery">
        <v-sheet
              class="mx-auto"
            >
              <v-slide-group
                :prev-icon="prevIcon ? 'mdi-minus' : undefined"
                :next-icon="nextIcon ? 'mdi-plus' : undefined"
                :multiple="multiple"
                :mandatory="mandatory"
                :show-arrows="showArrows"
                :center-active="centerActive"
              >
                <v-slide-item
                  class="mt-6 mr-3 mb-1 ml-1"
                  v-for="m in media"
                  :key="m"
                >
                <v-hover v-slot:default="{ hover }">
                  <v-card
                  :width="cardWidth"
                  class="text-center">
                    <v-btn
                    v-if="hover"
                        absolute
                        color="primary"
                        class="white--text"
                        fab
                        small
                        right
                        top
                        @click="removeImageFromGallery(m)"
                      >
                        <v-icon small>mdi-delete</v-icon>
                      </v-btn>
                  <v-card-text>
                    <cld-image
                    :publicId="m"
                    secure="true"
                    >
                      <cld-transformation :width="imgWidth" :crop="crop" />
                    </cld-image>
                  </v-card-text>
                  </v-card>
                </v-hover>
                </v-slide-item>
              </v-slide-group>
            </v-sheet>
      </template>
      <div v-else>
        no gallery
      </div>
    </template>
  </div>
</template>

<script>
import {mediaSelect} from '@/cloudinary-media-library'

export default {

  model: {
    prop: 'media',
    event: 'change'
  },

  props: {
    media: {
      type: [String, Array]
    },

    multiple: {
      type: Boolean,
      default: true
    },

    title: {
      type: String,
      default: 'Image',
    },

    browseBtn: {
      type: String,
    },

    color: {
      type: String,
      default: 'primary'
    },

    maxFiles: {
      type: Number,
      default: 20,
    },

    imgWidth: {
      type: Number,
      default: 300,
    },

    crop: {
      type: String,
      default: 'scale'
    },

    prevIcon: {
      default: false,
    },

    nextIcon: {
      default: false,
    },

    centerActive: {
      default: false,
    },
  },

  data () {
    return {
      showArrows: true,
      mandatory: false,
    }
  },

  computed: {
    isSingleImage () {
      return !this.multiple
    },

    hasImage () {
      return this.isSingleImage && !!this.media
    },

    hasGallery () {
      return this.multiple && Array.isArray(this.media) && this.media.length
    },

    cardWidth () {
      return this.imgWidth + 32
    },

    btnLabel () {
      return this.browseBtn ? this.browseBtn : (this.isSingleImage ? "Add Image" : "Add Gallery")
    },

    titleContainer () {
      return this.isSingleImage ? 'mb-6' : ''
    }
  },

  methods: {
    openMediaSelect () {
      mediaSelect(this).show({multiple: this.multiple, max_files: this.maxFiles, })
    },

    onInsert (val) {
      let img = this.isSingleImage ? val[0]['public_id'] : this.addToGallery(val.map(e => e.public_id))
      this.$emit('change', img)
    },

    removeImage () {
      this.$emit('change', null)
    },

    addToGallery (idArr) {
      let gallery = this.media ? [...this.media] : []
      idArr.map(e => {
        if(gallery.indexOf(e) == -1) {
          gallery.push(e)
        }
      })
      return gallery
    },

    removeImageFromGallery (id) {
      this.$emit('change', this.media.filter(e => e != id))
    },

    toggle () {

    },
  },

  created () {
    this.$on('insert-media', this.onInsert)
  },

}
</script>
