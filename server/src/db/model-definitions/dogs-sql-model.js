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
            latitude: {
                type: Sequelize.DOUBLE,
            },
            longitude: {
                type: Sequelize.DOUBLE,
            },
            comments: {
                type: Sequelize.TEXT
            }
        }
    }
}

module.exports = new DogsSqlModel(DOGS_MODEL)

