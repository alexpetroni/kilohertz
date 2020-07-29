<template>
      <v-card flat>
        <v-container
        fluid
        grid-list-xl
        >
          <v-row>
          <v-col cols="12" md="8">
            <base-subheading>
              Product Type, Name, SKU
            </base-subheading>
          </v-col>

          <v-col cols="12"  md="3">
            <v-switch
            :label="publishedLabel"
            v-model="editedItem.published"
            ></v-switch>
          </v-col>

          <v-col cols="12" md="1">
            <v-text-field
            v-if="!isProductVariation"
            label="Display order"
            v-model.number="editedItem.displayOrder"
            ></v-text-field>
          </v-col>

        </v-row>


        <v-row
        align-center
        wrap
        >
        <v-col cols="12" md="3">
          <v-select
          v-model="editedItem.type"
          :items="productTypes"
          label="Product type"
          :disabled="isEditForm"
          ></v-select>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
          label="Name"
          name="fullname"
          placeholder=""
          v-model="editedItem.name"
          data-vv-name="fullname"
          required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
          label="SKU"
          name="sku"
          placeholder=""
          v-model="editedItem.sku"
          data-vv-name="sku"
          required
          ></v-text-field>
        </v-col>

        <template v-if="!isProductVariation">
        <v-col cols="12" md="3">
          <BrandSelect
          v-model="editedItem.brand"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
          v-if="isEditForm"
          label="Slug"
          name="slug"
          placeholder=""
          v-model="editedItem.slug"
          data-vv-name="slug"
          required
          ></v-text-field>
        </v-col>
        </template> <!-- template !isProductVariation -->

        <v-col sm="12">
        <v-textarea
        label="Excerpt"
        outlined
        v-model="editedItem.excerpt"
        ></v-textarea>
      </v-col>
      <v-col cols="12">
        <base-subheading>
          Short Description
        </base-subheading>
      </v-col>
      <v-col sm="12">
        <quillEditor
        class="editor mt-n4 mb-12"
        v-model="editedItem.description"
        :options="quillOptions"
        ></quillEditor>
      </v-col>

      <v-col cols="12">
        <base-subheading>
          Long Description
        </base-subheading>
      </v-col>
      <v-col sm="12">
        <quillEditor
        class="editor mt-n4 mb-12"
        v-model="editedItem.longDescription"
        :options="quillOptions"
        ></quillEditor>
      </v-col>

      <v-col sm="12">
        <v-textarea
        outlined
        label="Technical Information"
        hint="Place text separated by | character"
        v-model="editedItem.technicalInformation"
        ></v-textarea>
      </v-col>

      <v-col cols="12">
        <base-subheading>
          Dimensions & Weight
        </base-subheading>
      </v-col>

      <v-col xs="4" md="2">
        <v-text-field
        label="Length (cm)"
        name="length"
        placeholder=""
        v-model.number="editedItem.sizeLength"

        ></v-text-field>
      </v-col>

      <v-col xs="4" md="2">
        <v-text-field
        label="Width (cm)"
        name="salePrice"
        placeholder=""
        v-model.number="editedItem.sizeWidth"

        ></v-text-field>
      </v-col>
      <v-col xs="4" md="2">
        <v-text-field
        label="Height (cm)"

        placeholder=""
        v-model.number="editedItem.sizeHeight"

        required
        ></v-text-field>
      </v-col>

      <v-col xs="4" md="2">
        <v-text-field
        label="Weight net (kg)"

        placeholder=""
        v-model.number="editedItem.weightNet"

        required
        ></v-text-field>
      </v-col>

      <v-col xs="4" md="2">
        <v-text-field
        label="Weight gross (kg)"
        placeholder=""
        v-model.number="editedItem.weightGross"
        required
        ></v-text-field>
      </v-col>

      <template v-if="!isProductVariation">
      <v-col sm="12">
        <base-subheading>
          Preview Labels
        </base-subheading>
      </v-col>

      <template v-for="(item, i) in editedItem.previewFields">
        <v-col sm="12" md="4" :key="i">
          <ProductPreviewFieldForm :item="item"/>
        </v-col>
      </template>
    </template> <!-- template !isProductVariation -->

      <v-col sm="12" class="text-center">
        <FormSubmitButtons
        :disabled="submitDisabled"
        :formState="formState"
        @update-item="updateItem"
        @create-item="createItem"
        />
      </v-col>
      </v-row>

    </v-container>
  </v-card>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import ProductPreviewFieldForm from '@/components/forms/mini/ProductPreviewFieldForm'
import BrandSelect from '@/components/selectors/BrandSelect'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import { isProductVariation } from '@common/utils'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  mixins: [ FormItemMixin ],

  components: {
    ProductPreviewFieldForm,
    BrandSelect,
    FormSubmitButtons,
    quillEditor,
  },

  data () {
    return {
      quillOptions: {

      },
    }
  },

  computed: {
    submitDisabled () {
      const name = this.editedItem.name && this.editedItem.name.trim()
      const sku = this.editedItem.sku && this.editedItem.sku.trim()
      const type = this.editedItem.type
      return !(this.isProductVariation ? sku && type : name && sku && type)
    },

    publishedLabel () {
      return  'Published: ' + this.editedItem.published
    },

    productTypes () {
      if(this.isEditForm && this.editedItem.type == 'VARIATION'){
        return [{text: "Variation", value: "VARIATION"}]
      }
      return [
          {text: "Simple", value: "SIMPLE"},
          {text: "Variable", value: "VARIABLE"},
        ]
    },

    isProductVariation () {
      return isProductVariation(this.editedItem)
    },
  },
}
</script>

<style lang="scss" scoped>
    .editor {
      height: 15rem;
    }
    // .output {
    //   width: 100%;
    //   height: 20rem;
    //   margin: 0;
    //   border: 1px solid #ccc;
    //   overflow-y: auto;
    //   resize: vertical;
    //   &.code {
    //     padding: 1rem;
    //     height: 16rem;
    //   }
    //   &.ql-snow {
    //     border-top: none;
    //     height: 24rem;
    //   }
    // }
</style>
