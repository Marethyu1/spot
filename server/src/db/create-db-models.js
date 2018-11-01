const fs = require('fs')
const path = require('path')

const modelDir = path.join(__dirname, 'model-definitions')
const _ = require('lodash')

module.exports = (sequelize) => {
  if (!sequelize) throw new Error('Requires sequlize connection')
  const isJSFile = file => file.slice(-3) === '.js'
  const isValidFile = file => isJSFile(file)

  const validFileNames = fs.readdirSync(modelDir)
    .filter(isValidFile)

  const models = validFileNames.map(filename => require(path.join(modelDir, filename)))

  models.forEach((model) => {
    sequelize.define(model.getName(), model.getModel(), model.getOptions())
  })


  models.forEach((model) => {
    model.setAssociations(sequelize.models)
  })
}
