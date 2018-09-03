const Sequelize = require("sequelize")
const SqlAbstractModel = require("../sql-abstract-model")
const {DOGS} = require("../../consts/model-names")

class DogsSqlModel extends SqlAbstractModel {

    constructor(name) {
        super(name)
    }

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
        }
    }
}

module.exports = new DogsSqlModel(DOGS)

