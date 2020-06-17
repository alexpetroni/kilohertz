<template>
  <v-img v-if="this.path" :src="imgUrl(this.path, this.transformation)" />
</template>

<script>

  export default {
    props: {
      path: {
        type: String,
      },

      transformation: {
        type: Array
      },
    },
  }
</script>
