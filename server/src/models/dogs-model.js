const {DOGS_MODEL, IMAGES_MODEL} = require("../consts/model-names")
const AbstractModel = require("./abstract-model")

class DogsModel extends AbstractModel {

    findDogsForUser(user_id) {
        const where = {
            user_id
        }
        return this.list(where)
    }

    getDogAndImage(id){
        const options = {
            include: this.include
        }
        return this.model.findById(id, options)
    }

    async create(values){
        const allOptions = {
            include: this.include
        }
        return super.create(values, allOptions)
    }
}

const associations = [IMAGES_MODEL]

module.exports = new DogsModel(DOGS_MODEL, associations)



