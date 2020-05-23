<script>
import { deleteObjFields, PRODUCT_TYPE } from '@common/utils'
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import Product from '@common/graphql/product/Product.gql'
import CreateProduct from '@common/graphql/product/CreateProduct.gql'
import UpdateProduct from '@common/graphql/product/UpdateProduct.gql'
import DeleteProduct from '@common/graphql/product/DeleteProduct.gql'

export default {
  extends: BaseItemFormModel,

  data () {
    return {
    }
  },

  methods: {
    getDefaultItem () {
      return {
        type: PRODUCT_TYPE.SIMPLE,
        name: '',
        slug: '',
        sku: '',

        published: null,

        displayOrder: 5,

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
        vat: null,

        saleIsActive: null,
        saleType: null,

        inStock: null,
        stock: null,

        saleStartDate: null,
        saleEndDate: null,

        brand: '',

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

        previewFields: this.getNewPreviewFields(),
      }
    },

    getNewPreviewFields () {
      let arr = []
      for(let i = 0; i < 3; i++){
          arr.push({title: '', content: '', image: null})
      }
      return arr
    },

    async createItem (item, key) {
      let { data: { createProduct } } = await this.$apollo.mutate({
        mutation: CreateProduct,
        variables: {input:item, ...key},
      })
      return createProduct
    },

    async loadItem (key) {
      let { data: { product } } = await this.$apollo.query({
        query: Product,
        variables: key,
      })
      return product
    },

    async updateItem (item, key) {
      let input = this.parseItemForInput(item)
      let { data: { updateProduct } } = await this.$apollo.mutate({
        mutation: UpdateProduct,
        variables: {...key, input },
      })
      return updateProduct
    },

    async deleteItem (key) {
      let { data: { deleteProduct } } = await this.$apollo.mutate({
        mutation: DeleteProduct,
        variables: key,
      })
      return deleteProduct
    },

    parseItemForInput (item) {
      return deleteObjFields(item, ['__typename'])
    },

  },
}
</script>
