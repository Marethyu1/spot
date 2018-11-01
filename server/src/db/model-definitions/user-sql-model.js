const Sequelize = require('sequelize')
const SqlAbstractModel = require('../sql-abstract-model')
const { USER_MODEL, DOGS_MODEL } = require('../../consts/model-names')

class UserSqlModel extends SqlAbstractModel {
  getModel() {
    return {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        // autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },

    }
  }

  setAssociations(models) {
    models[USER_MODEL].hasMany(models[DOGS_MODEL], { foreignKey: { allowNull: false } })
    models[DOGS_MODEL].belongsTo(models[USER_MODEL], { foreignKey: { allowNull: false } })
  }
}

module.exports = new UserSqlModel(USER_MODEL)
