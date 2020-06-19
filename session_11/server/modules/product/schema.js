const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema({
  // title: String
  title: {
    type: String,
    required: [true, `Yêu cầu 'title'`]
  },
  categories: [{
    type: ObjectId,
    ref: 'categories'
  }]
})

module.exports = schema
