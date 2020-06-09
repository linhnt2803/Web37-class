// Ex: product
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MODEL_NAME = 'products'
const COLLECTION_NAME = 'products'

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, `Không được thiếu 'title'`]
  },
  description: String
})

const productModel = mongoose.model(MODEL_NAME, productSchema, COLLECTION_NAME)
// productModel.create({
//   // title: 'new product 1',
//   description: 'Hallo'
// }).then(console.log)
// .catch(console.error)

// productModel.find({})
//   .then(items => console.log(items))
//   .catch(console.error)
