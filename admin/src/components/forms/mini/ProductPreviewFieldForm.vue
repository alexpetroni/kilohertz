<template>
  <v-card class="my-0">
    <v-card-text>
      <v-text-field
      v-model="item.title"
      label="Title"
      ></v-text-field>

      <v-text-field
      v-model="item.content"
      label="Content"
      ></v-text-field>

      <AttachmentForm
      v-model="item.image"
      title="Image"
      />

    </v-card-text>
  </v-card>
</template>

<script>
import AttachmentForm from '@/components/forms/mini/AttachmentForm'

export default {
  components: {
    AttachmentForm,
  },

  model: {
    model: {
      prop: 'item',
    },
  },

  props: {
    item: {
      type: Object,
      required: true,
    }
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

  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
