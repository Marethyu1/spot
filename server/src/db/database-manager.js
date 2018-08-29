const config = require("../../config/config")
const DB = require("./database")

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

module.exports = {
    getDatabase,
    setUp
}
