const DB = require("../database")



test("The database should be able to connnect", async () => {
    const config = {
        host: "127.0.0.1",
        database: "spot",
        username: "root",
        password: "example"

    }
    const db = new DB(config)
    await db.testConnection()
    await db.sync()
    await db.closeConnection()
})
