const Sequelize = require("sequelize")
const SqlAbstractModel = require("../sql-abstract-model")
const {USER_MODEL} = require("../../consts/model-names")

class UserSqlModel extends SqlAbstractModel {

    constructor(name) {
        super(name)
    }

    getModel() {
        return {
            // id: {
            //     type: Sequelize.INTEGER,
            //     primaryKey: true,
            //     autoIncrement: true,
            // },
            facebook_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,

            },
            name: {
                type: Sequelize.STRING,
            },
        }
    }
}

module.exports = new UserSqlModel(USER_MODEL)

