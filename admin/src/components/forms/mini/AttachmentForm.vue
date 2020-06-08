<template>
<div>
  <div v-if="title" class="body-1 mb-2" v-html="title"></div>
      <!-- ======================== MULTIPLE ======================== -->
        <template v-if="hasMultiContent">
          <template v-for="img in item">
              <v-hover
                :key="img"
                  v-slot:default="{ hover }"
                >
              <div class="img-container">
              <ImgKit
              :path="img"
              :transformation="[{w:150, h: 150}]"
               />
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
                 @click="onDeleteImg(img)"
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
         </template>
        </template>


      <!-- ======================== SINGLE ======================== -->
          <template v-else-if="hasSingleContent">
            <v-hover v-slot:default="{ hover }">
              <div class="img-container">
              <ImgKit
              :path="item"
              :transformation="[{w:150, h: 150}]"
               />
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
                 @click="onDeleteImg(item)"
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
         </template>

         <template v-else>
           <div class="img-container">
           <v-img
           :src="require('@/assets/noimage.png')"
           class="no-img"
           />
         </div>
         </template>



      <div>
        <AttachmentsSelectDialog
        :selectSingleImageBtnText="selectSingleImageBtnText"
        :selectMultipleImagesBtnText="selectMultipleImagesBtnText"
        :multiple="multiple"
        @change="onFileSelect"
        />
    </div>

    <ConfirmationDialog
    v-model="dialog"
    :message="deleteMsg"
    @confirm="onDeleteConfirm"
    @cancel="onDeleteCancel"
    />
</div>
</template>

<script>
import ImgKit from '@common/components/img/ImgKit'
import ConfirmationDialog from '@common/components/ConfirmationDialog'
import AttachmentsSelectDialog from '@/components/selectors/AttachmentsSelectDialog'


export default {
  props: {
    multiple: {
      type: Boolean,
    },

    item: {
      type: [String, Array],
    },

    selectSingleImageBtnText: {
      type: String,
    },

    selectMultipleImagesBtnText: {
      type: String,
    },

    title: {
      type: String,
    },
  },

  model: {
    prop: 'item',
  },

  components: {
    ImgKit,
    ConfirmationDialog,
    AttachmentsSelectDialog,
  },

  data () {
    return {
      imgToDelete: null,
      dialog: false,
      deleteMsg: ""
    }
  },

  computed: {
    submitDisabled () {
      return !this.editedItem.name.trim()
    },

    hasMultiContent () {
      return this.multiple && this.item && this.item.length
    },

    hasSingleContent () {
      return !this.multiple && this.item
    },
  },

  methods: {
    onFileSelect (val) {
      let files = this.multiple ? [...this.item, ...val] : val
      this.$emit('input', files)
    },

    onDeleteImg (val) {
      this.imgToDelete = val
      this.showConfirmDialog()
    },

    showConfirmDialog () {
      this.deleteMsg = this.multiple ? "Do you want to delete this image?" : "Do you want to delete the image?"
      this.dialog = true
    },

    onDeleteConfirm () {
      if(this.multiple){
        this.$emit('input', this.item.filter(e => e != this.imgToDelete))
      }else{
        this.$emit('input', null)
      }
      this.imgToDelete = null
    },

    onDeleteCancel () {
      this.imgToDelete = null
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
</style>
