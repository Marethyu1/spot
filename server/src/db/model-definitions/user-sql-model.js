const Sequelize = require("sequelize")
const SqlAbstractModel = require("../sql-abstract-model")
const USER = "user"

class UserSqlModel extends SqlAbstractModel {

    constructor(name) {
        super(name)
    }

    getModel() {
        return {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            givenName: {
                type: Sequelize.STRING,
            },
            familyName: {
                type: Sequelize.STRING,
            },
            displayName: {
                type: Sequelize.STRING,
            },
            provider: {
                type: Sequelize.STRING,
            },
        }
    }
}

module.exports = new UserSqlModel(USER)

