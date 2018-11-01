const Sequelize = require('sequelize')
const SqlAbstractModel = require('../sql-abstract-model')
const { DOGS_MODEL, IMAGES_MODEL } = require('../../consts/model-names')

class DogsSqlModel extends SqlAbstractModel {
  getModel() {
    return {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tag: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.DOUBLE,
      },
      longitude: {
        type: Sequelize.DOUBLE,
      },
      caption: {
        type: Sequelize.TEXT,
      },
      region: {
        type: Sequelize.STRING,
      },
      street: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      postalCode: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      isoCountryCode: {
        type: Sequelize.STRING,
      },
    }
  }

  setAssociations(models) {
    // models[DOGS_MODEL].hasOne(models[IMAGES_MODEL], {foreignKey: {allowNull: false}})
    // models[IMAGES_MODEL].hasOne(models[IMAGES_MODEL], )
    // models[IMAGES_MODEL].belongsTo(models[DOGS_MODEL], {foreignKey: {allowNull: false}})
    models[DOGS_MODEL].belongsTo(models[IMAGES_MODEL])
  }
}

module.exports = new DogsSqlModel(DOGS_MODEL)
