<script>
import VariableFeatureSetBySlug from '@common/graphql/variable-feature/VariableFeatureSetBySlug.gql'

export default {
  props: {
    slug: {
      type: String,
    }
  },

  data () {
    return {
      variableFeatureSet: null,
    }
  },

  apollo: {
    variableFeatureSet: {
      query: VariableFeatureSetBySlug,
      variables () { return {slug: this.slug} },
      update: (data) => {
        return data.variableFeatureSetBySlug
      },
      skip () { return !this.slug }
    }
  },

  render() {
      return this.$scopedSlots.default({ variableFeatureSet: this.variableFeatureSet })
  }
}
</script>
