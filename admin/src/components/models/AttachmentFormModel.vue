<script>
import { deleteObjFields } from '@common/utils'
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import Attachment from '@common/graphql/attachment/Attachment.gql'
import DeleteAttachment from '@common/graphql/attachment/DeleteAttachment.gql'

export default {
  extends: BaseItemFormModel,

  methods: {
    getDefaultItem () {
      return {
        fileId: '',
        type: '',
        name: '',
        path: '',
        filePath: '',
        tags: '',
        isPrivateFile : false,
        customCoordinates : null,
        url: '',
        thumbnail: '',
        fileType: 'image',
      }
    },

    async loadItem (key) {
      let { data: { attachment } } = await this.$apollo.query({
        query: Attachment,
        variables: key,
      })
      return attachment
    },

    async deleteItem (key) {
      let { data: { deleteAttachment } } = await this.$apollo.mutate({
        mutation: DeleteAttachment,
        variables: key,
      })
      return deleteAttachment
    },

    parseItemForInput (item) {
      return deleteObjFields(item, ['__typename'])
    },

  },
}
</script>
