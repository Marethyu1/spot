const NODE_ENV = process.env.NODE_ENV || 'development'
import config from './config'

const database = config[NODE_ENV]

const applicationConfig = {
  development: {
  },
  test: {
  },
}

applicationConfig[NODE_ENV].database = database

module.exports = applicationConfig[NODE_ENV]