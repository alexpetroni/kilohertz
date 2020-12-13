<template>
  <v-container
    fluid
    tag="section"
  >
    <base-material-card
     class="px-5 py-3 mx-auto">
      <template v-slot:heading>
        <FormTopBar
          addNewTitle="Add New Category Meta"
          editTitle="Edit Category Meta for"
          :name="categoryName"
          v-bind="modelState"
          v-on="formEvents"
          :menuItems="topBarMenuItems"
        />
        </template>

        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>

        <v-alert v-if="error" type="error">{{ error }}</v-alert>
        <v-card-text>
          <v-row>
            <v-col
            cols="12"
            sm="12"
            md="4"
            >
              <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
            </v-col>

            <v-col
            cols="12"
            sm="12"
            >
              <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
            </v-col>


            <v-col cols="12">
              <base-subheading>
                Preview Labels
              </base-subheading>
            </v-col>

            <v-col
            v-for="(p, index) in editedItem.previewFields"
            :key="'prev_' + index"
            cols="12"
            sm="4"
            >
              <CategoryPreviewFieldForm :item="p" />
            </v-col>

            <v-col
            cols="12"
            sm="12"
            >
              <base-subheading>
                Highlights <v-btn color="primary" fab small dark @click="onAddHighlights" class="ml-4" title="Add Highlight"><v-icon dark>mdi-plus</v-icon></v-btn>
              </base-subheading>
            </v-col>

            <v-col
            v-for="(h, index) in editedItem.highlights"
            :key="'high_' + index"
            cols="12"
            sm="4"
            >
            <CategoryHighlightFieldForm :item="h" @delete="onDeleteHighlight(index)"/>
          </v-col>


            <v-col
            sm="12"
            >

            </v-col>

            <v-col
            cols="12"
            >
            <FormSubmitButtons
            :formState="formState"
            @update-item="updateItem"
            @create-item="createItem"
            />
            </v-col>
          </v-row>
        </v-card-text>
    </base-material-card>
</v-container>
</template>

<script>
import FormItemMixin from '@common/mixins/FormItemMixin'
import FormTopBar from '@common/components/FormTopBar'
import CategoryPreviewFieldForm from '@/components/forms/mini/CategoryPreviewFieldForm'
import CategoryHighlightFieldForm from '@/components/forms/mini/CategoryHighlightFieldForm'
import FormSubmitButtons from '@common/components/FormSubmitButtons'


export default {
  mixins: [ FormItemMixin ],

  components: {
    FormTopBar,
    CategoryPreviewFieldForm,
    CategoryHighlightFieldForm,
    FormSubmitButtons,
  },

  data () {
    return {
      topBarMenuItems: [{title: "Reload", emit: 'reload-item', icon: "mdi-reload"}],
    }
  },

  computed: {
    categoryName () {
      return this.editedItem && this.editedItem.category && this.editedItem.category.name ? this.editedItem.category.name : 'cc'
    }
  },

  methods: {
    onEditCategoryMetaMeta () {
      this.$emit('edit-categoryMeta-meta')
    },

    onAddHighlights () {
      this.editedItem.highlights.push({title: "", content: ""})
    },

    onDeleteHighlight (index) {
      console.log('incex %s', index)
      this.editedItem.highlights = this.editedItem.highlights.splice(index, 1)
    },
  },
}
</script>
