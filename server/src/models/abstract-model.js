const {getDatabase} = require("../db/database-manager")
const db = getDatabase()

class AbstractModel {
    constructor(modelName) {
        this.model = db.getModel(modelName)
    }

    get(id){
        return this.model.findById(id)
    }
}

module.exports = AbstractModel
