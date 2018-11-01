const Sequelize = require('sequelize')
const SqlAbstractModel = require('../sql-abstract-model')
const { IMAGES_MODEL } = require('../../consts/model-names')

class ImagesSqlModel extends SqlAbstractModel {
  getModel() {
    return {
      image: {
        type: Sequelize.BLOB('long'),
      },
      thumbnail: {
        type: Sequelize.BLOB('long'),
      },
      pin: {
        type: Sequelize.BLOB('pin'),
      },
    }
  }
}

module.exports = new ImagesSqlModel(IMAGES_MODEL)
