const typeDef = `

  extend type Query {
    variableFeature(id: ID!): VariableFeature
    variableFeatureBySlug(slug: String!): VariableFeature

    variableFeatures(idArr: [ID!]!): [VariableFeature!]!
    variableFeaturesBySlug(slugArr: [String!]!): [VariableFeature!]!

    searchVariableFeatures(args: JSON, loadItems:Boolean!): [VariableFeature!]!
    paginatedVariableFeatures(args: JSON): PaginatedVariableFeatures!

    variableFeatureItem(id: ID!): VariableFeatureItem
    variableFeatureItems(idArr: [ID!]!): [VariableFeatureItem!]!
  }

  extend type Mutation {
    createVariableFeature(input: VariableFeatureInput!): VariableFeature
    updateVariableFeature(id: ID!, input: VariableFeatureInput!): VariableFeature
    deleteVariableFeature(id: ID!): ID
    deleteVariableFeatures(idArr: [ID!]!): [ID!]!

    createVariableFeatureItem(parentId: ID!, input:VariableFeatureItemInput!): VariableFeatureItem
    updateVariableFeatureItem(parentId: ID!, id: ID!, input:VariableFeatureItemInput!): VariableFeatureItem
    deleteVariableFeatureItem(parentId: ID!, id: ID!): ID
    deleteVariableFeatureItems(parentId: ID!, idArr: [ID!]!): [ID!]!
  }

  enum VariableFeatureType {
    TEXT
    COLOR_HEX
    SVG
  }

  type VariableFeature {
    id: ID!
    createdAt: Date
    updatedAt: Date
    name: String
    slug: String
    description: String
    type: VariableFeatureType!
    items: [VariableFeatureItem!]
  }

  input VariableFeatureInput {
    name: String
    slug: String
    description: String
    type: VariableFeatureType
    items: [VariableFeatureItemInput!]
  }

  type VariableFeatureItem {
    id: ID!
    name: String
    slug: String
    description: String
    value: String
  }

  input VariableFeatureItemInput {
    name: String
    slug: String
    description: String
    value: String
  }

  type PaginatedVariableFeatures{
    total: Int
    items: [VariableFeature!]!
  }
`
module.exports = typeDef
