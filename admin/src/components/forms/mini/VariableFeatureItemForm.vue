<template>
  <v-container>
    <template v-if="isTextType">
      <v-row justify="center" dense>
        <v-col cols="12" md="6">
          <v-text-field
          v-model="editedItem.name"
          label="Name"
          @keyup.enter="onEnter"
          />
        </v-col>
      </v-row>
    </template>


    <template v-if="isColorType">
      <v-row justify="center" dense>
        <v-col cols="12" md="6">
          <v-text-field
          v-model="editedItem.name"
          label="Name"
          @keyup.enter="onEnter"
          />
        </v-col>

        <v-col cols="12" md="4">
        <v-avatar
        :color="editedItem.value"
        size="28"
        class="selectedColor mt-6 mx-4"
        >
         </v-avatar>

        <v-dialog
            v-model="colorDialog"
            persistent
            width="300"
          >
            <template v-slot:activator="{ on }">
              <v-btn class="mt-6" small tile outlined color="success" v-on="on">
               <v-icon left>mdi-eyedropper-variant</v-icon> Select Color
             </v-btn>
            </template>

            <v-card>
            <v-color-picker
            v-model="vfColor"
            mode="hexa"
            flat
            hide-mode-switch
            :show-swatches = "showSwatches"

            >
          </v-color-picker>
          <v-switch dense v-model="showSwatches" label="Show Swatches" class="pl-4"/>
          <v-card-actions>
            <v-spacer />
            <v-btn
            text
            outlined
            color="primary"
            @click="colorDialog = false"
            >
            Select
          </v-btn>
          <v-spacer />
          </v-card-actions>
          </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </template>


    <template v-if="isImageType">
        <v-row justify="center" dense>
          <v-col cols="12" md="6">
            <v-text-field
            v-model="editedItem.name"
            label="Name"
            @keyup.enter="onEnter"
            />
          </v-col>

          <v-col md="4">
            <AttachmentForm
            v-model="editedItem.value"
            />
          </v-col>
        </v-row>
    </template>

    <template v-if="isSvgType">
        <v-row justify="center" dense>
          <v-col cols="12" md="6">
            <v-text-field
            v-model="editedItem.name"
            label="Name"
            @keyup.enter="onEnter"
            />
          </v-col>

          <v-col md="1">
            <div v-html="editedItem.value" ></div>
          </v-col>
        </v-row>

        <v-row justify="center" dense>
          <v-col cols="12" md="8" sm="12">
            <v-textarea
            v-model="editedItem.value"
            label="SVG Code"
            >
            </v-textarea>
          </v-col>
        </v-row>
    </template>

      <v-row justify="center">
        <v-col
        cols="12"
        >
          <FormSubmitButtons
          @create-item="createItem"
          @update-item="updateItem"
          @cancel="cancel"
          :disabled="submitDisabled"
          :formState="formState"
          cancelBtn
          btnTextAdd="Add Item"
          btnTextAddUpdate="Update Item"
          textBtn
          outlined
          cardClass="pb-4 mt-n2"
          />
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { isVfTextType, isVfColorType, isVfImageType, isVfSvgType  } from '@common/utils'
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import AttachmentForm from '@/components/forms/mini/AttachmentForm'

export default {
  components: {
    FormSubmitButtons,
    AttachmentForm,
  },

  mixins: [ FormItemMixin ],

  props: {
    type: {
      type: String,
      default: 'TEXT',
    }
  },

  data () {
    return {
      colorDialog: false,
      showSwatches: false,
    }
  },

  computed: {
    isTextType () {
      return isVfTextType(this.type)
    },

    isColorType () {
      return isVfColorType(this.type)
    },

    isImageType () {
      return isVfImageType(this.type)
    },


    isSvgType () {
      return isVfSvgType(this.type)
    },

    submitDisabled () {
      return !this.hasName
    },

    hasName () {
      return this.editedItem.name && this.editedItem.name.trim()
    },

    vfColor: {
      get () {
        return this.editedItem.value ? this.editedItem.value : '#FFFFFF'
      },

      set (val) {
        this.$set(this.editedItem, 'value', val)
      }
    },

  },

  methods: {
    onEnter () {
      if(!this.hasName) return
      if(this.isColorType && this.editedItem.value == '#FFFFFF') {
        this.colorDialog = true
        return
      }
      if(this.isSvgType && !this.editedItem.value) {
        return
      }
      this.isNewForm ? this.createItem() : this.updateItem()
    }
  },


}
</script>

<style lang="scss" scoped>

.selectedColor {
  border: solid 3px;
  border-color: #757575 !important
}
</style>
