<script>
import { deleteObjFields } from '@common/utils'
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import VariableFeatureSet from '@common/graphql/variable-feature/VariableFeatureSet.gql'
import CreateVariableFeatureSet from '@common/graphql/variable-feature/CreateVariableFeatureSet.gql'
import UpdateVariableFeatureSet from '@common/graphql/variable-feature/UpdateVariableFeatureSet.gql'
import DeleteVariableFeatureSet from '@common/graphql/variable-feature/DeleteVariableFeatureSet.gql'

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
      let { data: { createVariableFeatureSet } } = await this.$apollo.mutate({
        mutation: CreateVariableFeatureSet,
        variables: {input:item, ...key},
      })
      return createVariableFeatureSet
    },

    async loadItem (key) {
      await new Promise((res) => {
        setTimeout(res, 3000)
      })
      let { data: { variableFeatureSet } } = await this.$apollo.query({
        query: VariableFeatureSet,
        variables: key,
      })
      return variableFeatureSet
    },

    async updateItem (item, key) {
      let input = this.parseItemForInput(item)
      let { data: { updateVariableFeatureSet } } = await this.$apollo.mutate({
        mutation: UpdateVariableFeatureSet,
        variables: {...key, input },
      })
      return updateVariableFeatureSet
    },

    async deleteItem (key) {
      let { data: { deleteVariableFeatureSet } } = await this.$apollo.mutate({
        mutation: DeleteVariableFeatureSet,
        variables: key,
      })
      return deleteVariableFeatureSet
    },

    parseItemForInput (item) {
      return deleteObjFields(item, ['__typename'])
    },

  },
}
</script>
