const resolvers = {
  Query: {
    linkedProducts (_, { field, value, linkType, allVariations }, context) {
      return context.models.LinkedProducts.linkedProducts(field, value, linkType, allVariations)
    }
  },

  Mutation: {
    updateLinkedProducts(_, { productId, linkType, inputArr }, context){
      return context.models.LinkedProducts.updateLinkedProducts(productId, linkType, inputArr)
    },

    deleteLinkedProducts(_, { id }, context){
      return context.models.LinkedProducts.deleteLinkedProducts(id)
    },

    deleteAllLinkedProducts(_, { productId }, context){
      return context.models.LinkedProducts.deleteAllLinkedProducts(productId)
    },
  }
}

module.exports = resolvers
