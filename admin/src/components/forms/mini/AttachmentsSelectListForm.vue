<template>
  <v-container
    fluid
    tag="section"
  >
    <base-material-card
      inline
      icon="mdi-clipboard-text"
      title="Attachments Selector"
      class="px-5 py-3"
    >
    <v-btn absolute fab small top right icon @click="onCancel" class="pt-12"><v-icon small>mdi-close</v-icon></v-btn>
    <v-alert v-if="error" type="error">{{ error }}</v-alert>
    
    <v-data-iterator
      v-model="selected"
      :items="items"
      :options.sync="options"
      v-on="tableEvents"
      show-select
      item-key="fileId"
      :loading_xx="loading"
    >

      <template v-slot:header>
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
        </v-toolbar>
      </template>


      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.fileId"
            cols="12"
            sm="4"
            md="2"
            lg="2"
          >

          <base-material-card
            color="transparent"
            image
          >
              <template v-slot:image>
                <div class="thumbContainer">
                  <div class="mx-auto">
                <ImgKit :src="item.thumbnail" />
              </div>
                </div>
              </template>

              <v-card-text class="body-1 text-center mb-3 font-weight-light grey--text">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">{{ shortName(item.name) }} </span>
                </template>
                  <span>{{ item.name }}</span>
                </v-tooltip>
              </v-card-text>

              <template v-slot:actions>
                <v-spacer />

                <v-checkbox :multiple="multiple" dense v-model="selectedImages" :value="item.filePath"/>
              </template>
          </base-material-card>
            </v-col>
        </v-row>
      </template>

    </v-data-iterator>

    <template v-slot:actions>
      <v-spacer />
      <v-btn color="primary" @click="onSelect">Select</v-btn>
      <v-btn color="primary" @click="onCancel">Cancel</v-btn>
      <v-spacer />
    </template>

    </base-material-card>

  </v-container>
</template>

<script>
import FormPagListMixin from '@common/mixins/FormPagListMixin'
import ImgKit from '@common/components/img/ImgKit'

export default {
  props: {
    multiple: {
      type: Boolean,
    }
  },

  mixins: [ FormPagListMixin ],

  components: {
    ImgKit,
  },

  data () {
    return {
      selectedImages: [],
    }
  },

  methods: {
    shortName (str, length = 25) {
      if(str.length < length) return str
      return '...'+str.slice(-1 * length)
    },

    clearSelected () {
      this.selectedImages = []
    },

    onCancel () {
      this.$emit('cancel')
      this.clearSelected()
    },

    onSelect () {
      this.$emit('change', this.selectedImages)
      this.clearSelected()
    }
  },
}
</script>

<style>
.thumbContainer {
  width: 150px;
  height: 150px;
  text-align: center;
}
</style>
