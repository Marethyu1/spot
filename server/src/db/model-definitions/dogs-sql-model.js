const Sequelize = require("sequelize")
const SqlAbstractModel = require("../sql-abstract-model")
const {DOGS_MODEL, IMAGES_MODEL} = require("../../consts/model-names")

class DogsSqlModel extends SqlAbstractModel {
    getModel() {
        return {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.STRING
            },
            latitude: {
                type: Sequelize.DOUBLE,
            },
            longitude: {
                type: Sequelize.DOUBLE,
            },
            caption: {
                type: Sequelize.TEXT
            }
        }
    }
}

module.exports = new DogsSqlModel(DOGS_MODEL)

