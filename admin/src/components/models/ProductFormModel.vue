<script>
import { deleteObjFields, PRODUCT_TYPE, SALE_TYPE } from '@common/utils'
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import Product from '@common/graphql/product/Product.gql'
import CreateProduct from '@common/graphql/product/CreateProduct.gql'
import UpdateProduct from '@common/graphql/product/UpdateProduct.gql'
import DeleteProduct from '@common/graphql/product/DeleteProduct.gql'

import UpdateProductVariableFeatures from '@common/graphql/product/UpdateProductVariableFeatures.gql'
import UpdateProductVariations from '@common/graphql/product/UpdateProductVariations.gql'

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
        saleType: SALE_TYPE.ACTION,

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

        variableFeatures: [],

        variations: [],
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

    async loadItem (key, fetchPolicy = 'network-only') {
      const variables = Object.assign({}, key, {raw: true})
      let { data: { product } } = await this.$apollo.query({
        query: Product,
        variables,
        fetchPolicy,
      })
      console.log('loadItem .... %o ', product)
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

    async updateProductVariableFeatures (inputArr, key) {
      let { data: { updateProductVariableFeatures } } = await this.$apollo.mutate({
        mutation: UpdateProductVariableFeatures,
        variables: {...key, inputArr },
      })
      return updateProductVariableFeatures
    },

    async updateProductVariations (inputArr, parentId) {
      console.log('inputArr %o key %o', inputArr, parentId)
      let { data: { updateProductVariations } } = await this.$apollo.mutate({
        mutation: UpdateProductVariations,
        variables: {parentId, inputArr },
      })
      return updateProductVariations
    },

    async onUpdateVariableFeatures (val) {
      this.clearError()
      this.loading = true
      try{
        const result = await this.updateProductVariableFeatures(val, this.itemFullKey())

        this.notifiy('item-updated', this.parseItemUpdatedNotify(result))

        this.refreshItem()

      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.loading = false
      }
    },

    async onUpdateVariations (val) {
      this.clearError()
      this.loading = true
      try{
        console.log('Model -> onUpdateVariations %o', val)
        const result = await this.updateProductVariations(val, this.id)

        this.notifiy('item-updated', this.parseItemUpdatedNotify(result))

        this.refreshItem()

      }catch(error){
        // console.log('error %o', error)
        this.itemError(error.message)
      }finally{
        this.loading = false
      }
    },

    extraSlotParams () {
      return {
        updateVariableFeatures: this.onUpdateVariableFeatures,
        updateVariations: this.onUpdateVariations,
       }
    },

    parseItemForInput (item) {
      return deleteObjFields(item, ['__typename', 'saleIsActive'])
    },

  },
}
</script>
