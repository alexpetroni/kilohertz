<template>
  <div>
    <template v-if="isTextType">
      <v-select
      dense
      :items="feature.items"
      v-model="selectedItem"
      item-text="name"
      item-value="slug"
      :label="feature.name"
      :item-disabled="checkDisabled"
      />
    </template>

    <template v-if="isColorType">
      <v-select
        dense
        v-model="selectedItem"
        :items="feature.items"
        :label="feature.name"
        item-text="name"
        item-value="slug"
        :item-disabled="checkDisabled"
       >
         <template v-slot:selection="data">
             <v-avatar left>
               <v-icon :color="data.item.value">mdi-circle</v-icon>
               <!-- <v-img :src="data.item.avatar"></v-img> -->
             </v-avatar>
             {{ data.item.name }}
         </template>
         <template v-slot:item="data">
           <template v-if="typeof data.item !== 'object'">
             <v-list-item-content v-text="data.item"></v-list-item-content>
           </template>
           <template v-else>
             <v-list-item-avatar>
               <v-icon :color="data.item.value" :class="avatarStyle(data.item)">mdi-circle</v-icon>
             </v-list-item-avatar>
             <v-list-item-content>
               <v-list-item-title v-html="data.item.name"></v-list-item-title>
               <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
             </v-list-item-content>
           </template>
         </template>
       </v-select>
  </template>
  </div>
</template>

<script>
import   {
  isVfTextType,
  isVfColorType,
  } from '@common/utils'

export default {

  props: {
    feature: {
      type: Object,
      default: () => {}
    },

    selected: {
      type: String,
    },

    disabledOptions: {
      type: Array,
      default: () => []
    },
  },

  computed: {
    selectedItem: {
      get () {
        return this.selected
      },

      set (val) {
        this.$emit('change', val)
      }
    },

    isTextType () {
      return isVfTextType(this.feature.type)
    },

    isColorType () {
      return isVfColorType(this.feature.type)
    },
  },

  methods: {
    checkDisabled (item) {
      return this.disabledOptions.indexOf(item.slug) != -1
    },

    avatarStyle (item) {
      return this.checkDisabled(item) ? {disabledAvatar: true} : {}
    },
  }
}
</script>

<style>
.disabledAvatar {
  opacity: 0.3;
}
</style>
