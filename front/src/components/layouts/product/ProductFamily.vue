<template>
  <div class="family-container">
    <div class="text--disabled text-right">Ähnliche<br />Produkte</div>
    <router-link
    v-for="p in products"
    :key="p.id"
    class="family-icons"
    :to="'/product/' + p.slug"
    :title="p.name"
    >
      <ImgKit
      :path="p.image"
      :transformation="[{w: 75, h: 75}]"
      style="max-width: 100%;"
      />
    </router-link>
  </div>
</template>

<script>
import ImgKit from '@common/components/img/ImgKit'

export default {
  props: {
    family: {
      type: Object,
    },

    excludeField: {
      type: String,
      default: 'sku',
    },

    excludeValue: {
      type: String,
    },
  },

  components: {
    ImgKit,
  },

  computed: {
    products () {
      return this.family && this.family.products && this.family.products.filter(e => e[this.excludeField] != this.excludeValue) || []
    }
  }

}
</script>
<style>
.family-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.family-icons {
  display: inline-block;
  padding-left: .75em;
}

.family-text {
  color: grey;
}
</style>
