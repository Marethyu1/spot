const Sequelize = require("sequelize")
const SqlAbstractModel = require("../sql-abstract-model")
const {IMAGES_MODEL, DOGS_MODEL} = require("../../consts/model-names")

class ImagesSqlModel extends SqlAbstractModel {

    getModel() {
        return {
            image: {
                type: Sequelize.BLOB
            }
        }
    }

    setAssociations(models){
        models[DOGS_MODEL].hasOne(models[IMAGES_MODEL], {foreignKey: {allowNull: false}})
        models[IMAGES_MODEL].belongsTo(models[DOGS_MODEL], {foreignKey: {allowNull: false}})
    }
}

module.exports = new ImagesSqlModel(IMAGES_MODEL)

