const typeDef = `

  extend type Query {
    attachment(id: ID!, args: JSON): Attachment
    attachments(idArr: [ID!]!, args: JSON): [Attachment!]!
    searchAttachments(args: JSON): [Attachment!]!
    paginatedAttachments(args: JSON): PaginatedAttachments!
  }

  extend type Mutation {
    createAttachment(input: AttachmentInput!): Attachment
    updateAttachment(id: ID!, input: AttachmentInput!): Attachment
    deleteAttachment(id: ID!): String
    deleteAttachments(idArr: [ID!]!): [ID!]!
  }

  type Attachment {
    public_id: ID!
    createdAt: Date
    type: String
    resource_type: String
    filename: String
    format: String
    folder: String
    mimetype: String
    tags: [String!]
    title: String
    description: String
    url: String
    secure_url: String


    width: Int
    height: Int

  }

  input AttachmentInput {
    filename: String
    format: String
    folder: String
    mimetype: String
    type: String
    tags: [String!]
    title: String
    description: String
    url: String
    secureUrl: String

    # for images only
    width: Int
    height: Int
  }

  type PaginatedAttachments{
    nextCursor: String,
    total: Int,
    items: [Attachment!]!
  }

`
module.exports = typeDef
