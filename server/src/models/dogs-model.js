const {DOGS_MODEL} = require("../consts/model-names")
const AbstractModel = require("./abstract-model")

class DogsModel extends AbstractModel {

    findDogsForUser(user_id) {
        const where = {
            user_id
        }
        return this.list(where)
    }
}

module.exports = new DogsModel(DOGS_MODEL)



