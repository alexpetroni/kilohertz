<template>
  <iframe
  :width="width"
  :height="height"
  :src="src" frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>
</template>

<script>

  export default {

    components: {
    },

    props: {
      src: {
        type: String,
        required: true,
      },

      width: {
        type: [String, Number],
        default: 500
      },

      height: {
        type: [String, Number],
        default: 300
      },
    },
  }
</script>
