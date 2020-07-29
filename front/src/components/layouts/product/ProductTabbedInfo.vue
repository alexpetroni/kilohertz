<template>
  <v-card v-if="hasTabs">
  <v-card-text>
  <base-material-tabs color="warning">
  <template v-for="tab in tabs">
  <v-tab
    :key="`#tab-${tab.slug}`"
    :href="`#tab-${tab.slug}`"
  >
    {{ tab.title }}
  </v-tab>
  </template>

  <template v-for="tab in parseSets(attSets)">
  <v-tab
    :key="`#tab-${tab.slug}`"
    :href="`#tab-${tab.slug}`"
  >
    {{ tab.title }}
  </v-tab>

    <v-tab-item
    :key="tab.slug"
    :value="`tab-${tab.slug}`"
    >
    <template v-for="(f, index) in tab.attachments">
      <AttachmentFileLink :attachment="f" :transformation="[]" :key="f.path + index" />
    </template>
    </v-tab-item>
    </template>

  <v-tab-item
  v-if="hasLongDescription"
  value="tab-long-description"
  v-html="longDescription"
  >
  </v-tab-item>


  <v-tab-item
  v-if="hasTechnicalInformation"
  value="tab-technical-information"
  >
  <ProductTechnicalInformationTable
  :textContent="technicalInformation"
  />
  </v-tab-item>

    <!-- <v-tab-item
    :key="tab.slug"
    :value="`tab-${tab.slug}`"
    >
    <template v-for="(f, index) in tab.attachments">
      <AttachmentFileLink :attachment="f" :transformation="[]" :key="f.path + index" />
    </template>
    </v-tab-item> -->
  </base-material-tabs>
</v-card-text>
</v-card>
</template>

<script>
import ProductTechnicalInformationTable from '@/components/layouts/product/ProductTechnicalInformationTable'
import AttachmentFileLink from '@/components/layouts/product/AttachmentFileLink'

export default {

  components: {
    ProductTechnicalInformationTable,
    AttachmentFileLink,
  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [],

  model: {

  },

  props: {
    longDescription: String,
    technicalInformation: String,
    attSets: Object,
    attNameArr: Array,
  },

  data () {
    return {

    }
  },

  computed: {
    hasTabs () {
      return this.hasLongDescription || this.hasTechnicalInformation
    },

    tabs () {
      let tabs = []
      if(this.hasLongDescription) {
        tabs.push({ title: "Beschreibung", slug: 'long-description' })
      }

      if(this.hasTechnicalInformation) {
        tabs.push({ title: "Technische Daten", slug: 'technical-information' })
      }
      return tabs
    },

    hasLongDescription () {
      return !!this.longDescription
    },

    hasTechnicalInformation () {
      return !!this.technicalInformation
    },

    hasAttachmentsSets () {
      return this.attSets && Object.keys(this.attSets).length
    },
  },

  watch: {

  },

  methods: {
    parseSets (sets) {
      return this.attNameArr.reduce((acc, e) => {
        if(sets[e.slug]){
          let t = Object.assign({}, e, {attachments: sets[e.slug]})
          acc.push(t)
        }
        return acc
      }, [])
    },

    fileName (attachment = {}) {
      return attachment.title || attachment.path
    },
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
