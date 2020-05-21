<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      inline
      icon="mdi-clipboard-text"
      title="Families List"
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


      <template v-slot:item.total="{item}">
        {{ item.products.length }}
      </template>

      <template v-slot:item.members="{item}">
        {{ formatFamilyMembers(item) }}
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
import { parseDate } from '@common/utils'

export default {

  mixins: [ FormPagListMixin ],

  components: {
    AddNewBtn,
    EditBtn,
    DeleteBtn,
    ConfirmationDialog,
    BulkActionSelector,
  },

  data () {
    return {
      headers: [
        {
          text: 'Name',
          value: 'name',
        },

        {
          text: 'No.',
          value: 'total',
        },

        {
          text: 'Family members',
          value: 'members',
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

    formatFamilyMembers (item) {
      return item.products.map(e => e.name).join(', ')
    },
  },
}
</script>
