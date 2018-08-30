const Sequelize = require("sequelize")
const SqlAbstractModel = require("../sql-abstract-model")
const {USER_MODEL} = require("../../consts/model-names")

class UserSqlModel extends SqlAbstractModel {

    constructor(name) {
        super(name)
    }

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
                type: Sequelize.STRING
            }

        }
    }
}

module.exports = new UserSqlModel(USER_MODEL)

