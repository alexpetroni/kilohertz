<template>
  <VariableFeatureSetLoader
  :slug="vfSlug"
  v-slot="{variableFeatureSet}"
  ref="vfLoader"
  >
  <v-card>
    <template v-if="variableFeatureSet">

    <v-toolbar flat>
          <v-btn
          v-if="isReordable"
          title="Drag to reorder"
          icon
          class="handle"
          >
            <v-icon>mdi-drag-vertical</v-icon>
          </v-btn>

          <v-btn
          icon
          @click="toggleContent"
          >
          <v-icon
          class="">{{ showContentIcon }}</v-icon>
          </v-btn>

          <div style="width: 150px;" class="mt-6 ml-2">
            <v-checkbox
            v-model="allItemsSelected"
            :label="selectAllLabel"
            />
          </div>

      <v-toolbar-title>{{ title(variableFeatureSet) }}</v-toolbar-title>

      <v-spacer/>
      <div class="text-right" style="width: 150px;">
      <DeleteBtn @click="$emit('delete', variableFeatureSet)" />
      </div>
    </v-toolbar>
    <v-container v-show="showContent">
      <v-row>
        <template v-for="item in variableFeatureSet.items">
          <v-col
          :key="item.slug"
          xs="6"
          sm="4"
          md="2"
          >
          <v-checkbox
          :label="item.name"
          :value="item.slug"
          v-model="vfItems"
          multiple
          ></v-checkbox>
          </v-col>
        </template>
      </v-row>
  </v-container>
  </template>
  </v-card>
</VariableFeatureSetLoader>
</template>

<script>
import VariableFeatureSetLoader from '@/components/rl/VariableFeatureSetLoader'
import DeleteBtn from '@common/components/btn/DeleteBtn'

export default {
  components: {
    VariableFeatureSetLoader,
    DeleteBtn,
  },

  model: {
    prop: 'items',
    event: 'change'
  },

  props: {
    vfSlug: {
      type: String,
      required: true,
    },

    items: {
      type: Array,
      default: () => []
    },

    isReordable: {
      type: Boolean,
    }
  },

  data () {
    return {
      showContent: true,
      vfSet: null,
    }
  },

  computed: {
    vfItems: {
      get () {
        return this.items
      },

      set (val) {
        this.$emit('change', val)
      }
    },

    allItemsSelected: {
      get () {
        return this.vfSetItemsSlugs.length == this.vfItems.length
      },

      set (val) {
        if(val){
          this.$emit('change', this.vfSetItemsSlugs)
        }else{
          this.$emit('change', [])
        }
      }
    },

    selectAllLabel () {
      return this.allItemsSelected ? "Deselect All" : "Select All"
    },

    vfSetItemsSlugs () {
      if(!this.vfSet || !this.vfSet.items) return []
      return this.vfSet.items.map(e => e.slug)
    },

    showContentIcon () {
      return this.showContent ? 'mdi-minus-box-outline' : 'mdi-plus-box-outline'
    },


  },

  methods: {
    toggleContent () {
      this.showContent = !this.showContent
    },

    title (vfSet) {
      if(!vfSet) return ''
      this.vfSet = vfSet
      return this.vfSet.name
    }
  },
}
</script>
