<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      inline
      icon="mdi-clipboard-text"
      title="Products List"
      class="px-5 py-3"
    >
    <v-alert v-if="error" type="error">{{ error }}</v-alert>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :multiSort="false"
      :options.sync="options"
      :server-items-length="totalItems"
      v-on="tableEvents"
      show-select
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
          <AddNewBtn @click="addNew"/>
        </v-toolbar>
      </template>

      <template v-slot:item.image="{item}">
        <v-img :src="previewImg(item)" class="prod-thumbnail"/>
        <!-- <ImgKit
        :path="item.image"
        :transformation="[{w:90, h: 90}]"
         /> -->
      </template>

      <template v-slot:item.type="{item}">
        {{ productType(item) }}
      </template>

      <template v-slot:item.price="{item}">
        {{ productPrice(item) }}
      </template>

      <template v-slot:item.createdAt="{item}">
        {{ formatDate(item.createdAt) }}
      </template>

      <template v-slot:item.updatedAt="{item}">
        {{ formatDate(item.updatedAt) }}
      </template>

      <template v-slot:item.actions="{item}">
        <EditBtn @click="editItem(item.id)"/>
        <DeleteBtn @click="deleteItem(item.id)"/>
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
import AddNewBtn from '@common/components/btn/AddNewBtn'
import EditBtn from '@common/components/btn/EditBtn'
import DeleteBtn from '@common/components/btn/DeleteBtn'
import ConfirmationDialog from '@common/components/ConfirmationDialog'
import BulkActionSelector from '@common/components/BulkActionSelector'
// import ImgKit from '@common/components/img/ImgKit'
import { parseDate, isSimpleProduct } from '@common/utils'

export default {

  mixins: [ FormPagListMixin ],

  components: {
    AddNewBtn,
    EditBtn,
    DeleteBtn,
    ConfirmationDialog,
    BulkActionSelector,
  //  ImgKit,
  },

  data () {
    return {
      headers: [
        {
          text: 'Image',
          value: 'image',
        },
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Type',
          value: 'type',
        },

        {
          text: 'Price',
          value: 'price',
        },
        {
          text: 'Created',
          value: 'createdAt',
        },
        {
          text: 'Last Update',
          value: 'updatedAt',
        },
        {
          align: 'right',
          sortable: false,
          text: 'Actions',
          value: 'actions',
        },
            ],
    }
  },

  methods: {
    formatDate (date) {
      return parseDate(date)
    },

    productType (item) {
      return isSimpleProduct(item) ? 'S' : 'V'
    },

    productPrice (item) {
      return item.price
    },

    previewImg (item) {

      return item.image ? this.imgUrl(item.image, [{w:90, h: 90}]) : ''
    }
  },
}
</script>

<style scoped>
.prod-thumbnail {
  max-width: 90px;
  max-height: 90px;
}
</style>
