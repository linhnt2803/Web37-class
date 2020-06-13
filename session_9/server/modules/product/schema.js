const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // title: String
  title: {
    type: String,
    required: [true, `Yêu cầu 'title'`]
  }
})

module.exports = schema
