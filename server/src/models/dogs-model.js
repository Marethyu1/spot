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
        const json = {
            ...values,
        }
        delete json.image
        const {id} = await super.create(json)

        const {image} = values
        const imagesModel = this.models[IMAGES_MODEL]
        await imagesModel.insertImage(id, image)
        return this.getDogAndImage(id)
    }
}

const associations = [IMAGES_MODEL]

module.exports = new DogsModel(DOGS_MODEL, associations)



