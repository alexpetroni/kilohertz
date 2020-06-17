<template>
  <v-container
    fluid
    tag="section"
  >
    <base-material-card>
      <template v-slot:heading>
        <FormTopBar
          addNewTitle="Add New Attachment"
          editTitle="Edit Attachment"
          v-bind="modelState"
          v-on="formEvents"
          :name="item.name"
          :menuItems="topBarMenuItems"
        />
        </template>

        <v-progress-linear indeterminate v-if="loading"></v-progress-linear>

        <v-alert v-if="error" type="error">{{ error }}</v-alert>

          <v-row justify="center">
            <v-col
            cols="9"
            >
              <ImgTransf :path="item.path" />
            </v-col>

            <v-col cols="3">
              <ul style="list-style: none;">
              <li>Type: {{ item.type }}</li>
              <li>File type: {{ item.fileType }}</li>
              <li>Thumbnail: <a :href="item.thumbnail" target="_blank"><img :src="item.thumbnail" style="vertical-align: middle;"/></a></li>
              <li>URL: <a :href="item.url" target="_blank">{{ item.url }}</a></li>
              <li>Tags: {{ item.tags }}</li>
              </ul>
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
import ImgTransf from '@common/components/img/ImgTransf'

export default {
  mixins: [ FormItemMixin ],

  components: {
    FormTopBar,
    FormSubmitButtons,
    ImgTransf,
  },

  data () {
    return {
      topBarMenuItems: [{title: "Reload", emit: 'reload-item', icon: "mdi-reload"}],
    }
  },

  computed: {
    submitDisabled () {
      return !this.editedItem.name.trim()
    },
  },
}
</script>
