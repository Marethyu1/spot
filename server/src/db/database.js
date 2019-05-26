const Sequelize = require('sequelize')

let sequelize = null
const modelLoader = require('./create-db-models')

/**
 * Database Representation as a singleton
 */
class Database {
  /**
     * @param {Object} config
     * //
     */
  constructor(config) {
    if (!sequelize) {
      if (!config) {
        throw new Error('No config on connection found')
      }
      const options = {
        host: config.host,
        dialect: config.dialect || 'mysql',
        // operatorsAliases: false,
        pool: {
          max: 100,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        define: {
          timestamps: false,
        },
        logging: process.env.NODE_ENV === 'production',
        storage: config.storage,
        dialectOptions: {
        },
      }

      if (process.env.NODE_ENV === 'production') {
        options.dialectOptions.socketPath = `/cloudsql/${config.instance_connection_name}`
      }

      sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        options,
      )

      modelLoader(sequelize)
    }
  }

  static create(config) {
    return new Database(config)
  }

  async sync(force = true) {
    return sequelize.sync({ force, alter: true })
  }

  getConnection() {
    return sequelize
  }

  getModels() {
    return sequelize.models
  }

  getModel(modelName) {
    const modelExists = sequelize.isDefined(modelName)
    if (!modelExists) {
      throw new Error(`Could not find table with name ${modelName}`)
    }
    return sequelize.models[modelName]
  }

  /**
     * testConnection
     * @return {Promise<*>}
     */
  async testConnection() {
    return sequelize.authenticate()
      .then(() => true)
  }

  /**
     * closeConnection
     * @return {Promise<*>}
     */
  async closeConnection() {
    const closedConnection = await sequelize.close()
    sequelize = null
    return closedConnection
  }


  /**
     * exportModel
     * @param {O} modelName
     * @param {O} model
     * @return {void|*|{timestamps}}
     */
  static exportModel(modelName, model, options) {
    if (!sequelize) {
      throw new Error('A connection has not been established')
    }
    return sequelize.define(modelName, model, options)
  }
}

module.exports = Database
