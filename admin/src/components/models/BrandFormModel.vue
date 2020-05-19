<script>
import { deleteObjFields } from '@common/utils'
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import Brand from '@common/graphql/brand/Brand.gql'
import CreateBrand from '@common/graphql/brand/CreateBrand.gql'
import UpdateBrand from '@common/graphql/brand/UpdateBrand.gql'
import DeleteBrand from '@common/graphql/brand/DeleteBrand.gql'

export default {
  extends: BaseItemFormModel,

  data () {
    return {
    }
  },

  methods: {
    getDefaultItem () {
      return {
        name: '',
        slug: '',
        logo: '',
      }
    },

    async createItem (item, key) {
      let { data: { createBrand } } = await this.$apollo.mutate({
        mutation: CreateBrand,
        variables: {input:item, ...key},
      })
      return createBrand
    },

    async loadItem (key) {
      await new Promise((res) => {
        setTimeout(res, 3000)
      })
      let { data: { brand } } = await this.$apollo.query({
        query: Brand,
        variables: key,
      })
      return brand
    },

    async updateItem (item, key) {
      let input = this.parseItemForInput(item)
      let { data: { updateBrand } } = await this.$apollo.mutate({
        mutation: UpdateBrand,
        variables: {...key, input },
      })
      return updateBrand
    },

    async deleteItem (key) {
      let { data: { deleteBrand } } = await this.$apollo.mutate({
        mutation: DeleteBrand,
        variables: key,
      })
      return deleteBrand
    },

    parseItemForInput (item) {
      return deleteObjFields(item, ['__typename'])
    },

  },
}
</script>
