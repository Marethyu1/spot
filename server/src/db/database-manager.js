const config = require('../../config/application-config')
const DB = require('./database')

let db
const getDatabase = () => {
  if (!db) db = DB.create(config.database)
  return db
}

const setUp = async () => {
  getDatabase()
  await db.sync()
  return db
}

const tearDownConnection = () => {
  if (!db) throw new Error('Connection doesnt exist')
  return db.closeConnection()
}

module.exports = {
  getDatabase,
  setUp,
  tearDownConnection,
}
