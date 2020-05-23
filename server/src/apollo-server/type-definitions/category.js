const typeDef = `

  extend type Query {
    category(id: ID!): Category

    categories(args: JSON): [Category!]!
    searchCategories(args: JSON): [Category!]!
    paginatedCategories(args: JSON): PaginatedCategories!
  }

  extend type Mutation {
    createCategory(input: CategoryInput!): Category
    updateCategory(id: ID!, input: CategoryInput!): Category
    deleteCategory(id: ID!): ID
    deleteCategories(idArr: [ID!]!): [ID!]!
  }

  type Category {
    id: ID!
    createdAt: Date
    updatedAt: Date
    name: String
    slug: String
    description: String
    order: Int
    parent: String # parent id
    ancestors: [String!] # anestors id
    image: String
  }

  input CategoryInput {
    id: ID
    name: String
    slug: String
    description: String
    order: Int
    parent: String
    ancestors: [String!]
    image: String
  }

  type PaginatedCategories{
    total: Int
    items: [Category!]!
  }

`
module.exports = typeDef
