(async () => {
    console.log(`Creating tables for ${process.env.NODE_ENV} environment`)
    const {setUp, tearDownConnection} = require("../src/db/database-manager")
    await setUp()
    await tearDownConnection()
})()
