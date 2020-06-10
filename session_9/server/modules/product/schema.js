const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // title: String
  title: {
    type: String,
    require: true
  }
})

module.exports = schema
