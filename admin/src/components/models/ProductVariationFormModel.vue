<script>
import { deleteObjFields, PRODUCT_TYPE, SALE_TYPE } from '@common/utils'
import BaseItemFormModel from '@common/models/BaseItemFormModel'

import ProductVariationWithParent from '@common/graphql/product/ProductVariationWithParent.gql'
import UpdateProductVariation from '@common/graphql/product/UpdateProductVariation.gql'
import DeleteProductVariation from '@common/graphql/product/DeleteProductVariation.gql'

export default {
  extends: BaseItemFormModel,

  props: {
    parentId: {
      type: String,
      required: true,
    }
  },

  data () {
    return {
      parent: {}
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

        featuresConfig: {},
      }
    },

    parentKey () {
      return { parentId: this.parentId }
    },

    async loadItem (key, fetchPolicy = 'network-only') {
      const variables = Object.assign({}, key, {raw: true})
      let { data } = await this.$apollo.query({
        query: ProductVariationWithParent,
        variables,
        fetchPolicy,
      })
      return data
    },

    async updateItem (item, key) {
      let input = this.parseItemForInput(item)
      let { data: { updateProductVariation } } = await this.$apollo.mutate({
        mutation: UpdateProductVariation,
        variables: {...key, input },
      })
      return updateProductVariation
    },

    async deleteItem (key) {
      let { data: { deleteProductVariation } } = await this.$apollo.mutate({
        mutation: DeleteProductVariation,
        variables: key,
      })
      return deleteProductVariation
    },

    parseItemForInput (item) {
      return deleteObjFields(item, ['__typename', 'saleIsActive'])
    },

    parseLoadResult (data) {
      this.parent = data.product
      // const fc = data.productVariation.featuresConfig
      console.log('parseLoadResult %o', data)
      let parsed = this.parseItemToMirrorDefaultModel(data.productVariation) // because featuresConfig doesn't have a fixed structure, it will be omitted, so should be added later
      parsed.featuresConfig = data.productVariation.featuresConfig
      return parsed
    },

    extraSlotParams () {
      return { parent: this.parent }
    },

  },
}
</script>
