<script>
import { deleteObjFields, PRODUCT_TYPE, SALE_TYPE } from '@common/utils'
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import Product from '@common/graphql/product/Product.gql'
import CreateProduct from '@common/graphql/product/CreateProduct.gql'
import UpdateProductVariation from '@common/graphql/product/UpdateProductVariation.gql'
import DeleteProduct from '@common/graphql/product/DeleteProduct.gql'

export default {
  extends: BaseItemFormModel,

  props: {
    parentId: {
      type: String,
      required: true,
    }
  },

  methods: {
    getDefaultItem () {
      return {
        type: PRODUCT_TYPE.VARIATION,
        name: '',
        sku: '',

        published: false,

        excerpt: '',
        description: '',

        technicalInformation: '',

        currency: '',

        price: null,
        volumePrice: '',

        salePrice: null,
        saleVolumePrice: '',

        regularPrice: null,
        regularVolumePrice: '',

        discount: null,

        saleIsActive: null,
        saleType: SALE_TYPE.ACTION,

        inStock: null,
        stock: null,

        saleStartDate: null,
        saleEndDate: null,

        image: '',

        sizeWidth: null,
        sizeHeight: null,
        sizeLength: null,
        sizeUnit: 'cm',

        weightNet: null,
        weightGross: null,
        weightUnit: 'kg',

        packageWidth: null,
        packageHeight: null,
        packageLength: null,
        packageSizeUnit: '',

        packageWeight: null,
        packageWeightUnit: '',

        packaging: '',
      }
    },

    parentKey () {
      return { parentId: this.parentId }
    },

    async createItem (item, key) {
      let { data: { createProduct } } = await this.$apollo.mutate({
        mutation: CreateProduct,
        variables: {input:item, ...key},
      })
      return createProduct
    },

    async loadItem (key, fetchPolicy = 'network-only') {
      const variables = Object.assign({}, key, {raw: true})
      let { data: { product } } = await this.$apollo.query({
        query: Product,
        variables,
        fetchPolicy,
      })
      return product
    },

    async updateItem (item, key) {
      let input = this.parseItemForInput(item)
      console.log('input updateItem %o', item )
      console.log('variables updateItem %o', {...key, input } )
      let { data: { updateProductVariation } } = await this.$apollo.mutate({
        mutation: UpdateProductVariation,
        variables: {...key, input },
      })
      return updateProductVariation
    },

    async deleteItem (key) {
      let { data: { deleteProduct } } = await this.$apollo.mutate({
        mutation: DeleteProduct,
        variables: key,
      })
      return deleteProduct
    },

    parseItemForInput (item) {
      return deleteObjFields(item, ['__typename', 'saleIsActive'])
    },

  },
}
</script>
