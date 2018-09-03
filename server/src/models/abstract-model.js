const {getDatabase} = require("../db/database-manager")
const db = getDatabase()

class AbstractModel {
    constructor(modelName) {
        this.model = db.getModel(modelName)
    }

    get(id){
        return this.model.findById(id)
    }

    list(where){
        const options = {
            where
        }
        return this.model.findAll(options)
    }

    create(values, options) {
        return this.model.create(values, options)
    }
}

module.exports = AbstractModel
