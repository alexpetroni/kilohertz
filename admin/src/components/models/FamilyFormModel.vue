<script>
import { deleteObjFields } from '@common/utils'
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import Family from '@common/graphql/family/Family.gql'
import CreateFamily from '@common/graphql/family/CreateFamily.gql'
import UpdateFamily from '@common/graphql/family/UpdateFamily.gql'
import DeleteFamily from '@common/graphql/family/DeleteFamily.gql'

export default {
  extends: BaseItemFormModel,

  methods: {
    getDefaultItem () {
      return {
        name: '',
        slug: '',
        products: []
      }
    },

    async createItem (item, key) {
      let { data: { createFamily } } = await this.$apollo.mutate({
        mutation: CreateFamily,
        variables: {input:item, ...key},
      })
      return createFamily
    },

    async loadItem (key) {
      let { data: { family } } = await this.$apollo.query({
        query: Family,
        variables: key,
        fetchPolicy: 'network-only'
      })
      return family
    },

    async updateItem (item, key) {
      let input = this.parseItemForInput(item)
      console.log('input %o', input)
      let { data: { updateFamily } } = await this.$apollo.mutate({
        mutation: UpdateFamily,
        variables: {...key, input },
      })
      return updateFamily
    },

    async deleteItem (key) {
      let { data: { deleteFamily } } = await this.$apollo.mutate({
        mutation: DeleteFamily,
        variables: key,
      })
      return deleteFamily
    },

    parseItemForInput (item) {
      return deleteObjFields(item, ['__typename'])
    },

    parseResult (result) {
      let item = this.parseItemToMirrorDefaultModel(result)
      if(item.products && item.products.length){
        item.products = item.products.map(e => e.id)
      }
      return item
    },

    parseLoadResult (result) {
      return this.parseResult(result)
    },

    parseUpdateResult (result) {
      return this.parseResult(result)
    },

  },
}
</script>
