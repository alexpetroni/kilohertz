const resolvers = {
  Query: {

    attachment (_, { id, args }, context) {
      return context.models.Attachment.attachment(id, args)
    },

    attachments (_, { idArr, args }, context) {
      return context.models.Attachment.attachments(idArr, args)
    },

    searchAttachments (_, { args }, context) {
      return context.models.Attachment.searchAttachments(args)
    },

    paginatedAttachments (_, { args }, context) {
      return context.models.Attachment.paginatedAttachments(args)
    },
  },

  Mutation: {
    createAttachment(_, { input }, context){
      return context.models.Attachment.createAttachment(input)
    },

    updateAttachment(_, { id, input }, context){
      return context.models.Attachment.updateAttachment(id, input)
    },

    deleteAttachment(_, { id }, context){
      return context.models.Attachment.deleteAttachment(id)
    },

    deleteAttachments(_, { idArr }, context){
      return context.models.Attachment.deleteAttachments(idArr)
    },
  },

}

module.exports = resolvers
