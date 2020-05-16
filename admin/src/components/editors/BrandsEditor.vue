<template>
  <BrandsListFormModel
  v-slot="{items, tableOptions, totalItems, formEvents}"
  >
    <BrandsListForm
      :items="items"
      :options="tableOptions"
      :totalItems="totalItems"
      :formEvents="formEvents"
    />
  </BrandsListFormModel>
</template>

<script>
import BrandsListFormModel from '@/components/models/BrandsListFormModel'
import BrandsListForm from '@/components/forms/BrandsListForm'

export default {
  components: {
    BrandsListFormModel,
    BrandsListForm,
  },
}
</script>
