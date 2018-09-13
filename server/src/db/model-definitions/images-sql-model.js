const Sequelize = require("sequelize")
const SqlAbstractModel = require("../sql-abstract-model")
const {IMAGES_MODEL, DOGS_MODEL} = require("../../consts/model-names")

class ImagesSqlModel extends SqlAbstractModel {

    getModel() {
        return {
            image: {
                type: Sequelize.BLOB('long')
            }
        }
    }
}

module.exports = new ImagesSqlModel(IMAGES_MODEL)

