const resolvers = {
  Query: {
    variableFeature (_, { id }, context) {
      return context.models.VariableFeature.variableFeature(id)
    },

    variableFeatureBySlug (_, { slug }, context) {
      return context.models.VariableFeature.variableFeatureBySlug(slug)
    },

    variableFeatures (_, { idArr }, context) {
      return context.models.VariableFeature.variableFeatures(idArr)
    },

    variableFeaturesBySlug (_, { slugArr }, context) {
      return context.models.VariableFeature.variableFeaturesBySlug(slugArr)
    },

    searchVariableFeatures (_, { args, loadItems }, context) {
      return context.models.VariableFeature.searchVariableFeatures(args, loadItems)
    },

    paginatedVariableFeatures (_, { args }, context) {
      return context.models.VariableFeature.paginatedVariableFeatures(args)
    },

    variableFeatureItem (_, { id }, context) {
      return context.models.VariableFeature.variableFeatureItem(id)
    },

    variableFeatureItems (_, { idArr }, context) {
      return context.models.VariableFeature.variableFeatureItems(idArr)
    },

  },

  Mutation: {
    createVariableFeature(_, { input }, context){
      return context.models.VariableFeature.createVariableFeature(input)
    },

    updateVariableFeature(_, { id, input }, context){
      return context.models.VariableFeature.updateVariableFeature(id, input)
    },

    deleteVariableFeature(_, { id }, context){
      return context.models.VariableFeature.deleteVariableFeature(id)
    },

    deleteVariableFeatures(_, { idArr }, context){
      return context.models.VariableFeature.deleteVariableFeatures(idArr)
    },

    createVariableFeatureItem(_, { parentId, input }, context){
      return context.models.VariableFeature.createVariableFeatureItem(parentId, input)
    },

    updateVariableFeatureItem(_, { parentId, id, input }, context){
      return context.models.VariableFeature.updateVariableFeatureItem(parentId, id, input)
    },

    deleteVariableFeatureItem(_, { parentId, id }, context){
      return context.models.VariableFeature.deleteVariableFeatureItem(parentId, id)
    },

    deleteVariableFeatureItems(_, { parentId, idArr }, context){
      return context.models.VariableFeature.deleteVariableFeatureItems(parentId, idArr)
    },
  }
}



module.exports = resolvers
