const model = require('./model')

const handlers = {
  async findMany(req, res, next) {
    try {
      let items = await model.find({ })
      res.json(items)
    } catch(err) {
      next(err)
    }
  },
  findOne(req, res, next) {
    throw new Error('Not yet support!')
  },
  create(req, res, next) {
    throw new Error('Not yet support!')
  },
  update(req, res, next) {
    throw new Error('Not yet support!')
  },
  delete(req, res, next) {
    throw new Error('Not yet support!')
  }
}

module.exports = handlers