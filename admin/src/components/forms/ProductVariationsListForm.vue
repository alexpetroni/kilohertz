<template>
    <v-card
    flat
    >
    <v-container
      id="regular-tables"
      fluid
      tag="section"
    >
    <v-row>
      <v-col cols="12">
        <base-subheading>
          Variations List
        </base-subheading>
      </v-col>
    </v-row>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="editedItem"
      :multiSort="false"
      :options.sync="options"
      show-select
      :search="search"
    >

      <template v-slot:top>
        <v-toolbar
        flat
        >
        <v-spacer />
        <v-spacer />
        <v-text-field
          :label="$t('search')"
          color="secondary"
          hide-details
          v-model="search"
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
          <v-btn text outlined color="primary" @click="generateAllPossibleProductVariations">Generate all combinations</v-btn>
        <v-spacer />
          <AddNewBtn @click="newItem"/>
        </v-toolbar>
      </template>

      <template v-slot:item.sku="props">
      <v-edit-dialog
          :return-value.sync="props.item.sku"
        > {{ props.item.sku }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.sku"
              :rules="[max25chars]"
              label="Edit"
              single-line
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.price="props">
      <v-edit-dialog
          :return-value.sync="props.item.price"
        > {{ props.item.price }}
          <template v-slot:input>
            <v-text-field
              v-model.number="props.item.price"
              :rules="[priceRule]"
              label="Edit"
              single-line
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.salePrice="props">
      <v-edit-dialog
          :return-value.sync="props.item.salePrice"
        > {{ props.item.salePrice }}
          <template v-slot:input>
            <v-text-field
              v-model.number="props.item.salePrice"
              :rules="[priceRule]"
              label="Edit"
              single-line
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>


      <template v-slot:item.actions="{item}">
        <EditBtn @click="editItem(item.id)" :disabled="disableItemEdit(item)"/>
        <DeleteBtn @click="deleteItem(item.id)"/>
      </template>

    </v-data-table>

    <template v-if="hasItems">
      <BulkActionSelector
        :disabled="!itemsSelected"
        @delete-items="onDeleteItems"
        :actions="bulkActions"
      />
    </template>

    <FormSubmitButtons
    :disabled="submitDisabled"
    :formState="formState"
    @update-item="updateItem"
    @create-item="createItem"
    />


    <ConfirmationDialog
      v-model="dialog"
      :message="dialogMsg"
      @confirm="onConfirm"
    />

  </v-container>
  </v-card>
</template>

<script>
import FormListMixin from '@common/mixins/FormListMixin'
import AddNewBtn from '@common/components/btn/AddNewBtn'
import EditBtn from '@common/components/btn/EditBtn'
import DeleteBtn from '@common/components/btn/DeleteBtn'
import ConfirmationDialog from '@common/components/ConfirmationDialog'
import BulkActionSelector from '@common/components/BulkActionSelector'
import FormSubmitButtons from '@common/components/FormSubmitButtons'
import { parseDate, jsonCopy, isGeneratedVariationId, newItemIdPrefix } from '@common/utils'

export default {
  props: {
    parent: {
      type: Object,
      required: true,
    },
  },

  mixins: [ FormListMixin ],

  components: {
    AddNewBtn,
    EditBtn,
    DeleteBtn,
    ConfirmationDialog,
    BulkActionSelector,
    FormSubmitButtons,
  },

  data: function () {
    return {
      bulkActions: [{text: 'Delete', action: 'delete-items', confirmation: true, message: this.multiDeleteMsg}],
      max25chars: v => v.length <= 25 || 'Input too long!',
      priceRule: v => !v || parseFloat(v) == v || 'Number please!'
    }
  },

  computed: {
    title () {
      return this.parent ? `${this.parent.name} Variations` : 'Variations'
    },

    headers () {
      let h = [
                {
                  text: 'Sku',
                  value: 'sku',
                },
            ]
      this.parent.variableFeatures.forEach(e => {
        h.push({text: e.name, value:`vf__${e.slug}` })
      })
      h.push(
              {
                text: 'Price',
                value: 'price',
              },

              {
                text: 'Sale Price',
                value: 'salePrice',
              },

              {
                align: 'right',
                sortable: false,
                text: 'Actions',
                value: 'actions',
              })

      return h
    },

    submitDisabled () {
      return this.editedItem.some(e => !e.sku)
    },

    prodVF () {
      if(!this.parent.variableFeatures) return []
      return this.parent.variableFeatures.map(e => ({colName: `item.vf__${e.slug}`, slug: e.slug}))
    },

    // return product.variableFeatures Array values maped as an Object with variableFeatures slug as properties
    productVFasObj () {
    //  if(!this.parent || !Array.isArray(this.parent.variableFeatures)) return {}
      return this.parent.variations
      // return this.parent.variableFeatures.reduce((acc, e) => {
      //   console.log(e.slug + '....')
      //   acc[e.slug] = e
      //   return acc
      // }, {})
    },


  },

  methods: {
    formatDate (date) {
      return parseDate(date)
    },

    productPrice (item) {
      return item.price
    },

    generateAllPossibleProductVariations () {
      const allVfConfig = this.generateAllFeaturesConfig(this.parent.variableFeatures)
      // console.log('allVfConfig %o', allVfConfig)
      this.editedItem = this.unionWithExistentVariations(allVfConfig, this.editedItem)
      // console.log('this.editedItem  %o',this.editedItem )
    },

    generateAllFeaturesConfig (vf) {
      if(!vf) throw new Error('Array expected')
      const spreadedArr = vf.map(e => {
        return { vfSlug: e.slug, fiSlugArr: e.items.map(f => f.slug) }
      })

      return spreadedArr.reduce(function (acc, e) {
        let zip = []
        acc.forEach(item => {
          e.fiSlugArr.forEach(slug => {
            // let combItem = Object.assign({}, item, {[e.vfSlug]:slug})
            zip.push(Object.assign({}, item, {[e.vfSlug]:slug}))
          })
        })
        return zip
      }, [{}])
    },

    unionWithExistentVariations (vfConfigArr, existentVariationsArr = []) {
      // add compStr to existent variations
      const currentVariations = existentVariationsArr.map(v => {
        v.compStr = this.featuresConfigAsSortedString(v.featuresConfig)
        return v
      })
      // add compStr to vfConfigArr
      let enhancedVfConfigArr = vfConfigArr.map(e => ({
        compStr: this.featuresConfigAsSortedString(e),
        featuresConfig: e
      }))

      // keep the existent one, create new variations
      const variations = enhancedVfConfigArr.map(e => {
        let prod = currentVariations.find(p => p.compStr == e.compStr)
        return prod ? prod : this.createNewVariationForConfig(e.featuresConfig, e.compStr)
      })

      return variations
    },

    createNewVariationForConfig (featuresConfig, fcAsString) {
      if(!fcAsString) {
        fcAsString = this.featuresConfigAsSortedString(featuresConfig)
      }

      const variation = {
        id: newItemIdPrefix + fcAsString,
        featuresConfig: featuresConfig,
        sku: '',
        price: '',
        salePrice: '',
      }
      return this.add__VfItemKey(variation)
    },

    featuresConfigAsSortedString (featuresConfig) {
      return Object.keys(featuresConfig).map(e => `${e}:${featuresConfig[e]}`).sort().join(',')
    },

    // add for each variation properties 'vf__vfSlug': vf.Name for proper display in table
    add__VfItemKey (item) {
      Object.keys(item.featuresConfig).map(fc => {
        item['vf__' + fc] = this.featureItemName(fc, item.featuresConfig[fc])
      })
      return item
    },

    featureItemName (vfSlug, fiSlug) {
      if(!this.parent || !this.parent.variableFeatures) return ''
      const vf = this.parent.variableFeatures.find(e => e.slug == vfSlug)
      if(!vf) return ''
      const item = vf.items.find(e => e.slug == fiSlug)
      return item ? item.name : ''
    },

    parseProvidedItems (items) {
      let copy = jsonCopy(items)
      return copy.map(e => this.add__VfItemKey(e))
    },

    deleteChoosenItem (val) {
      let index = this.editedItem.findIndex(e => e.id == val)
      if(index != -1){
        this.editedItem.splice(index, 1)
      }
    },

    deleteSelectedItems (idArr) {
      this.editedItem = this.editedItem.filter(e => idArr.indexOf(e.id) == -1)
      this.selected = []
    },
    // disable edit for new created items that are not yet stored in DB
    disableItemEdit (item) {
      return isGeneratedVariationId(item.id)
    },

   //  save () {
   //   this.snack = true
   //   this.snackColor = 'success'
   //   this.snackText = 'Data saved'
   // },
   // cancel () {
   //   this.snack = true
   //   this.snackColor = 'error'
   //   this.snackText = 'Canceled'
   // },
   // open () {
   //   this.snack = true
   //   this.snackColor = 'info'
   //   this.snackText = 'Dialog opened'
   // },
   // close () {
   //   console.log('Dialog closed')
   // },

   parseForUpdate (itemsArr) {
     return itemsArr.map(e => ({
       id: e.id,
       sku: e.sku,
       featuresConfig: e.featuresConfig,
       price: parseFloat(e.price),
       salePrice: parseFloat(e.salePrice),
     }))
   },

   updateItem () {
     this.$emit('update-item', this.parseForUpdate(this.editedItem))
   },
  },

  created () {
    this.$on('delete-item', this.deleteChoosenItem)
    this.$on('delete-items', this.deleteSelectedItems)
  },
}
</script>
