<template>
  <div class="my-2">
  <template v-if="isVideo">
    <iframe width="200" height="150"
    :src="attachment.path"
    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
  </template>
  <template v-else>
    <router-link :to="url">
      {{ fileTitle }}
    </router-link>
  </template>
  </div>
</template>

<script>
import { imgUrl } from '@common/utils'
export default {

  components: {

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
    attachment: {
      type: Object,
      required: true,
    },

    transformation: {
      type: Array,
    },
  },

  data () {
    return {

    }
  },

  computed: {
    url () {
      return imgUrl(this.attachment.path)
    },

    fileTitle () {
      return this.attachment.title || this.attachment.path
    },

    isVideo () {
      return this.attachment.type == 'videoUrl'
    }
  },

  watch: {

  },

  methods: {

  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
