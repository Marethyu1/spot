const { USER_MODEL } = require('../consts/model-names')
const AbstractModel = require('./abstract-model')

class UserModel extends AbstractModel {
  upsert(options) {
    return this.model.upsert(options)
      .then(() => this.get(options.id))
  }
}

module.exports = new UserModel(USER_MODEL)
