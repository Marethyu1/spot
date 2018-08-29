const {USER_MODEL} = require("../consts/model-names")
const AbstractModel = require("./abstract-model")

class UserModel extends AbstractModel {
    constructor(modelName) {
        super(modelName)
    }

    get(id){
        return this.model.findById(id)
    }

    upsert(options){
        return this.model.upsert(options)
            .then(() => {
                return this.get(options.facebook_id)
            })
    }
}

module.exports = new UserModel(USER_MODEL)



