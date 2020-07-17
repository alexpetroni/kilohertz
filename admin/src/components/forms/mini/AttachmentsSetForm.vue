<template>
<div>
  <div v-if="title" class="body-1 mb-2" v-html="title"></div>
  <div>
    <AttachmentsSelectDialog
    :selectMultipleImagesBtnText="selectMultipleImagesBtnText"
    multiple
    @change="onFileSelect"
    />

    <v-btn @click="onAddVideo" color="primary" class="ml-2">Add Video</v-btn>
</div>
    <template v-if="hasItems">
      <div v-for="(f, index) in items" :key="index" class="my-2 file-delimiter">
          <v-hover
              v-slot:default="{ hover }"
            >
          <div class="img-container">
            <template v-if="f.type=='videoUrl'">
              <video ref="videoRef" :src="f.path" id="video-container" width="100%" controls></video>
            </template>

          <template v-else>
            <ImgTransf
            :path="f.path"
            :transformation="[{w:150, h: 150}]"
             />
         </template>
           <v-btn
            v-if="hover"
             title="Delete"
             absolute
             top
             right
             color="primary"
             fab
             x-small
             class="mr-n4 mt-4"
             @click="onDeleteAttachment(index)"
           >
             <v-icon
               small
               dark
             >
               mdi-delete
             </v-icon>
           </v-btn>

         </div>
       </v-hover>
       <v-text-field v-model="f.title" label="File title"/>
     </div>
    </template>

    <template v-else>
      nothing yet
    </template>



    <ConfirmationDialog
    v-model="dialog"
    :message="deleteMsg"
    @confirm="onDeleteConfirm"
    @cancel="onDeleteCancel"
    />

    <VideoAttachmentDialog
    v-model="videoDialog"
    :item="video"
    @create-item="addVideo"
    @update-item="updateVideo"
    />
</div>
</template>

<script>
import ImgTransf from '@common/components/img/ImgTransf'
import ConfirmationDialog from '@common/components/ConfirmationDialog'
import AttachmentsSelectDialog from '@/components/selectors/AttachmentsSelectDialog'
import VideoAttachmentDialog from '@/components/forms/mini/VideoAttachmentDialog'


export default {
  props: {
    items: {
      type: Array,
    },

    selectMultipleImagesBtnText: {
      type: String,
      default: "Add files"
    },

    title: {
      type: String,
    },
  },

  model: {
    prop: 'items',
  },

  components: {
    ImgTransf,
    ConfirmationDialog,
    AttachmentsSelectDialog,
    VideoAttachmentDialog,
  },

  data () {
    return {
      attToDelete: null,
      dialog: false,
      deleteMsg: "",
      videoDialog: false,
      video: this.getDefaultVideo(),
    }
  },

  computed: {
    submitDisabled () {
      return !this.editedItem.name.trim()
    },

    hasItems () {
      return !! (this.items && this.items.length)
    }
  },

  methods: {
    onFileSelect (val) {
      let attachments = val.map(e => ({
        title: '',
        path: e,
        type: 'file'
      }))
      let files =[...this.items, ...attachments]
      this.$emit('input', files)
    },

    onDeleteAttachment (index) {
      this.attToDelete = index
      this.showConfirmDialog()
    },

    showConfirmDialog () {
      this.deleteMsg = "Do you want to delete this attachment?"
      this.dialog = true
    },

    onDeleteConfirm () {
      this.$emit('input', this.items.filter((e, index) => index != this.attToDelete))
      this.attToDelete = null
    },

    onDeleteCancel () {
      this.attToDelete = null
    },

    onAddVideo () {
      this.video = this.getDefaultVideo()
      this.videoDialog = true
    },

    getDefaultVideo () {
      return {
        path: '',
        title: '',
        type: 'videoUrl'
      }
    },

    addVideo (val) {
      console.log('addVideo %o',val)
      let files =[...this.items, val]
      this.$emit('input', files)
    },

    updateVideo (val) {
      console.log('updateVideo %o',val)
    },
  }
}
</script>

<style scoped>
.no-img {
  border: 1px solid #ddd;
}

.img-container {
  display: inline-block;
  position: relative;
  width: 150px;
  padding-right: 1em;
  padding-bottom: 1em;
  margin-right: 1em;
}

.file-delimiter {
  border-bottom: dotted 1px #ddd;
}
</style>
