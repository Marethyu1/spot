const { IMAGES_MODEL } = require('../consts/model-names')
const AbstractModel = require('./abstract-model')

const { preProcessImage } = require('../images')

class ImagesModel extends AbstractModel {
  async get(id, imageType = 'image') {
    const options = {
      where: { id },
      attributes: [imageType],
    }
    const models = await this.model.findAll(options)

    return models[0]
  }

  async insertImage(image) {
    const { thumbnail, pin } = await preProcessImage(image)
    const values = {
      image,
      thumbnail,
      pin,
    }
    return this.create(values)
  }
}


module.exports = new ImagesModel(IMAGES_MODEL)
