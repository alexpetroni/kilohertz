import Vue from 'vue'
import moment from 'moment'

const EventBus = new Vue()

// ====================== FORM STATE ======================
const FormState = {
  NEW: 'new',
  EDIT: 'edit',
}

const isNewForm = (val) => {
  return val == FormState.NEW
}

const isEditForm = (val) => {
  return val == FormState.EDIT
}

// ====================== VARIABLE FEATURES TYPES ======================
const VF_TYPE = {
  TEXT: 'TEXT',
  COLOR: 'COLOR_HEX',
  SVG: 'SVG',
}

const VF_TYPE_NAME = {
  TEXT: 'Text',
  COLOR_HEX: 'Color',
  SVG: 'SVG',
}

const isVfTextType = function (type) {
  return type == VF_TYPE.TEXT
}

const isVfColorType = function (type) {
  return type == VF_TYPE.COLOR
}

const isVfSvgType = function (type) {
  return type == VF_TYPE.SVG
}

const vfTypeName = function (type) {
  return VF_TYPE_NAME[type]
}


// ====================== PRODUCT TYPES ======================
const PRODUCT_TYPE = {
  SIMPLE: 'SIMPLE',
  VARIABLE: 'VARIABLE',
  VARIATION: 'VARIATION',
}

const PRODUCT_TYPE_NAME = {
  SIMPLE: 'Simple',
  VARIABLE: 'Variable',
  VARIATION: 'Variation',
}

const isSimpleType = function (type) {
  return type == PRODUCT_TYPE.SIMPLE
}

const isVariableType = function (type) {
  return type == PRODUCT_TYPE.VARIABLE
}

const isVariationType = function (type) {
  return type == PRODUCT_TYPE.VARIATION
}

const productTypeName = function (type) {
  return PRODUCT_TYPE_NAME[type]
}

const productTypes = function () {
  return Object.keys(PRODUCT_TYPE_NAME).map(e => ({text: PRODUCT_TYPE_NAME[e], value: e }))
}

const isSimpleProduct = function (product) {
  return product.type == PRODUCT_TYPE.SIMPLE
}

const isVariableProduct = function (product) {
  return product.type == PRODUCT_TYPE.VARIABLE
}

const isProductVariation = function (product) {
  return product.type == PRODUCT_TYPE.VARIATION
}

// ====================== SALE TYPES ======================

const SALE_TYPE = {
  ACTION: 'ACTION',
  STOCK_LIQUIDATION: 'STOCK_LIQUIDATION',
}

const SALE_TYPE_NAME = {
  ACTION: 'Action',
  STOCK_LIQUIDATION: 'Stock Liquidation',
}

const isActionSale = function (type) {
  return type == SALE_TYPE.ACTION
}

const isLiquidationSale = function (type) {
  return type == SALE_TYPE.STOCK_LIQUIDATION
}

const saleTypeName = function (type) {
  return SALE_TYPE_NAME[type]
}

// ====================== NEW PRODUCT VARIATION UTILITIES ======================

const newItemIdPrefix = '__new__'
const isNewItemRegExp = new RegExp(newItemIdPrefix)

function isGeneratedVariationId (itemId) {
  return isNewItemRegExp.test(itemId)
}


const jsonCopy = (val) => {
    return JSON.parse(JSON.stringify(val))
}

// filter an object properties based on predicate function
const filterObject = (obj, predicate) => {
  if(!obj.__proto__ || obj.__proto__.constructor.name !== 'Object'){
    throw new Error("The obj provided should be an Object")
  }

  let newObj = {}
  for(let prop in obj){
    if(Object.prototype.hasOwnProperty.call(obj, prop) && predicate(obj[prop], prop, obj)){
      newObj[prop] = obj[prop]
    }
  }

  return newObj
}

// get category tree with nested items in children array [ {name, id,..., children:[{name, id, children: [...]}]}]
const categoriesTreeAssamble = (categories, item = {}) => {
  item.children = categoryChildren(categories, item)

  if(item.children.length){
    item.children.map(e => {
      e.level = item.level ? item.level : 0
      categoriesTreeAssamble(categories, e)
    })
  }

  return item
}

// filter & sort category children
const categoryChildren = (categories, cat = {}) => {
  let catArr = categories.filter(e => e.parent == cat.id)
  catArr.sort((a, b) => a.order - b.order)
  return catArr
}

// delete object spceified field
// if 'deep' traverse it on array and object properties
const deleteObjField = (obj, field, deep = true) => {
  if(!field || !obj) return obj
  if(!(obj.__proto__ && obj.__proto__.constructor.name === 'Object') && !Array.isArray(obj)){ // if it is not an Obj or Array, return it
    return obj
  }

  if(Array.isArray(obj)){
    return obj.map(e => deleteObjField(e, field, deep))
  }

  let newObj = {}
  for(let prop in obj){
    if(Object.prototype.hasOwnProperty.call(obj, prop) && field != prop){
      newObj[prop] = deep ? deleteObjField(obj[prop], field, deep) : obj[prop]
    }
  }

  return newObj
}

const deleteObjFields = (obj, fieldsArr, deep = true) => {
  if(!fieldsArr || !Array.isArray(fieldsArr) || !obj) return obj
  return fieldsArr.reduce((acc, e) => {
    acc = deleteObjField(acc, e, deep)
    return acc
  }, obj)
}

const parseDate = (date, dateFormat = "YYYY-MM-DD") => {
  return date && moment(date).isValid() ? moment(date).format(dateFormat) : null
}

const parseObjPropAsDate = (obj, fieldsArr, dateFormat) => {
  if(!fieldsArr || !Array.isArray(fieldsArr)){
    return obj
  }
  fieldsArr.map(e => {
    if(obj[e]){
      obj[e] = parseDate(obj[e], dateFormat)
    }
  })

  return obj
}

const safeParseFloat = (val) => {
  return Number.isNaN(val) ? null : +val
}

// for array containing primitive values
const sameArrayContent = function (a, b) {
  return Array.isArray(a) && Array.isArray(b) && a.length == b.length ? a.every((item, i) => { return item == b[i] }) : false
}

const isAnObject = (obj) => {
  return obj && obj.__proto__ && obj.__proto__.constructor && obj.__proto__.constructor.name === 'Object'
}

// return the single property of an object, null otherwise
const objectSingleProperty = (obj) => {
  if(!isAnObject(obj)) return
  let keys = Object.keys(obj)
  if(keys.length != 1) {
    console.log("Error: The Object provided should have a single property")
    return
  }
  return obj[keys[0]]
}

// merge deep o1 properties with the o2 ones if present
const mergeObjectsToLeft = (o1, o2) => {
  if(!o2 || !isAnObject(o2)) return o1
  if(!isAnObject(o1)) { throw new Error('First argument should be an object.')}
  return Object.keys(o1).reduce((acc, prop) => {
    if(o2[prop] === undefined) {
      acc[prop] = o1[prop]
    }else{
      acc[prop] = isAnObject(o1[prop]) ? mergeObjectsToLeft(o1[prop], o2[prop]) : o2[prop]
    }
    return acc
  }, {})
}

// take an events array and emit them from the specified component with the received value
const pipeEvents = function (comp, ...args) {
  let parent = comp
  let events = args.reduce((acc, e) => {
    acc[e] = parentEmitter(parent, e)
    return acc
  }, {})
  return events
}

const parentEmitter = function (comp, event) {
  return function (val) {
    comp.$emit(event, val)
  }
}

// associate same handler function to multiple events
const groupEventsHandler = function (eventsArr, handler) {
  if(!handler || !Array.isArray(eventsArr)) {
    throw new Error ("Wrong arguments!")
  }

  return eventsArr.reduce((acc, e) => {
    acc[e] = handler
    return acc
  }, {})
}

// emit events from the provided component
const pipeUp = function (comp, eventsArr) {
  if(!comp || !(comp instanceof Vue)){
    throw new Error ("A Vue instance should be provided as emmiter component.")
  }

  return eventsArr.reduce((acc, e) => {
    acc[e] = (val) => { comp.$emit(e, val) }
    return acc
  },
  {})
}

// const variableFeatureItemFromConfig = function (vf, featureConfig) {
//   if(!featureConfig || !vf || !Array.isArray(vf.items) || vf.slug != featureConfig.vfSlug) return
//   return vf.items.find(e => e.slug == featureConfig.fiSlug)
// }

// return the variations of a product with an added field, 'features' completed conform featuresConfig
const variationsWithFeatures = function (product) {
  if(!product || !isVariableProduct(product)) return
  return product.variations.map(v => {
    v.features = zipFeatures (v.featuresConfig, product.variableFeatures)
    return v
  })
}

const zipFeatures = function (featuresConfig, variableFeatures) {
  return Object.keys(featuresConfig).map(e => {
    let zip = {}
    let vf = variableFeatures.find(vf => e == vf.slug)
    if(vf) {
      zip.vfSlug = vf.slug
      zip.vfName = vf.name
      zip.vfType = vf.type

      let fi = vf.items.find(f => f.slug == featuresConfig[e])
      if(fi) {
        zip.fiSlug = fi.slug
        zip.fiName = fi.name
        zip.fiValue = fi.value
      }
    }
    return zip
  })
}

// split a multi line text delimited by '|' for columns in a multi-dimmendional array
// ex. a | b \n c | d will produce [[a, b], [c, d]]
function splitInfoTxt (txt) {
  if(!txt || typeof txt !== 'string') return []
  return txt.split(/\r?\n/).map(e => e.split('|'))
}

// take a text delimited by '|' and return an dataTable object with {headers: [{value: 'f_1'},...] , items: {name: , value: 'f_1'}, ..}
// used by tehnical product info, packaging etc.
function splitedTxtToTableData (txt, key='key', fieldPrepend = 'f_') {
  let twoDimensionalArr = splitInfoTxt(txt)
  return {
    items: twoDimensionalArr.map((e, i) => {
      if(Array.isArray(e)){
        let obj = e.reduce((acc, item, index) => {
          acc[fieldPrepend + index] = item
          return acc
        }, {})
        obj[key] = i
        return obj
      }
      return e
    }),

    headers: Array.isArray(twoDimensionalArr[0]) ? twoDimensionalArr.map((e, index) => ({value: fieldPrepend + index})) : []
    }
}


// -------------------- PRICE ---------------------------------
function productPrice (product, quantity = 1) {
  if(!product) return
  if(quantity > 1 && hasVolumePrice(product)){
    return productPriceForQty(volumePriceArr(product), quantity, product.price)
  }
  return product.price
}

function productDiscount (product, quantity = 1) {
  if(!product || !product.saleIsActive) return 0
  let price = productPrice(product, quantity)
  return price && product.regularPrice ? discountPercent(price, product.regularPrice) : 0
}

// if a product or any of his variations has volumePrice discount
function hasVolumePrice (product) {
  return !!volumePriceArr(product).length || (isVariableProduct(product) && product.variations && product.variations.some(e => hasVolumePrice(e)))
}

function volumePriceArr (product) {
  return product && product.volumePrice ? volumePriceStringToArr(product.volumePrice) : []
}

function variationsHaveMultiplePrices (product) {
  return isVariableProduct(product) && variationsPricesRange(product).length > 1
}

// return an array with [minPrice, maxPrice]
function variationsPricesRange (product) {
  if(!isVariableProduct(product) || !Array.isArray(product.variations)) return []
  let priceArr = product.variations.map(v => v.price)
  priceArr.push(product.price) // some of the variations can inherit the price from the parent product, so we should add this too
  let sortedArr = priceArr.filter((e, index, arr) => e && arr.indexOf(e) === index) // remove null and duplicates
  .sort((a, b) => a - b)


  if(sortedArr.length > 1){
    return [sortedArr[0], sortedArr[sortedArr.length - 1]]
  }
  return sortedArr
}

function variationsMinPrice (product) {
  return variationsPricesRange(product)[0]
}

function variationsMaxDiscount (product) {
  if(!variationsHaveMultiplePrices(product)) return {}
  // the accumulator should retain main product amount and percent if present
  let amount = product.price && product.regularPrice ? product.regularPrice - product.price : 0
  let percent = discountPercent(product.price, product.regularPrice)
  let accumulator = {amount, percent}
  return product.variations
  .reduce((acc, v) => {
    if(v.price && v.regularPrice && v.price != v.regularPrice){
      let amount = v.regularPrice - v.price
      let percent = discountPercent(v.price, v.regularPrice)
      if(amount > acc.amount) acc.amount = amount
      if(percent > acc.percent) acc.percent = percent
    }

    return acc
    },
    accumulator)

}

function volumePriceStringToArr (priceStr) {
  if(priceStr && typeof priceStr === 'string'){
    let pricesArr = priceStr.split(',').reduce((acc, e) => {
      let [qty, price] = e.split(':').map(e => parseFloat(e))
      if(qty && price) {
        acc.push({qty, price})
      }
      return acc
    }, [])

    return pricesArr.sort((a,b) => a.qty - b.qty)
  }
  return []
}

function productPriceForQty (volumePriceArr, qty, singlePrice) {
  if(!volumePriceArr || !Array.isArray(volumePriceArr) || qty < 2) return null
  return volumePriceArr.reduce((acc, e) => {
    if(e.qty <= qty) {
      acc = e.price
    }
    return acc
  }, singlePrice)
}

function discountPercent (price, regularPrice, decimals = 0) {
  if(isNaN(price) || isNaN(regularPrice)) return 0
  return +(100*(regularPrice - price)/regularPrice).toFixed(decimals)
}


const productPriceObject = function (product, quantity = 1) {
  if(!product || !product.price) return
  const hasVolDisc = hasVolumePrice(product)
  const hasSalePrice = !!(product.regularPrice && product.price != product.regularPrice)
  const regularPrice = hasSalePrice ? product.regularPrice : null
  const price = hasVolDisc && quantity > 1 ? productPriceForQty(volumePriceArr(product), quantity, product.price) : product.price
  const discPer = regularPrice ? discountPercent(price, regularPrice) : discountPercent(price, product.price)
  const discAm = regularPrice ? regularPrice - price : product.price - price
  const isVarProd = isVariableProduct(product)
  const varMultiPrices = isVarProd && variationsHaveMultiplePrices(product)
  const varPricesRange = varMultiPrices && variationsPricesRange(product)
  const { amount: variationsMaxDiscountAmount = 0, percent: variationsMaxDiscountPercent = 0 }  = variationsPricesRange ? variationsMaxDiscount(product) : {}

  return {
    hasVolumeDiscount: hasVolDisc,
    hasSalePrice: hasSalePrice,
    regularPrice: regularPrice,
    price: price,
    discountPercent: discPer,
    discountAmount: discAm,
    isVariableProduct: isVarProd,
    variationsHaveMultiplePrices: varMultiPrices,
    variationsPricesRange: varPricesRange,
    variationsMaxDiscountAmount,
    variationsMaxDiscountPercent,
  }
}


export {
  EventBus,
  FormState,

  VF_TYPE,
  isVfTextType,
  isVfColorType,
  isVfSvgType,
  vfTypeName,

  PRODUCT_TYPE,
  isSimpleType,
  isVariableType,
  isVariationType,
  productTypeName,
  productTypes,
  isSimpleProduct,
  isVariableProduct,
  isProductVariation,

  SALE_TYPE,
  isActionSale,
  isLiquidationSale,
  saleTypeName,

  isNewForm,
  isEditForm,
  jsonCopy,
  filterObject,
  categoriesTreeAssamble,
  deleteObjField,
  deleteObjFields,
  parseDate,
  parseObjPropAsDate,
  safeParseFloat,
  sameArrayContent,
  isAnObject,
  objectSingleProperty,
  mergeObjectsToLeft,
  pipeEvents,
  groupEventsHandler,
  pipeUp,

  // variableFeatureItemFromConfig,

  variationsWithFeatures,
  zipFeatures,

  newItemIdPrefix,
  isGeneratedVariationId,

  splitedTxtToTableData,
  splitInfoTxt,

  productPrice,
  productPriceObject,
  productDiscount,
  variationsHaveMultiplePrices,
  variationsMinPrice,
}
