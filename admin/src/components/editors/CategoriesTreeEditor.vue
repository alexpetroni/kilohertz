<template>
  <CategoriesTreeFormModel
    id="categories"
    busEventName="category-tree"
    v-slot="{item, modelState, crudEvents}"
    v-on="pipeUp('item-created', 'item-updated', 'item-deleted')"
    :reloadAfterCreate="true"
    :reloadAfterUpdate="true"
    >
      <CategoriesTreeForm
        :item="item"
        v-bind="modelState"
        v-on="Object.assign({}, crudEvents, pipeUp('new-item', 'edit-item'))"
      />
  </CategoriesTreeFormModel>
</template>

<script>
import CategoriesTreeFormModel from '@/components/models/CategoriesTreeFormModel'
import CategoriesTreeForm from '@/components/forms/CategoriesTreeForm'
import { pipeEvents } from '@common/utils'

export default {
  name: 'CategoriesTreeEditor',

  components: {
    CategoriesTreeFormModel,
    CategoriesTreeForm,
  },

  methods: {
    pipeUp (...events) {
      return pipeEvents(this, ...events)
    },
  },

}
</script>
