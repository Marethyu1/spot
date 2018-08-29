const {getDatabase} = require("../db/database-manager")
const db = getDatabase()

class AbstractModel {
    constructor(modelName) {
        this.model = db.getModel(modelName)
    }
}

module.exports = AbstractModel
