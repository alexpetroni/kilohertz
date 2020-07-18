<template>
  <div>
    <ProductAttachmetsSetsRL
    :product="product"
    :variation="variation"
    :field="field"
    :nameArr="nameArr"
    v-slot="{sets}"
    >

    <v-card v-if="haveAttachments(sets)">
      <v-card-text>
      <base-material-tabs color="warning">
      <template v-for="tab in parseSets(sets)">
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
      </base-material-tabs>
    </v-card-text>
    </v-card>
  </ProductAttachmetsSetsRL>
  </div>
</template>

<script>
import ProductAttachmetsSetsRL from '@/components/rl/ProductAttachmetsSetsRL'
import AttachmentFileLink from '@/components/layouts/product/AttachmentFileLink'
export default {

  components: {
    ProductAttachmetsSetsRL,
    AttachmentFileLink,
  },

  props: {
    product: {
      type: String,
      required: true,
    },

    variation: {
      type: String
    },

    setsArr: {
      type: Array,
      required: true,
    },

    field: {
      type: String,
      default: 'id'
    }
  },

  data () {
    return {
    }
  },

  computed: {
    nameArr () {
      return this.setsArr.map(e => e.slug)
    }
  },

  watch: {

  },

  methods: {
    haveAttachments (obj) {
      return obj && Object.keys(obj).length
    },

    parseSets (sets) {
      return this.setsArr.reduce((acc, e) => {
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
