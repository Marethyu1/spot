const { getDatabase } = require('../db/database-manager')

const db = getDatabase()
const path = require('path')

class AbstractModel {
  constructor(modelName, models = []) {
    this.model = db.getModel(modelName)
    this.models = {}
    this.include = []

    // Load classes into memory
    models.forEach((modelName) => {
      const fileName = `/${modelName}-model.js`
      const filePath = path.join(__dirname, fileName)
      try {
        this.models[modelName] = require(filePath)
      } catch (err) {
        console.log(err)
      }
    })

    // Add associations for eager loading
    models.forEach((modelName) => {
      const model = {
        model: db.getModel(modelName),
      }
      this.include.push(model)
    })
  }

  get(id, options = {}) {
    return this.model.findByPk(id, options)
  }

  list(where) {
    const options = {
      where,
    }
    return this.model.findAll(options)
  }

  create(values, options) {
    return this.model.create(values, options)
  }
}

module.exports = AbstractModel
