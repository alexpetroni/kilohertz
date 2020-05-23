<template>
  <v-container
    fluid
    tag="section"
  >
    <base-material-card
     class="mx-auto">
      <template v-slot:heading>
        <FormTopBar
          addNewTitle="Add New Product"
          v-bind="modelState"
          v-on="formEvents"
          :name="item.name"
        />
        </template>

        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>

        <v-alert v-if="error" type="error">{{ error }}</v-alert>

          <v-row justify="center">
            <!-- ---------------IDENTITIY --------------- -->
              <v-row wrap>
                <v-col cols="12">
                  <v-card>
                    <v-card-title>
                      <v-row>
                      <v-col cols="12" md="8">
                        <h3>Product Type, Name, SKU</h3>
                      </v-col>
                      <v-col cols="12"  md="3">
                        <v-switch
                        :label="publishedLabel"
                        v-model="editedItem.published"
                        ></v-switch>
                      </v-col>
                      <v-col cols="12" md="1">
                        <v-text-field
                        label="Display order"
                        v-model.number="editedItem.displayOrder"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    </v-card-title>

                    <v-container
                    fluid
                    grid-list-xl
                    >
                    <v-row
                    align-center
                    wrap
                    >
                    <v-col cols="12" md="3">
                      <v-select
                      v-model="editedItem.type"
                      :items="productTypes"
                      chips
                      label="Product type"
                      :disabled="isEditForm"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" md="3">
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
                    <v-col cols="12" md="3">
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

                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>


              <!-- --------------- DESCRIPTION  --------------- -->
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    <h3>Excerpt</h3>
                  </v-card-title>

                  <v-container
                  fluid
                  grid-list-xl
                  >
                  <v-row
                  >
                  <v-col cols="12">
                  <v-textarea
                  outline
                  v-model="editedItem.excerpt"
                  ></v-textarea>
                </v-col>

                </v-row>
              </v-container>
            </v-card>
            </v-col>
            </v-row>

            <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>
                  <h3>Description</h3>
                </v-card-title>
                <v-col cols="12">
                  <quillEditor
                  v-model="editedItem.description"
                  :options="editorOption"
                  ></quillEditor>
              </v-col>

            </v-card>
            </v-col>

            </v-row>


            <!-- --------------- TECHNICAL INFORMATION  --------------- -->
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>
                  <h3>Technical Information</h3>
                </v-card-title>

                <v-container
                fluid
                grid-list-xl
                >
                <v-row
                >
                <v-col cols="12">
                <v-textarea
                outline
                placeholder="Place text separated by | character"
                v-model="editedItem.technicalInformation"
                ></v-textarea>
              </v-col>

              </v-row>
            </v-container>
          </v-card>
          </v-col>
          </v-row>


            <!-- --------------- DIMMENSIONS AND WEIGHT --------------- -->

            <v-col cols="12" >
              <v-card>
                <v-card-title>
                  <div>
                    <h3>Dimmensions & Weight</h3>
                  </div>
                </v-card-title>

                <v-container
                fluid
                grid-list-xl
                >
                <v-row
                align-center
                wrap
                >
                <v-col cols="12" md="3">
                  <v-text-field
                  label="Length (cm)"
                  name="length"
                  placeholder=""
                  v-model.number="editedItem.sizeLength"

                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field
                  label="Width (cm)"
                  name="salePrice"
                  placeholder=""
                  v-model.number="editedItem.sizeWidth"

                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                  label="Height (cm)"

                  placeholder=""
                  v-model.number="editedItem.sizeHeight"

                  required
                  ></v-text-field>
                </v-col>

              </v-row>
              <v-row
                align-center
                wrap
              >

                <v-col cols="12" md="3">
                  <v-text-field
                  label="Weight net (kg)"

                  placeholder=""
                  v-model.number="editedItem.weightNet"

                  required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field
                  label="Weight gross (kg)"

                  placeholder=""
                  v-model.number="editedItem.weightGross"

                  required
                  ></v-text-field>
                </v-col>

              </v-row>

              <v-row>
              <v-col cols="12">
                <div class="title">Preview labels</div>
              </v-col>
              <template v-for="i in 3">

                <v-col xs="4" :key="i">
                  <v-card>
                    <v-card-text>
                  <v-text-field
                  v-model="editedItem.previewFields[i-1]['title']"
                  xs6
                  :key="i + 'tit'"
                  label="Title"
                  ></v-text-field>

                  <v-text-field
                  v-model="editedItem.previewFields[i-1]['content']"
                  :key="i + 'cont'"
                  label="Content"
                  ></v-text-field>

                  <SingleImageEditor
                  v-model="editedItem.previewFields[i-1]['image']"
                  >
                  </SingleImageEditor>
                </v-card-text>
                  </v-card>
                </v-col>

              </template>
            </v-row>

            </v-container>
              </v-card>
            </v-col>

            <v-col
            cols="12"
            >
            <FormSubmitButtons
            :disabled="submitDisabled"
            :formState="formState"
            @update-item="updateItem"
            @create-item="createItem"
            />
            </v-col>
          </v-row>
    </base-material-card>
</v-container>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormTopBar from '@common/components/FormTopBar'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
// import { productTypes } from '@common/utils'

export default {
  mixins: [ FormItemMixin ],

  components: {
    FormTopBar,
    FormSubmitButtons,
  },

  data () {
    return {
      editorOption: {},
    }
  },

  computed: {
    submitDisabled () {
      return !this.editedItem.name.trim()
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
  },
}
</script>
