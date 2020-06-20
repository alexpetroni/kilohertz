<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      inline
      icon="mdi-clipboard-text"
      title="Attachments List"
      class="px-5 py-3"
    >
    <v-alert v-if="error" type="error">{{ error }}</v-alert>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :multiSort="false"
      :options.sync="options"
      v-on="tableEvents"
      show-select
      item-key="fileId"
      :loading_xx="loading"
    >

      <template v-slot:top>
        <v-toolbar
        flat
        >
        <v-spacer />
        <v-text-field
          :label="$t('search')"
          color="secondary"
          hide-details
          v-model="searchTerm"
          style="max-width: 350px;"
        >
          <template
            v-if="$vuetify.breakpoint.mdAndUp"
            v-slot:append-outer
          >
            <v-btn
              class="mt-n2"
              elevation="1"
              fab
              small
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
        </v-text-field>
        <v-spacer />
        <FileUploadsSelector
        multiple
        @files-uploaded="$emit('reload')"
        />
        </v-toolbar>
      </template>

      <template v-slot:item.createdAt="{item}">
        {{ formatDate(item.createdAt) }}
      </template>

      <template v-slot:item.updatedAt="{item}">
        {{ formatDate(item.updatedAt) }}
      </template>

      <template v-slot:item.thumbnail="{item}">
        <ImgTransf :path="item.filePath" :transformation="[{w:90, h: 90}]" class="tab-img-thumbnail" />
      </template>

      <template v-slot:item.actions="{item}">
        <EditBtn @click="editItem(item.fileId)"/>
        <DeleteBtn @click="deleteItem(item.fileId)"/>
      </template>

    </v-data-table>

    <template v-if="hasItems">
      <BulkActionSelector
        :disabled="!itemsSelected"
        @delete-items="onDeleteItems"
      />
    </template>
    </base-material-card>

    <ConfirmationDialog
      v-model="dialog"
      :message="dialogMsg"
      @confirm="onConfirm"
    />

  </v-container>
</template>

<script>
import FormPagListMixin from '@common/mixins/FormPagListMixin'
import EditBtn from '@common/components/btn/EditBtn'
import DeleteBtn from '@common/components/btn/DeleteBtn'
import ConfirmationDialog from '@common/components/ConfirmationDialog'
import BulkActionSelector from '@common/components/BulkActionSelector'
import ImgTransf from '@common/components/img/ImgTransf'
import FileUploadsSelector from '@/components/selectors/FileUploadsSelector'

import { parseDate } from '@common/utils'

export default {

  mixins: [ FormPagListMixin ],

  components: {
    EditBtn,
    DeleteBtn,
    ConfirmationDialog,
    BulkActionSelector,
    ImgTransf,
    FileUploadsSelector,
  },

  data () {
    return {
      headers: [
              {
                text: 'Name',
                value: 'name',
              },

              {
                text: 'Thumbnail',
                value: 'thumbnail',
              },

              {
                align: 'right',
                sortable: false,
                text: 'Actions',
                value: 'actions',
              },
            ],

      showUpload: false,
    }
  },

  methods: {
    formatDate (date) {
      return parseDate(date)
    },

    onDeleteItems () {
      if(this.selected) {
        this.$emit('delete-items', this.selected.map(e => e.fileId))
      }
    },

    onShowUpload () {
      this.showUpload = !this.showUpload
    },
  },
}
</script>
