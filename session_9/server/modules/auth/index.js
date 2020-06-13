const userModel = require('./model')
const crypto = require('crypto')

const handlers = {
  signIn(req, res, next) {
    try {
      let data = req.body
      //let user = await userModel.findOne({ email: data.email })

    } catch(err) {
      next(err)
    }
  },
  async signUp(req, res, next) {
    try {
      let data = req.body

      if(typeof data.password != 'string'
        || !(data.password.length >= 6 && data.password.length <= 30)) {
        throw new Error('Invalid password! Password length between 6 and 30!')
      }

      data.password = hashMd5(data.password)
      data.email = String(data.email).toLowerCase().trim()
      data.state = 'available'

      let user = await userModel.create(data)
      let userData = user.toObject() // user is mongoose document

      delete userData.password

      res.json(userData)
    } catch(err) {
      next(err)
    }
  },
  // dev only
  async findAll(req, res, next) {
    try {
      let items = await userModel.find({})
      res.json(items)
    } catch(err) {
      next(err)
    }
  },
  async deleteAll(req, res, next) {
    try {
      let id = req.params.id
      if(id) {
        await userModel.findByIdAndDelete(id)
      } else {
        await userModel.deleteMany({ })
      }
      res.json([])
    } catch(err) {
      next(err)
    }
  }
}

function hashMd5(str) {
  return crypto.createHash('md5').update(str).digest('hex')
}

module.exports = handlers