const model = require('./model')

const handlers = {
  async findMany(req, res, next) {
    try {
      let categories = await model.find({ })
      res.json(categories)
    } catch(err) {
      next(err)
    }
  },
  findOne(req, res, next) {
    throw new Error('Not yet support!')
  },
  async create(req, res, next) {
    try {
      let data = req.body

      let category = await model.create(data)
      res.json(category)
    } catch(err) {
      next(err)
    }
  },
  update(req, res, next) {
    throw new Error('Not yet support!')
  },
  delete(req, res, next) {
    throw new Error('Not yet support!')
  }
}

module.exports = handlers