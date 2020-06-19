const model = require('./model')

const handlers = {
  async findMany(req, res, next) {
    try {
      let items = await model
        .find({ })
        .populate('categories', 'title')

      res.json(items)
    } catch(err) {
      next(err)
    }
  },
  async findOne(req, res, next) {
    try {
      let id = req.params.id
      let item = await model
        .findById(id)
        .populate('categories', 'title')

      res.json(item)
    } catch(err) {
      next(err)
    }
  },
  async create(req, res, next) {
    try {
      let data = req.body
      let item = await model.create(data)

      res.json(item)
    } catch(err) {
      next(err)
    }
  },
  async update(req, res, next) {
    try {
      let data = req.body
      let id = data._id

      if(!id) {
        throw new Error('Missing item id!')
      }

      let item = await model.findByIdAndUpdate(
        id,
        data,
        {
          new: true
        }
      )

      res.json(item)
    } catch(err) {
      next(err)
    }
  },
  async delete(req, res, next) {
    try {
      let id = req.params.id

      let item = await model.findByIdAndDelete(id)

      res.json(item)
    } catch(err) {
      next(err)
    }
  }
}

module.exports = handlers