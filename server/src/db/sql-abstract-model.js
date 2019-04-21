class SqlAbstractModel {
  constructor(name) {
    this.name = name
  }

  getName() {
    return this.name
  }

  getModel() {

  }

  getOptions() {
    return {
      timestamps: true,
      // underscored: true,
      getterMethods: {},
    }
  }

  setAssociations(models) {

  }
}

module.exports = SqlAbstractModel
