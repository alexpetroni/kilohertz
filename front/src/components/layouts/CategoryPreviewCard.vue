<template>
<base-material-card
  color="transparent"
  hover-reveal
  image
>
  <template v-slot:image>
    <div
    class="link"
    @click="showCategory">
    <v-img :src="imgUrl(category.image, [{w: 400}])" style="max-width: 100%;" />
  </div>
  </template>

  <template v-slot:reveal-actions>
    <v-tooltip
    v-for="(p, index) in previewFields"
    :key="index"
    bottom
    >
      <template v-slot:activator="{ attrs, on }">
        <v-img
        v-if="p.image"
        v-bind="attrs"
        v-on="on"
        :src="p.image"
        class="card-icon-preview mx-2 mt-2"
        />
      </template>

      <span>{{ p.title }}</span>
    </v-tooltip>
  </template>

  <v-card-title class="justify-center font-weight-light link"  @click="showCategory">
    {{ category.name }}
  </v-card-title>

  <v-card-text class="body-1 text-center mb-3 font-weight-light grey--text">
    {{ meta.description }}
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
</template>

<script>

export default {

  components: {

  },

  props: {
    fullCategory: {
      type: Object,
      required: true,
    }
  },

  data () {
    return {
      previewIcons: [
        { icon: 'mdi-tag-heart-outline', color: 'blue' },
        { icon: 'mdi-trophy', color: 'success'},
        { icon: 'mdi-star-face', color: 'error'},
      ],
    }
  },

  computed: {
    imgPath () {
      return this.category && this.category.image
    },

    previewFields () {
      if(!this.meta || !this.meta.previewFields) return []
      return this.meta.previewFields.map(e => {
        let { title, content } = e
        let image = e.image && this.imgUrl(e.image, [{w: 28, h: 28}])
        return {title, content, image}
      })
    },

    category () {
      return this.fullCategory && this.fullCategory.category ? this.fullCategory.category : {}
    },

    meta () {
      return this.fullCategory && this.fullCategory.meta ? this.fullCategory.meta : {}
    },
  },

  methods: {
    tooltipText (item, index) {
      let text = ''
      if(item && item.meta && item.meta.previewFields && item.meta.previewFields[index] && item.meta.previewFields[index]['title']){
        text = item.meta.previewFields[index]['title']
      }
      return text
    },

    categoryName (item) {
      return item.category.name ? item.category.name : ''
    },

    categoryDescription (item) {
      return item.meta && item.meta.description ? item.meta.description : ''
    },

    showCategory () {
      this.$emit('show-category', { id:this.category.id, slug: this.category.slug })
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
