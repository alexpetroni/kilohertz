<template>

    <v-container>
      <v-row justify="center" >
        <v-sheet >
          <v-text-field
          v-model="editedItem.name"
          label="Name"
          @keyup.enter="onEnter"
          />
        </v-sheet>

        <template
        v-if="isColorType"
        >

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
              <!-- <v-btn
                color="grey darken-3"
                dark
                icon
                small
                outlined
                class="mt-4"
                v-on="on"
              >
                <v-icon
                large
                :color="editedItem.value"
                >
                mdi-checkbox-blank-circle
                </v-icon>
              </v-btn> -->
            </template>

            <v-card>
            <v-color-picker
            v-model="editedItem.value"
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

        </template>


        <template
        v-if="isSvgType"
        >

        </template>
        <!-- <v-text-field
        v-model="editedItem.name"
        label="Name"
        > -->


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
import { isVfTextType, isVfColorType, isVfSvgType } from '@common/utils'
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormSubmitButtons from '@common/components/FormSubmitButtons'


export default {
  name: '',

  components: {
    FormSubmitButtons,
  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [ FormItemMixin ],

  model: {

  },

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

    isSvgType () {
      return isVfSvgType(this.type)
    },

    submitDisabled () {
      return !this.hasName || !this.editedItem.value
    },

    hasName () {
      return this.editedItem.name && this.editedItem.name.trim()
    },

  },

  watch: {

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.v-text-field{
      width: 250px;
}

.selectedColor {
  border: solid 3px;
  border-color: #757575 !important
}
</style>
