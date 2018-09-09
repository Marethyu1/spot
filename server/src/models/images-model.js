const {IMAGES_MODEL} = require("../consts/model-names")
const AbstractModel = require("./abstract-model")

class ImagesModel extends AbstractModel {

    insertImage(image){
        const values = {
            image
        }
        return this.create(values)
    }
}


module.exports = new ImagesModel(IMAGES_MODEL)



