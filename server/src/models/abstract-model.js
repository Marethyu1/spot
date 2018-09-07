const {getDatabase} = require("../db/database-manager")
const db = getDatabase()
const path = require("path")

class AbstractModel {

    constructor(modelName, models=[]) {
        this.model = db.getModel(modelName)
        this.models = {}
        this.include = []

        //Load classes into memory
        models.forEach((modelName) => {
            const fileName = `/${modelName}-model.js`
            const filePath = path.join(__dirname, fileName)
            try {
                this.models[modelName] = require(filePath)
            } catch (err) {
                console.log(err)
            }
        })

        //Add associations for eager loading
        models.forEach((modelName) => {
            const model = {
                model: db.getModel(modelName)
            }
            this.include.push(model)
        })
    }

    get(id){
        return this.model.findById(id)
    }

    list(where){
        const options = {
            where,
            include: this.include
        }
        return this.model.findAll(options)
    }

    create(values, options) {
        const allOptions = {
            ...options,
            include: this.include
        }
        return this.model.create(values, allOptions)
    }
}

module.exports = AbstractModel
