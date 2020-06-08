<template>
  <CategoriesRL
  id="categories"
  v-slot="{item, loading}">
  <v-row>
    <div v-if="loading">
      loading
    </div>

    <template v-else>
      <v-col
      sm="6" md="4"
      v-for="cat in item"
      :key="cat.category.id"
      >
      <base-material-card
        color="transparent"
        hover-reveal
        image
      >
        <template v-slot:image>
          <!-- <v-img
            src="https://demos.creative-tim.com/vue-material-dashboard-pro/img/card-1.jpg"
          /> -->
          <div @click="showCategory(cat)">
          <ImgKit
          :path="imgPath(cat)"
          :transform="[{w: 400}]"
          style="max-width: 100%;"

          />
        </div>
        </template>

        <template v-slot:reveal-actions>
          <v-tooltip bottom>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                class="mx-1"
                v-bind="attrs"
                icon
                v-on="on"
              >
                <v-icon>mdi-tag-heart-outline</v-icon>
              </v-btn>
            </template>

            <span>{{ tooltipText(cat, 0) }}</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                class="mx-1"
                color="success"
                light
                icon
                v-on="on"
              >
                <v-icon class="success--text">
                  mdi-trophy
                </v-icon>
              </v-btn>
            </template>

            <span>{{ tooltipText(cat, 1) }}</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                class="mx-1"
                color="error"
                light
                icon
                v-on="on"
              >
                <v-icon class="error--text">
                  mdi-star-face
                </v-icon>
              </v-btn>
            </template>

            <span>{{ tooltipText(cat, 2) }}</span>
          </v-tooltip>
        </template>

        <v-card-title class="justify-center font-weight-light"  @click="showCategory(cat)">
          {{ categoryName(cat) }}
        </v-card-title>

        <v-card-text class="body-1 text-center mb-3 font-weight-light grey--text">
          {{ categoryDescription(cat) }}
        </v-card-text>

        <template v-slot:actions>
          <div class="display-2 font-weight-light grey--text">
            from CHF {{ randomPrice() }}
          </div>

          <v-spacer />

          <span class="caption grey--text font-weight-light">
            <v-icon small color="orange">mdi-fire</v-icon>

            up to {{ randomDiscount() }}% dicount
          </span>
        </template>
      </base-material-card>
      </v-col>
    </template>
  </v-row>
  </CategoriesRL>
</template>

<script>
import CategoriesRL from '@/components/rl/CategoriesRL'
import ImgKit from '@common/components/img/ImgKit'

export default {
  name: '',

  components: {
    CategoriesRL,
    ImgKit,
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

  },

  data () {
    return {

    }
  },

  computed: {

  },

  watch: {

  },

  methods: {
    tooltipText (item, index) {
      let text = ''
      if(item && item.meta && item.meta.previewFields && item.meta.previewFields[index] && item.meta.previewFields[index]['title']){
        text = item.meta.previewFields[index]['title']
      }
      return text
    },

    imgPath (item) {
      return item.category.image ? item.category.image : ''
    },

    categoryName (item) {
      return item.category.name ? item.category.name : ''
    },

    categoryDescription (item) {
      return item.meta && item.meta.description ? item.meta.description : ''
    },

    showCategory (cat) {
      this.$emit('show-category', cat.category.id)
    },

    randomPrice () {
      let price = 25 + 100 * Math.random()
      return Math.round(price)
    },

    randomDiscount () {
      let disc = 10 + 25 * Math.random()
      return Math.round(disc)
    },
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
