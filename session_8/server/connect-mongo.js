const mongoose = require('mongoose')

// const connectionString = 'mongodb://localhost:27017/test'
const connectionString = 'mongodb+srv://common:common123@cluster0-dvsxq.mongodb.net/test'

mongoose.connect(connectionString, {
    // options
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connect success to MongoDB')
  })
  .catch(err => {
    console.error('Connect failed to MongoDB')
    console.error(err)
  })
