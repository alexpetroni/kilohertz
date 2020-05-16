<script>
import BasePagListFormModel from '@common/models/BasePagListFormModel'
import PaginatedBrands from '@common/graphql/brand/PaginatedBrands.gql'

export default {
  extends: BasePagListFormModel,

  data () {
    return {
    }
  },

  methods: {
    async loadPage (queryVars, fetchPolicy) {
      try{
        let { data:{paginatedBrands} } = await this.$apollo.query({
          query: PaginatedBrands,
          variables: queryVars,
          fetchPolicy,
        })
        return {
          items: paginatedBrands.items,
          total: paginatedBrands.total,
        }
      }catch(error){
        throw new Error(error)
      }
    },
  },
}
</script>
