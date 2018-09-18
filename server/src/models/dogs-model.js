const {DOGS_MODEL, IMAGES_MODEL} = require("../consts/model-names")
const AbstractModel = require("./abstract-model")
const {preProcessImage} = require("../images")

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
        let imageValues = {}
        if (values.image){
            const originalImage = values.image.image
            const {thumbnail, pin} = await preProcessImage(originalImage)
            imageValues = {
                image: originalImage,
                thumbnail,
                pin,
            }
        }

        const allValues = {
            ...values,
            image: {
                ...imageValues
            }

        }
        const allOptions = {
            include: this.include
        }
        return super.create(allValues, allOptions)
    }
}

const associations = [IMAGES_MODEL]

module.exports = new DogsModel(DOGS_MODEL, associations)



