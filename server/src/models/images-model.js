const {IMAGES_MODEL} = require("../consts/model-names")
const AbstractModel = require("./abstract-model")

class ImagesModel extends AbstractModel {
    insertImage(dog_id, image){
        const values = {
            dog_id,
            image
        }
        return this.create(values)
    }
}


module.exports = new ImagesModel(IMAGES_MODEL)



