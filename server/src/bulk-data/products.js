const moment = require('moment')
const { productsExport } = require('./../models/Product')

function productExportFileName () {
  // return `products-export-${moment().format('YYYY-MM-DD_h_mm')}`
  return `products-export-${moment().format('YYYY-MM-DD')}`
}

async function productsJSON () {
  let prodArr = await productsExport()
  let prodText = JSON.stringify(prodArr, null, 4)
  return prodText
}


module.exports = {
  productExportFileName,
  productsJSON,
}
